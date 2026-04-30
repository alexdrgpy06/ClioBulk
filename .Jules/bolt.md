
## 2024-04-30 - Zustand v4 Vanilla Subscriptions & DOM Bypassing
**Learning:** In Zustand v4 without subscribeWithSelector, vanilla useStore.subscribe listens to the entire state object and passes (state, prevState). When bypassing React to directly mutate the DOM for high-frequency updates, relying on subscribe without manually checking state.progress !== prevState.progress inside the callback causes unnecessary DOM writes on unrelated state changes, degrading performance further.
**Action:** Always manually diff the specific state slice inside Zustand vanilla subscriptions when using them to bypass React renders.
