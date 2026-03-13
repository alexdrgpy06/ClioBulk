// Author: Alejandro Ramírez
// Project: ClioBulk
// Logic: High-performance image processing application entry point (Tauri V2)

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  app_lib::run();
}
