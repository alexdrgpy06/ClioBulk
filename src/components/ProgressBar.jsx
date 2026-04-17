import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  // Only subscribe to processing state to avoid re-renders on progress updates
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const progressRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Synchronize initial state
    const initialState = useStore.getState();
    if (progressRef.current) {
      progressRef.current.style.width = `${initialState.progress}%`;
    }

    let previousProgress = initialState.progress;

    // Subscribe to all state changes (Zustand v4 default behavior without subscribeWithSelector)
    const unsubscribe = useStore.subscribe((state) => {
      if (state.progress !== previousProgress && progressRef.current) {
        progressRef.current.style.width = `${state.progress}%`;
        previousProgress = state.progress;
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
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
