import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  // ⚡ Bolt Optimization: Only subscribe to 'processing' to trigger mount/unmount.
  // We remove the 'progress' dependency here so React doesn't re-render
  // on every single percentage change (which can be 100+ times per file).
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const barRef = useRef(null);

  useEffect(() => {
    // If we're not processing, the bar isn't rendered, so do nothing.
    if (!processing || !barRef.current) return;

    // ⚡ Bolt Optimization: Sync initial state immediately before subscription
    // to prevent visual layout jumps when mounting mid-process.
    const initialProgress = useStore.getState().progress;
    barRef.current.style.width = `${initialProgress}%`;

    // ⚡ Bolt Optimization: Subscribe directly to Zustand store for progress updates.
    // This allows us to mutate the DOM directly, completely bypassing the React render cycle
    // for high-frequency progress events, freeing up the main thread.
    const unsubscribe = useStore.subscribe((state) => {
      if (barRef.current) {
        barRef.current.style.width = `${state.progress}%`;
      }
    });

    return () => unsubscribe();
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={barRef}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
      />
    </div>
  );
};

export default ProgressBar;
