# Hardening Checklist — cliobulk

Tracks whop-product-lab issue #14. **Audit only — no fixes applied this round.** Every finding below is severity-ranked (Critical/High/Medium/Low) with a one-line fix recommendation for a follow-up round. See `docs/specs/14-local-image-raw-family-hardening.md` for the canonical-base decision this checklist feeds into, and `NAMING.md` for the naming proposal.

## Follow-up pass (2026-09-18) — JS/web-side only

Fixed, scoped to what's verifiable without a Rust/Tauri build in this sandbox (see original scope note in section 3):

- **Dependency audit (section 1):** ran `npm audit fix` (in-range only). 5 of 6 original highs resolved (browserslist, nanoid, picomatch, postcss, rollup). The remaining 1 high (vite path-traversal) + 1 moderate (esbuild) only have a fix via the Vite 5→8 major bump, which this checklist explicitly said needs separate sign-off — **not done**, still open.
- **Test coverage (section 5):** added `vitest`, wired `npm test`, and wrote a real test suite for `parseCubeLUT` (`src/utils/webgl-engine.js`) and `isRaw` (`src/utils/raw-decoder.js`) — 20 tests, all passing. The `parseCubeLUT` suite includes a test that documents a real defect: a malformed data row (wrong column count) is silently dropped instead of erroring, desyncing the flat LUT array from the declared `size` — see the test named `BUG: silently drops a malformed row...` for the exact mechanism. Not fixed (out of scope for this pass), just now covered so it can't regress silently and is visible to the next person who touches this file.
- `npm run build` still passes after both changes.
- Not touched: `src-tauri/`, any `.rs` file, the Vite major bump, RAW CFA/demosaic findings (native-side, sections 6-7).

Environment this audit ran in: Node v22.22.2, npm 10.9.7, cargo/rustc 1.94.1 (both present), Linux sandbox.

## Findings summary

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 2 |
| Medium | 3 |
| Low | 4 |

## 1. Dependency audit

`npm install` — **pass**. 113 packages added, audited 114 packages, 5s.

`npm audit` — **9 vulnerabilities: 0 critical, 6 high, 2 moderate, 1 low.** All are transitive devDependencies of the Vite 5.4.21 toolchain (esbuild/rollup/postcss/browserslist/nanoid/picomatch chain), not runtime dependencies shipped in the built `dist/` bundle.

| Package | Severity | Issue | Fix available |
|---|---|---|---|
| browserslist | High | unbounded memory growth / crash via untrusted stats file | yes, in-range |
| nanoid | High | non-secure generator can loop indefinitely on bad input | yes, in-range |
| picomatch | High | ReDoS + method injection in glob matching | yes, in-range |
| postcss | High | XSS in CSS stringify output, path traversal via `sourceMappingURL` | yes, in-range |
| rollup | High | arbitrary file write via path traversal | yes, in-range |
| vite | High | path traversal in optimized-deps `.map` handling | yes, but **semver-major** (→ vite 8.3.0) |
| esbuild | Moderate | dev server accepts requests from any website and returns responses | yes, via same major vite bump |
| baseline-browser-mapping | Moderate | process termination on invalid input (DoS) | yes, in-range |
| postcss-selector-parser | Low | uncontrolled AST recursion (DoS) | yes, in-range |

- **[High] 6 high-severity transitive dev-dependency vulnerabilities, dominated by an outdated Vite 5 toolchain.** None are in the shipped runtime bundle (they're build-tooling, not app code), so buyer-facing risk is low, but a commercial release should not ship with `npm audit` reporting 6 highs. *Fix: run `npm audit fix` for the in-range fixes, then evaluate the Vite 5→8 major bump separately (breaking-change risk — needs a real build/smoke-test pass, not a blind bump) — do this in the implementation round, not here.*
- **[Low] Dependency freshness beyond the audit:** React 18.3.1 (React 19 is current major), Zustand 4.5.2 (v5 is current major), Tauri 2.10.0 (current-ish at audit time). None urgent on their own. *Fix: track for a routine major-version upgrade pass once the canonical-base merge (see spec doc) is done, so it isn't done twice.*
- **[Low] Two competing lockfiles committed:** both `package-lock.json` and `pnpm-lock.yaml` are present at the repo root. Depending which tool a contributor runs, installs can drift out of sync with each other. *Fix: pick one package manager (npm, given `package.json` scripts assume `npm run ...`) and delete the other lockfile.*

## 2. Secrets / data hygiene

- `.gitignore` excludes `node_modules`, `dist`, `dist-*`, `target`, `src-tauri/target`, `.env`/`.env.*` (with `!.env.example` allowed), logs, IDE folders, `.tauri`, `src-tauri/gen`. **Adequate.**
- No `.env` or `.env.example` is present or tracked in this repo at all (`git ls-files | grep -i env` returns nothing) — nothing to leak.
- Grepped `src/`, `src-tauri/src/`, and top-level `*.json`/`*.js` for hardcoded API keys/secrets/passwords/tokens/bearer strings — **no matches.**
- **Clean — no findings.**

## 3. Security review (`.Jules/sentinel.md`)

`sentinel.md` documents: "Custom Rust commands using standard `std::fs` or library IO functions (like `image::open`) bypass Tauri's filesystem scope checks defined in `capabilities`... Backend commands must manually enforce scopes using `app.fs_scope().is_allowed()`."

**Checked against `src-tauri/src/commands.rs` directly — the concern is already mitigated in the current code:**

- `decode_raw` (line 51): calls `app.fs_scope().is_allowed(&path)` before any filesystem read.
- `process_image_inner` (lines 89, 100) — the function backing both `process_image` and `process_bulk` — checks `app.fs_scope().is_allowed(&path)` for the read path **and** `app.fs_scope().is_allowed(&out_path)` for the write path, both before touching the filesystem.

- **[Info, no fix needed]** All three exposed Tauri commands (`decode_raw`, `process_image`, `process_bulk`) already enforce the scope check the sentinel.md note warns about. This is the one item in this checklist that's already in good shape — document it so it isn't "fixed" again or accidentally regressed. *Recommendation for later: add a short Rust comment above each `is_allowed` call referencing `.Jules/sentinel.md`, and/or a regression test that constructs a path outside the configured scope and asserts the command returns `Err`, so a future refactor can't silently drop the check.* No Rust source in `src-tauri/` was found to be out of scope for this check — the audit covered all three commands, which are all of them (`lib.rs`'s `generate_handler!` list has exactly these three).

