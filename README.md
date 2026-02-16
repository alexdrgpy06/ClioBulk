# ClioBulk

> **Architect: Alejandro Ramírez**

A high-performance batch image processing application that bridges web and native environments for professional-grade RAW decoding and color grading.

---

## 🚀 Overview
ClioBulk is a dual-engine image processing suite designed for speed and precision. It leverages Tauri and Rust for native performance on the desktop, while providing a seamless web-based fallback using Web Workers and WebGL. It specializes in batch processing large volumes of images, including professional RAW formats, with real-time previews and hardware-accelerated adjustments.

## ✨ Key Features
- **Hybrid Processing Engine:** Seamlessly switches between high-performance Rust (Native) and WebGL-accelerated Web Workers (Browser) based on the environment.
- **Professional RAW Support:** Advanced decoding for major camera formats (ARW, CR2, NEF, DNG) with real-time native previews.
- **Dynamic Color Grading:** Support for 3D LUT (.cube) files and real-time adjustment of brightness, contrast, and saturation.
- **Advanced Watermarking:** Customizable text-based watermarking with canvas-driven high-performance rendering.
- **Batch Pipeline:** Optimized multi-threaded processing for large image sets with real-time progress tracking and automated exports.

## 🛠️ Tech Stack
- **Language:** JavaScript (React), Rust (Tauri Backend)
- **Framework/Libraries:** React 18, Tauri 2.0, Zustand, Tailwind CSS, Lucide React
- **Infrastructure:** Vite (Build Tool), Web Workers (Parallel Processing)
- **Processing:** WebGL Engine (Color Grading), Rust Image Crate (Native Processing)

## 📦 Installation & Getting Started

### Prerequisites
- Node.js (v18+)
- Rust and Cargo (for native build)

### Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/alexdrgpy06/ClioBulk.git
   cd ClioBulk
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   - **Browser Mode:**
     ```bash
     npm run dev
     ```
   - **Native Desktop Mode:**
     ```bash
     npm run tauri dev
     ```

## 📜 License
This project is licensed under the **MIT** License.

---
*Built with precision by Alejandro Ramírez.*
