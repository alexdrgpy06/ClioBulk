import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  // Optimization: Do not subscribe to `progress` here to avoid re-rendering
  // on every progress tick (which happens extremely frequently during processing).
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const barRef = useRef(null);

  useEffect(() => {
    if (!processing || !barRef.current) return;

    // Initialize state
    barRef.current.style.width = `${useStore.getState().progress}%`;

    // Subscribe manually to the store to update DOM directly
    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (state.progress !== prevState.progress && barRef.current) {
        barRef.current.style.width = `${state.progress}%`;
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
