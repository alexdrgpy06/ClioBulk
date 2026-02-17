## 2024-06-25 - [Manual Demosaicing Assumption]
**Learning:** The codebase manually implements Bayer demosaicing assuming an RGGB pattern for all RAW files, ignoring the actual CFA pattern provided by `rawloader`. This simplifies the code but risks incorrect colors for non-RGGB cameras.
**Action:** When implementing new RAW processing logic (like previews), either replicate this assumption to maintain consistency or implement full CFA pattern support to fix the underlying limitation.
