import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  // Only subscribe to the boolean `processing` state to determine visibility.
  // This causes the component to render only twice per batch (start and end).
  const processing = useStore((state) => state.processing);

  // Use a ref to directly manipulate the DOM for high-frequency progress updates,
  // bypassing the React render cycle completely.
  const progressRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // ⚡ Bolt Optimization: Subscribe to store directly to update the DOM.
    // Progress updates happen very frequently (per file, per stage). By bypassing
    // React's render cycle, we save thousands of component re-renders during a large batch,
    // keeping the main thread free for actual image processing and maintaining a smooth 60fps UI.
    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (state.progress !== prevState.progress && progressRef.current) {
        progressRef.current.style.width = `${state.progress}%`;
        progressRef.current.setAttribute('aria-valuenow', state.progress.toString());
      }
    });

    // Set initial progress immediately upon mount
    if (progressRef.current) {
        const initialProgress = useStore.getState().progress;
        progressRef.current.style.width = `${initialProgress}%`;
        progressRef.current.setAttribute('aria-valuenow', initialProgress.toString());
    }

    return unsubscribe;
  }, [processing]);

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
        // Style width is initially set to 0 and managed directly by the ref via the subscription
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
