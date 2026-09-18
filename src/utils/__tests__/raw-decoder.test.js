import { describe, it, expect } from 'vitest';
import { isRaw } from '../raw-decoder.js';

function fakeFile(name) {
  return { name };
}

describe('isRaw', () => {
  it.each([
    'photo.arw', 'photo.cr2', 'photo.nef', 'photo.dng', 'photo.orf', 'photo.raf',
  ])('recognizes %s as RAW', (name) => {
    expect(isRaw(fakeFile(name))).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isRaw(fakeFile('PHOTO.ARW'))).toBe(true);
    expect(isRaw(fakeFile('Photo.Cr2'))).toBe(true);
  });

  it.each([
    'photo.jpg', 'photo.png', 'photo.tiff', 'photo.heic', 'photo',
  ])('rejects non-RAW file %s', (name) => {
    expect(isRaw(fakeFile(name))).toBe(false);
  });

  it('rejects a filename that merely contains a RAW extension mid-string', () => {
    expect(isRaw(fakeFile('arw-backup.jpg'))).toBe(false);
  });

  it('matches an extension appearing as a double extension (e.g. name.arw.jpg is NOT raw)', () => {
    expect(isRaw(fakeFile('photo.arw.jpg'))).toBe(false);
  });
});
