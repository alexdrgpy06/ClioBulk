import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const barRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Manual sync of initial DOM state
    const initialProgress = useStore.getState().progress;
    if (barRef.current) {
      barRef.current.style.width = `${initialProgress}%`;
    }

    // Subscribe to state changes without triggering React re-renders
    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (state.progress !== prevState?.progress && barRef.current) {
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
        // ⚡ Bolt: Removed inline style to prevent React re-renders on progress update
      />
    </div>
  );
};

export default ProgressBar;
