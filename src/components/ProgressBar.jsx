import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  // We ONLY subscribe to `processing` from the Zustand store hook
  // to avoid React re-renders on `progress` updates
  const processing = useStore((state) => state.processing);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    // Immediately set the current progress when rendering starts
    if (progressRef.current) {
      progressRef.current.style.width = `${useStore.getState().progress}%`;
    }

    // Subscribe to state changes manually for high-frequency progress updates
    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (state.progress !== prevState.progress && progressRef.current) {
        progressRef.current.style.width = `${state.progress}%`;
      }
    });

    return unsubscribe;
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressRef}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        // Initial width set by React, subsequent updates are handled by ref
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
