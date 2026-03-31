import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  // ⚡ Bolt: Only subscribe to 'processing' to avoid re-renders on every progress tick.
  const processing = useStore((state) => state.processing);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Sync initial state directly from the store
    if (progressRef.current) {
      const initialProgress = useStore.getState().progress;
      progressRef.current.style.width = `${initialProgress}%`;
    }

    // ⚡ Bolt: Bypass React renders for high-frequency progress updates
    // by subscribing directly to the store and mutating the DOM.
    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (state.progress !== prevState.progress && progressRef.current) {
        progressRef.current.style.width = `${state.progress}%`;
      }
    });

    return unsubscribe;
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressRef}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
