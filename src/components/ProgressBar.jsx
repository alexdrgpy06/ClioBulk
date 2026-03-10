import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  // ⚡ OPTIMIZATION: Subscribing only to 'processing' to avoid re-rendering on every progress tick.
  const processing = useStore((state) => state.processing);

  // Ref to directly manipulate the DOM element for progress updates.
  const progressRef = useRef(null);

  useEffect(() => {
    // ⚡ OPTIMIZATION: Bypass React render cycle for high-frequency progress updates.
    // We subscribe directly to the Zustand store and update the DOM element's style.
    // This reduces render thrashing significantly during batch processing.
    const unsubscribe = useStore.subscribe((state) => {
      if (progressRef.current) {
        progressRef.current.style.width = `${state.progress}%`;
        progressRef.current.setAttribute('aria-valuenow', state.progress);
      }
    });

    return unsubscribe;
  }, []);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressRef}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="0"
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
