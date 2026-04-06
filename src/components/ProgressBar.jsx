import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  const processing = useStore((state) => state.processing);
  const barRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    const syncProgress = (progress) => {
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`;
      }
    };

    // Synchronize initial state before subscription
    syncProgress(useStore.getState().progress);

    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (state.progress !== prevState.progress) {
        syncProgress(state.progress);
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
