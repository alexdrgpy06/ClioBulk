#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

/**
 * Author: Alejandro Ramírez
 * Project: ClioBulk
 * Logic: High-performance image processing application entry point (Tauri).
 */

// Prevents additional console window on Windows in release, DO NOT REMOVE!!


fn main() {
  app_lib::run();
}
