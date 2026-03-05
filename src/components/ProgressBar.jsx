import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  const progressBarRef = useRef(null);

  // Cleanly subscribe to processing state for visibility
  const isProcessing = useStore((state) => state.processing);

  useEffect(() => {
    // Only subscribe to progress updates outside the render loop
    // This avoids triggering full component re-renders on every progress tick
    const unsubscribe = useStore.subscribe((state) => {
      // Update DOM directly for high-frequency progress updates
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${state.progress}%`;
        // Maintain ARIA accessibility by keeping attributes synced
        progressBarRef.current.setAttribute('aria-valuenow', state.progress);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!isProcessing) return null;

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
