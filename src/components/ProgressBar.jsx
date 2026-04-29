import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  const progressRef = useRef(null);
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  useEffect(() => {
    const unsubscribe = useStore.subscribe((state, prevState) => {
      if (progressRef.current && state.progress !== prevState.progress) {
        progressRef.current.style.width = `${state.progress}%`;
      }
    });

    return () => unsubscribe();
  }, []);

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={progressRef}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ width: `${useStore.getState().progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
