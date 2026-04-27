import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const ProgressBar = () => {
  const processing = useStore(state => state.processing);
  const progressRef = useRef(null);

  useEffect(() => {
    if (!processing) return;

    const initialProgress = useStore.getState().progress;
    if (progressRef.current) {
      progressRef.current.style.width = `${initialProgress}%`;
    }

    const unsub = useStore.subscribe((state, prevState) => {
      if (state.progress !== prevState.progress && progressRef.current) {
        progressRef.current.style.width = `${state.progress}%`;
      }
    });

    return unsub;
  }, [processing]);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressRef}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
      />
    </div>
  );
};

export default ProgressBar;
