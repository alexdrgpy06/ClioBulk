import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  // Only subscribe to `processing` state for mounting/unmounting
  // We extract this out of useShallow to completely bypass re-renders when `progress` changes
  const processing = useStore((state) => state.processing);

  // Ref to directly manipulate the DOM element for progress updates
  const progressRef = useRef(null);

  useEffect(() => {
    // If not processing, we don't need to subscribe to progress updates
    if (!processing) return;

    // ⚡ Bolt Optimization:
    // Subscribe directly to the Zustand store for high-frequency progress updates.
    // This bypasses the React render cycle entirely, preventing expensive React Fiber tree diffing
    // and re-renders for every single percentage change during batch processing.
    // Instead, we directly manipulate the CSSOM (style.width) and DOM attributes (aria-valuenow).
    const unsubscribe = useStore.subscribe((state) => {
      if (progressRef.current) {
        // Direct DOM manipulation is O(1) and orders of magnitude faster than a React re-render
        progressRef.current.style.width = `${state.progress}%`;
        progressRef.current.setAttribute('aria-valuenow', state.progress);
      }
    });

    // Run once on mount to set initial width
    if (progressRef.current) {
      const initialProgress = useStore.getState().progress;
      progressRef.current.style.width = `${initialProgress}%`;
      progressRef.current.setAttribute('aria-valuenow', initialProgress);
    }

    return () => unsubscribe();
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressRef}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        // Initial style is handled by the ref/effect to prevent hydration mismatch
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
