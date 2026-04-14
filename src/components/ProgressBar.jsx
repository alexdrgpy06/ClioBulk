import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

// ⚡ Bolt: Prevent unnecessary re-renders during high-frequency progress updates.
// Only subscribing to `processing` state for React renders.
// Bypassing React to update the DOM width directly on `progress` state change.

const ProgressBar = () => {
  const processing = useStore((state) => state.processing);
  const barRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Synchronize initial state
    const initialState = useStore.getState();
    let prevProgress = initialState.progress;

    if (barRef.current) {
      barRef.current.style.width = `${prevProgress}%`;
    }

    const unsubscribe = useStore.subscribe((state) => {
      const currentProgress = state.progress;
      if (currentProgress !== prevProgress) {
        prevProgress = currentProgress;
        if (barRef.current) {
          barRef.current.style.width = `${currentProgress}%`;
        }
      }
    });

    return unsubscribe;
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
