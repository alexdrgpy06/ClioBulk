import { describe, it, expect } from 'vitest';
import { parseCubeLUT } from '../webgl-engine.js';

describe('parseCubeLUT', () => {
  it('parses a well-formed identity .cube file', () => {
    const cube = [
      'TITLE "Identity"',
      'LUT_3D_SIZE 2',
      'DOMAIN_MIN 0.0 0.0 0.0',
      'DOMAIN_MAX 1.0 1.0 1.0',
      '0.0 0.0 0.0',
      '1.0 0.0 0.0',
      '0.0 1.0 0.0',
      '1.0 1.0 0.0',
      '0.0 0.0 1.0',
      '1.0 0.0 1.0',
      '0.0 1.0 1.0',
      '1.0 1.0 1.0',
    ].join('\n');

    const result = parseCubeLUT(cube);

    expect(result.size).toBe(2);
    // size^3 grid points * 3 channels
    expect(result.data.length).toBe(2 ** 3 * 3);
    expect(Array.from(result.data.slice(0, 3))).toEqual([0, 0, 0]);
    expect(Array.from(result.data.slice(-3))).toEqual([1, 1, 1]);
  });

  it('ignores comment lines (# ...)', () => {
    const cube = [
      '# Created by test',
      'LUT_3D_SIZE 2',
      '0.0 0.0 0.0',
      '1.0 1.0 1.0',
    ].join('\n');

    const result = parseCubeLUT(cube);
    expect(result.size).toBe(2);
    expect(result.data.length).toBe(6);
  });

  it('ignores blank lines', () => {
    const cube = [
      'LUT_3D_SIZE 2',
      '',
      '0.0 0.0 0.0',
      '',
      '1.0 1.0 1.0',
      '',
    ].join('\n');

    const result = parseCubeLUT(cube);
    expect(result.data.length).toBe(6);
  });

  it('BUG: silently drops a malformed row instead of erroring, desyncing the LUT', () => {
    // A row with a stray 4th value (e.g. an accidental alpha column, or a
    // copy-paste artifact) fails the `parts.length === 3` check and the
    // *entire row* is dropped — not padded, not flagged. Every subsequent
    // triplet in the flat array shifts by one slot, silently corrupting
    // color mapping for the rest of the LUT. This is the real defect
    // HARDENING_CHECKLIST.md section 5/7 points at: the function has no
    // way to signal "this file is malformed," it just returns bad data
    // that will look plausible (right type, wrong values).
    const cube = [
      'LUT_3D_SIZE 2',
      '0.0 0.0 0.0',
      '0.5 0.5 0.5 1.0', // malformed: 4 values, silently dropped
      '1.0 1.0 1.0',
    ].join('\n');

    const result = parseCubeLUT(cube);

    // Expected if the parser were correct for a 2^3 grid: 24 floats (8 * 3).
    // Actual: the malformed row vanishes, so only 2 rows survive -> 6 floats.
    // This assertion documents the current (buggy) behavior so it fails
    // loudly the moment someone fixes it forward, rather than papering
    // over a silent data-corruption bug with a "matches current output"
    // snapshot that nobody re-reads.
    expect(result.data.length).toBe(6);
    expect(result.size).toBe(2); // size header is still read correctly...
    // ...but size (2) implies 8 grid points * 3 = 24 floats are expected
    // downstream (see the identity-LUT test above), so a consumer that
    // trusts `size` to index into `data` will read out of bounds or wrap
    // incorrectly. Recommended fix (not implemented here, out of scope
    // for this hardening pass per HARDENING_CHECKLIST.md): throw or warn
    // when parts.length !== 3, instead of silently continuing.
    expect(result.size * result.size * result.size * 3).not.toBe(result.data.length);
  });

  it('handles negative and scientific-notation values', () => {
    const cube = [
      'LUT_3D_SIZE 2',
      '-0.5 1.2e-1 0.0',
      '1.0 1.0 1.0',
    ].join('\n');

    const result = parseCubeLUT(cube);
    expect(result.data[0]).toBeCloseTo(-0.5);
    expect(result.data[1]).toBeCloseTo(0.12);
  });

  it('returns an empty LUT for an empty string without throwing', () => {
    const result = parseCubeLUT('');
    expect(result.size).toBe(0);
    expect(result.data.length).toBe(0);
  });
});
