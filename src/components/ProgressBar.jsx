import React, { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

/**
 * ⚡ Bolt Optimization: Bypass React Render Cycle for Progress Updates
 *
 * Instead of relying on React state/props to trigger re-renders on every progress tick
 * (which can happen hundreds of times per second during bulk processing and cause frame drops),
 * we subscribe directly to the Zustand store and mutate the DOM manually.
 *
 * Impact: Reduces React re-renders of the ProgressBar component from O(N) (where N is progress events)
 * down to 0 during the entire processing phase, freeing up the main thread.
 */
const ProgressBar = () => {
  const containerRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // Standard Zustand v4+ subscription without subscribeWithSelector
    const unsubscribe = useStore.subscribe((state) => {
      if (containerRef.current) {
        containerRef.current.style.display = state.processing ? 'block' : 'none';
      }
      if (barRef.current) {
        barRef.current.style.width = `${state.progress}%`;
        barRef.current.setAttribute('aria-valuenow', Math.round(state.progress).toString());
      }
    });

    return unsubscribe;
  }, []);

  // Read initial state only once on mount
  const initialState = useStore.getState();

  return (
    <div
      ref={containerRef}
      style={{ display: initialState.processing ? 'block' : 'none' }}
      className="fixed bottom-0 left-0 w-full h-1.5 bg-zinc-900 z-50"
    >
      <div
        ref={barRef}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(initialState.progress).toString()}
        className="h-full bg-blue-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ width: `${initialState.progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
