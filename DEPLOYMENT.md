# ClioBulk Deployment Guide

This guide covers how to deploy the web version of ClioBulk to Vercel and how to build the native desktop version.

## 🌐 Web Version (Vercel)

ClioBulk is optimized for Vercel. The web version uses a WebGL-powered processing engine running in a Web Worker, allowing for fast image adjustments directly in the browser.

### Features in Web Version
- **WebGL Processing**: Hardware-accelerated filters and LUTs.
- **Client-Side Only**: Your photos never leave your computer.
- **Privacy**: No server-side processing or data collection.

### Limitations in Web Version
- **RAW Support**: RAW decoding is currently limited in the browser. Use the Native version for full RAW support (ARW, CR2, NEF, DNG).
- **File System**: Browser version uses the standard Download folder instead of direct path management.

### How to Deploy
1. **Push to GitHub**: Push your repository to GitHub.
2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com).
   - Create a new project and select your repository.
   - Vercel will automatically detect the Vite framework.
   - **Build Command**: `npm run build:web`
   - **Output Directory**: `dist`
3. **Deploy**: Click Deploy.

## 💻 Native Version (Windows/macOS/Linux)

The native version uses Tauri and Rust for maximum performance and full RAW support.

### Features in Native Version
- **Native RAW Decoder**: High-quality decoding for professional RAW formats.
- **Multithreaded Processing**: Intelligent use of all CPU cores.
- **Direct File Access**: Read and write files directly to any directory.

### How to Build
1. Install [Rust](https://rustup.rs/) and [Node.js](https://nodejs.org/).
2. Install Tauri CLI: `npm install -g @tauri-apps/cli` (or use `npm run tauri`).
3. Build the application:
   ```bash
   npm run tauri build
   ```
4. The installer will be located in `src-tauri/target/release/bundle/`.

## 🛠️ Performance Optimization

- **Chunking**: The frontend is optimized using manual chunks for React and Lucide icons to improve load times.
- **WebGL**: The web engine uses `OffscreenCanvas` in a worker to prevent UI freezing during processing.
- **Rust Concurrency**: The native engine uses `tokio` and `Semaphore` to manage CPU load during bulk operations.
