import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  // ⚡ Bolt: Optimize progress bar to avoid re-renders on every progress tick
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const barRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Explicitly sync initial state to avoid desyncs
    const initialState = useStore.getState();
    if (barRef.current) {
      barRef.current.style.width = `${initialState.progress}%`;
    }

    // Subscribe to state changes manually to update DOM directly
    let prevProgress = initialState.progress;

    const unsubscribe = useStore.subscribe((state) => {
      // Since we don't have subscribeWithSelector, we check the progress property manually
      if (state.progress !== prevProgress) {
        prevProgress = state.progress;
        if (barRef.current) {
          barRef.current.style.width = `${state.progress}%`;
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
