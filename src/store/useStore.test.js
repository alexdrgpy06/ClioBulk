import test from 'node:test';
import assert from 'node:assert';
import { useStore } from './useStore.js';

test('useStore manages fileIdsByPath correctly', () => {
  // Clear initial state
  useStore.getState().clearFiles();

  const initialState = useStore.getState();
  assert.deepStrictEqual(initialState.files, []);
  assert.deepStrictEqual(initialState.fileIdsByPath, {});

  // Add files
  const mockFiles = [
    { name: 'test1.jpg', path: '/path/to/test1.jpg' },
    { name: 'test2.jpg', path: '/path/to/test2.jpg' }
  ];

  useStore.getState().addFiles(mockFiles);

  const stateAfterAdd = useStore.getState();
  assert.strictEqual(stateAfterAdd.files.length, 2);

  const id1 = stateAfterAdd.files[0].id;
  const id2 = stateAfterAdd.files[1].id;

  assert.strictEqual(stateAfterAdd.fileIdsByPath['/path/to/test1.jpg'], id1);
  assert.strictEqual(stateAfterAdd.fileIdsByPath['/path/to/test2.jpg'], id2);
  assert.strictEqual(Object.keys(stateAfterAdd.fileIdsByPath).length, 2);

  // Remove one file
  useStore.getState().removeFile(id1);

  const stateAfterRemove = useStore.getState();
  assert.strictEqual(stateAfterRemove.files.length, 1);
  assert.strictEqual(stateAfterRemove.fileIdsByPath['/path/to/test1.jpg'], undefined);
  assert.strictEqual(stateAfterRemove.fileIdsByPath['/path/to/test2.jpg'], id2);
  assert.strictEqual(Object.keys(stateAfterRemove.fileIdsByPath).length, 1);

  // Clear all files
  useStore.getState().clearFiles();

  const stateAfterClear = useStore.getState();
  assert.strictEqual(stateAfterClear.files.length, 0);
  assert.strictEqual(Object.keys(stateAfterClear.fileIdsByPath).length, 0);
});
