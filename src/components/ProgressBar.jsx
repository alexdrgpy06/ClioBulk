import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  // Only subscribe to processing state to avoid re-renders on high-frequency progress updates
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const progressRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Manually sync initial state
    if (progressRef.current) {
      progressRef.current.style.width = `${useStore.getState().progress}%`;
    }

    // Subscribe directly to store for progress updates to bypass React renders
    let prevProgress = useStore.getState().progress;

    const unsubscribe = useStore.subscribe((state) => {
      // In Zustand v4 without subscribeWithSelector, the callback receives the full state
      // We must manually compare to avoid redundant DOM updates
      if (state.progress !== prevProgress) {
        prevProgress = state.progress;
        if (progressRef.current) {
          progressRef.current.style.width = `${state.progress}%`;
        }
      }
    });

    return () => unsubscribe();
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressRef}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ width: '0%' }} // Initial state before manual sync
      />
    </div>
  );
};

export default ProgressBar;
