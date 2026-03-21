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
    if (!processing || !progressRef.current) return;

    // Manually sync initial state to avoid a frame jump
    const initialState = useStore.getState();
    const initialProgress = initialState.progress;
    progressRef.current.style.width = `${initialProgress}%`;
    progressRef.current.setAttribute('aria-valuenow', initialProgress);

    // Subscribe to store updates directly to bypass React renders for high-frequency progress events
    // Optimization: O(1) DOM update instead of full component re-render tree evaluation
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
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
