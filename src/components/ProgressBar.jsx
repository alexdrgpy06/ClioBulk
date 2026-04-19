import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const progressRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Sync initial state
    if (progressRef.current) {
        progressRef.current.style.width = `${useStore.getState().progress}%`;
    }

    let prevProgress = useStore.getState().progress;

    // Subscribe to state changes without triggering React re-renders
    const unsubscribe = useStore.subscribe((state) => {
      if (state.progress !== prevProgress) {
        prevProgress = state.progress;
        if (progressRef.current) {
          progressRef.current.style.width = `${state.progress}%`;
        }
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