## 4. Build health

- `npm install` — **pass** (113 packages, 5s, no errors).
- `npm run build:web` (`vite build --mode web`) — **pass.** 1531 modules transformed, `dist/` produced (`index.html`, `processor.worker-*.js` 5.91 kB, `index-*.css` 18.64 kB, `lucide-*.js` 12.20 kB, `index-*.js` 24.38 kB, `react-vendor-*.js` 133.96 kB), built in 1.83s. Only warning: `caniuse-lite` data is 8 months stale (cosmetic, `npx update-browserslist-db@latest` fixes it).
- **Native (Tauri/Rust) build — attempted, not verified.** A Rust toolchain **is** available in this sandbox (`cargo 1.94.1`, `rustc 1.94.1`, confirmed via `cargo --version`/`rustc --version`), so this is **not** the "no Rust toolchain" case. Running `cargo check --locked` in `src-tauri/` compiles ~100+ crates successfully, then **fails** in the `gdk-sys v0.18.2` build script:
  ```
  error: failed to run custom build command for `gdk-sys v0.18.2`
  pkg-config exited with status code 1
  > PKG_CONFIG_ALLOW_SYSTEM_CFLAGS=1 pkg-config --libs --cflags gdk-3.0 'gdk-3.0 >= 3.22'
  The system library `gdk-3.0` required by crate `gdk-sys` was not found.
  ```
  Confirmed independently: `pkg-config --exists gdk-3.0`/`webkit2gtk-4.1` both fail; `libgtk-3-0` (the runtime `.so`) is installed but the GTK3/WebKit2GTK **development** packages (headers + `.pc` files, e.g. Debian/Ubuntu's `libgtk-3-dev`, `libwebkit2gtk-4.1-dev`) are not. **This is a Linux desktop-build blocker caused by missing system dev libraries, not by the app's Rust code or by an absent Rust toolchain.** *Fix (for whoever next builds/CI's this): install the Tauri Linux prerequisite packages (`libgtk-3-dev`, `libwebkit2gtk-4.1-dev`, `libayatana-appindicator3-dev`, `librsvg2-dev`, per Tauri's official Linux setup docs) before attempting `cargo build`/`tauri build` on Linux; Windows/macOS native builds need their own platform toolchains and were not attempted here (no Windows/macOS runners in this sandbox).*
- No installer/signing pipeline was attempted or is in scope this round (issue deliverable for a later round).

## 5. Test coverage

- **No `test` script in `package.json`** — confirmed by inspection; there's no JS-level test suite (unit/integration/e2e) at all for the React/JS side. **[High] Gap — flagged, not fixed this round** (adding tests is implementation work, out of scope for an audit round). *Fix: add a `test` script (e.g. `vitest` or `node --test`, matching `finalstudiorawr`'s pattern) covering at minimum `src/utils/webgl-engine.js`'s `parseCubeLUT` (see the real bug found below — an obvious first test case) and `src/utils/raw-decoder.js`'s `isRaw`.*
- **Rust-level tests do exist** and are a real, if narrow, asset: `src-tauri/tests/image_processing.rs` has 4 tests (`test_brightness_adjustment`, `test_contrast_adjustment`, `test_denoise`, `test_adaptive_threshold`) exercising `image_ops::apply_filters`. They are **not** wired into any npm script and could not be executed in this sandbox because `cargo test` hits the same `gdk-sys`/system-library blocker as `cargo check` (see Build health) — the crate can't finish compiling here regardless of which cargo subcommand is used. *Fix: once the Linux dev-library gap is closed (or in a CI image that already has them), run `cargo test` in `src-tauri/` and wire it into a `test:rust` npm script or CI job so these tests are actually exercised on a normal basis.*

