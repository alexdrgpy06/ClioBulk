import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  // Only subscribe to processing to avoid re-renders on every progress update
  const processing = useStore((state) => state.processing);
  const barRef = useRef(null);

  useEffect(() => {
    // Only set up subscription if we are processing
    if (!processing) return;

    // Synchronize initial state
    const initialState = useStore.getState();
    if (barRef.current) {
      barRef.current.style.width = `${initialState.progress}%`;
    }

    // Subscribe to all changes and filter manually
    let prevProgress = initialState.progress;
    const unsubscribe = useStore.subscribe((state) => {
      if (state.progress !== prevProgress) {
        prevProgress = state.progress;
        if (barRef.current) {
          barRef.current.style.width = `${state.progress}%`;
        }
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
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
