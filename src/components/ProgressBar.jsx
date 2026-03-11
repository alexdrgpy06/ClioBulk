import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  // ⚡ Bolt Optimization: Only subscribe to `processing` to control mount/unmount.
  // We do NOT subscribe to `progress` here to prevent React from re-rendering
  // the entire component (and triggering reconciliation) on every single progress tick.
  const processing = useStore((state) => state.processing);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // ⚡ Bolt Optimization: Subscribe directly to the Zustand store.
    // This allows us to update the DOM node's style directly (bypassing React)
    // which is significantly faster for high-frequency updates like progress bars.
    const unsubscribe = useStore.subscribe((state) => {
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${state.progress}%`;
        progressBarRef.current.setAttribute('aria-valuenow', state.progress);
      }
    });

    return () => unsubscribe();
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressBarRef}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={useStore.getState().progress}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ width: `${useStore.getState().progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
