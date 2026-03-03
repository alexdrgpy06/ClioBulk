import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  const processing = useStore((state) => state.processing);
  const barRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // ⚡ Bolt Optimization:
    // Bypass React render cycle for high-frequency UI updates (progress bar).
    // Subscribe directly to Zustand store and mutate DOM node with useRef.
    const unsubscribe = useStore.subscribe((state) => {
      if (barRef.current) {
        const progress = state.progress;
        barRef.current.style.width = `${progress}%`;
        barRef.current.setAttribute('aria-valuenow', progress);
      }
    });

    // Initialize with current state
    if (barRef.current) {
      const progress = useStore.getState().progress;
      barRef.current.style.width = `${progress}%`;
      barRef.current.setAttribute('aria-valuenow', progress);
    }

    return unsubscribe;
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
