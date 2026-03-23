import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  // Only subscribe to `processing` state to control mounting/unmounting.
  // We bypass React renders for the high-frequency `progress` updates.
  const processing = useStore((state) => state.processing);
  const barRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Sync initial DOM state immediately upon mounting
    if (barRef.current) {
      const initialProgress = useStore.getState().progress;
      barRef.current.style.width = `${initialProgress}%`;
      barRef.current.setAttribute('aria-valuenow', initialProgress);
    }

    // Subscribe directly to the store for high-frequency progress updates.
    // In Zustand v4+ without subscribeWithSelector, subscribe takes a single callback (state).
    const unsubscribe = useStore.subscribe((state) => {
      if (barRef.current && state.processing) {
        barRef.current.style.width = `${state.progress}%`;
        barRef.current.setAttribute('aria-valuenow', state.progress);
      }
    });

    return () => unsubscribe();
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={barRef}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
