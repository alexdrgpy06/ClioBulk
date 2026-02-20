## 2024-05-23 - Full Demosaicing for Thumbnails
**Learning:** The application was performing full bilinear demosaicing of RAW files just to generate 1200px previews, which is extremely wasteful (CPU and memory).
**Action:** Always check if high-resolution processing is actually needed for the requested output size. Use superpixel/downsampling for previews.

## 2024-05-23 - RAW CFA Patterns
**Learning:** Hardcoding RGGB pattern for superpixel demosaicing causes incorrect colors for other CFA patterns (BGGR, GRBG, etc). `rawloader` provides `cfa.color_at(row, col)` which should be used to dynamically identify pixel colors.
**Action:** Always respect the CFA pattern provided by the RAW decoder library instead of assuming RGGB.
