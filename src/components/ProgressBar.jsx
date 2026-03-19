import React, { useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useShallow } from 'zustand/react/shallow';

const ProgressBar = () => {
  // Only subscribe to 'processing' to trigger mount/unmount.
  // We explicitly IGNORE 'progress' here to prevent React re-renders on every tick.
  const { processing } = useStore(
    useShallow((state) => ({
      processing: state.processing,
    }))
  );

  const barRef = useRef(null);

  useEffect(() => {
    // If not processing or no ref, do nothing
    if (!processing || !barRef.current) return;

    // 1. Manually sync the initial state before setting up subscription
    // This ensures if we mount mid-process, the bar immediately jumps to correct width
    const initialState = useStore.getState();
    barRef.current.style.width = `${initialState.progress}%`;

    // 2. Subscribe directly to the store for high-frequency progress updates
    // This bypasses React's render cycle completely, modifying the DOM directly.
    // O(1) direct DOM mutation vs O(N) VDOM reconciliation tree diffing.
    const unsubscribe = useStore.subscribe((state) => {
      if (barRef.current) {
        barRef.current.style.width = `${state.progress}%`;
      }
    });

    return () => {
      unsubscribe();
    };
  }, [processing]); // Re-run effect only when 'processing' boolean toggles

  if (!processing) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50">
      <div
        ref={barRef}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        // Initial style is 0% (or handled by useEffect immediately), removed inline dynamic style
        style={{ width: '0%' }}
      />
    </div>
  );
};

export default ProgressBar;
