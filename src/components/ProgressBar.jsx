import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  // ⚡ Bolt Optimization: Only subscribe to 'processing' to mount/unmount.
  // We avoid subscribing to 'progress' to prevent frequent React re-renders.
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const barRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Direct DOM manipulation for high-frequency progress updates.
    // This bypasses the React render cycle, significantly improving performance.
    const unsubscribe = useStore.subscribe((state) => {
      if (barRef.current) {
        barRef.current.style.width = `${state.progress}%`;
        barRef.current.setAttribute('aria-valuenow', state.progress);
      }
    });

    // Set initial value
    const initialState = useStore.getState();
    if (barRef.current) {
      barRef.current.style.width = `${initialState.progress}%`;
      barRef.current.setAttribute('aria-valuenow', initialState.progress);
    }

    return () => unsubscribe();
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={barRef}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
      />
    </div>
  );
};

export default ProgressBar;
