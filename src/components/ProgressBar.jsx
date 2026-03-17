import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  const processing = useStore((state) => state.processing);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!processing || !progressRef.current) return;

    // Manually sync initial state
    const initialState = useStore.getState();
    progressRef.current.style.width = `${initialState.progress}%`;
    progressRef.current.setAttribute('aria-valuenow', initialState.progress);

    // Subscribe to store changes directly
    const unsubscribe = useStore.subscribe((state) => {
      if (progressRef.current) {
        progressRef.current.style.width = `${state.progress}%`;
        progressRef.current.setAttribute('aria-valuenow', state.progress);
      }
    });

    return () => unsubscribe();
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressRef}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
      />
    </div>
  );
};

export default ProgressBar;
