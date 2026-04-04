import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  // Performance Optimization: Only subscribe to 'processing' to avoid high-frequency re-renders on every 'progress' tick.
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const progressRef = useRef(null);

  useEffect(() => {
    if (!processing || !progressRef.current) return;

    // Manually sync initial DOM state
    progressRef.current.style.width = `${useStore.getState().progress}%`;

    // Bypass React renders by subscribing directly to the store
    const unsubscribe = useStore.subscribe((state, prevState) => {
      // Manually compare state since subscribeWithSelector is not used
      if (state.progress !== prevState.progress && progressRef.current) {
        progressRef.current.style.width = `${state.progress}%`;
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