## 6. Camera/RAW compatibility matrix

README claims: "Professional RAW Support: Advanced decoding for major camera formats (ARW, CR2, NEF, DNG) with real-time native previews."

| Format | Web decode path | Native decode path | Status |
|---|---|---|---|
| ARW (Sony) | `src/utils/raw-decoder.js`: `decodeRaw()` calls `createImageBitmap(file)` directly on the raw file when not in Tauri | `src-tauri/src/commands.rs::decode_raw` / `process_image_inner` → `image_ops::decode_raw_to_image` → `rawloader::decode_file` + hand-written bilinear demosaic hardcoded to an **RGGB** Bayer pattern | **Web: unverified/likely non-functional** — browsers cannot natively rasterize `.arw` via `createImageBitmap`; no fallback decode logic exists. **Native: implemented but CFA-pattern-unaware** — `image_ops.rs` never reads the sensor's actual CFA layout from `rawloader`'s metadata, so non-RGGB Sony sensors will demosaic with wrong color assignment. Could not execute a real `.arw` file through this path in this sandbox (native build doesn't compile here — see Build health) — this is a static-code read, not a run-time-verified claim. |
| CR2 (Canon) | same stub | same `rawloader` path, same RGGB assumption | Same caveats as ARW. |
| NEF (Nikon) | same stub | same `rawloader` path, same RGGB assumption | Same caveats as ARW. |
| DNG (Adobe) | same stub | same `rawloader` path, same RGGB assumption | Same caveats as ARW. |
| ORF, RAF (and others) | `src/utils/raw-decoder.js::isRaw()` lists `.orf`/`.raf` in its extension check | `process_image_inner`'s explicit RAW-format branch (lines 113–116) only matches `.arw`/`.cr2`/`.nef`/`.dng` — anything else, including `.orf`/`.raf`, falls through to `image::open(&path)`, a general-purpose image loader that **cannot** parse RAW sensor data | **Claimed in the web-side extension list but not actually wired to the RAW decode path anywhere** — these formats would silently mis-route to a decoder that can't read them. |

- **[Medium] Native RAW demosaic hardcodes RGGB and ignores each file's real CFA pattern.** *Fix: read the CFA pattern rawloader exposes in its metadata and branch the demosaic accordingly, or replace the hand-rolled demosaic with a maintained crate/library that already does this correctly (this is effectively what `finalstudiorawr`'s `libraw-wasm` path already gets for free — see spec doc's canonical-base evidence).*
- **[Medium] Web-mode RAW "decoding" is a non-functional stub.** *Fix: either be explicit in the README (matching `DEPLOYMENT.md`'s already-honest "RAW decoding is currently limited in the browser" caveat) until it's fixed, or port `finalstudiorawr`'s `libraw-wasm`-based web decoder in the next round.*
- **[Low] `isRaw()`'s extension list (`.orf`, `.raf`) is broader than what the native pipeline actually routes to RAW decoding.** *Fix: either extend `process_image_inner`'s format check to match `isRaw()`'s list, or narrow `isRaw()` to only the formats actually wired up, so the two don't silently disagree.*

## 7. CFA / white balance / color handling inventory (high-level, not a deep color-science review)

- **`src/utils/webgl-engine.js` (browser engine):** a `WebGLEngine` class rendering via a WebGL2 fragment shader (with a WebGL1 no-op fallback that ignores LUT/watermark entirely). Color operations available in the browser: 3D-LUT application (`u_lut` sampler3D, trilinear via hardware texture filtering) and watermark alpha-compositing. **No brightness/contrast/saturation/exposure/white-balance/CFA handling exists at all in the browser engine** — those only exist on the native (Rust) side. Also includes `parseCubeLUT()` for `.cube` LUT files.
- **`src-tauri/src/image_ops.rs` (native engine):** RGGB-hardcoded bilinear demosaic (see RAW matrix above, both integer and float `rawloader` data paths); `apply_filters()` does denoise (median filter, radius 1), then a fused brightness/contrast/saturation pass (saturation via a luminance-weighted mix, `0.299/0.587/0.114` Rec.601-style weights, not linear-light), then optional adaptive threshold (binarizes to grayscale — a destructive effect, not a color-grading step). No white-balance control (temperature/tint) exists anywhere in this repo's native or web engine; `rawloader`'s decode uses whatever white level normalization the crate provides internally, with no user-facing WB adjustment.
- **[Medium] No user-facing white balance (temperature/tint) control anywhere in this repo**, despite RAW files carrying camera WB metadata that a "professional RAW" tool would typically expose. *Fix: expose temp/tint controls backed by `rawloader`'s camera WB data (native) — `finalstudiorawr`'s `image-engine.js::stepColorGrade`/`stepUserAdjustments` already has a working temp/tint implementation to reference, per the spec doc's canonical-base evidence.*

## 8. Miscellaneous

- **[Low] `.Jules/palette.md` and `.Jules/sentinel.md` read for this audit, not modified.** Both remain exactly as found.
