import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  // Only subscribe to 'processing' to trigger mount/unmount.
  // Bypassing React render cycle for high-frequency 'progress' updates.
  const processing = useStore((state) => state.processing);
  const barRef = useRef(null);

  useEffect(() => {
    if (!processing || !barRef.current) return;

    // Manually sync the initial DOM state before subscribing
    const initialState = useStore.getState();
    barRef.current.style.width = `${initialState.progress}%`;
    barRef.current.setAttribute('aria-valuenow', String(Math.round(initialState.progress)));

    // Subscribe to the store to update DOM directly
    const unsubscribe = useStore.subscribe((state) => {
      if (barRef.current) {
        barRef.current.style.width = `${state.progress}%`;
        barRef.current.setAttribute('aria-valuenow', String(Math.round(state.progress)));
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
