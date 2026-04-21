import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  // Only subscribe to 'processing' to avoid re-renders on high-frequency 'progress' updates
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const progressBarRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    let prevProgress = useStore.getState().progress;

    // Direct DOM manipulation bypassing React render cycle
    const unsubscribe = useStore.subscribe((state) => {
      if (state.progress !== prevProgress) {
        prevProgress = state.progress;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${state.progress}%`;
        }
      }
    });

    return () => unsubscribe();
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressBarRef}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ width: `${useStore.getState().progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
