// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
pub mod autosave;
use autosave::Task;
use std::env;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            write_container_content,
            auto_save_tasks,
            read_saved_tasks_contents
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn write_container_content(task_content: &str) {
    print!("Z fontu ->>: {}\n", task_content)
}

#[tauri::command]
fn auto_save_tasks(task_contents: Option<Vec<Option<Task>>>) -> Result<(), String> {
    Task::save_content(&Task::get_default_save_file(), task_contents).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn read_saved_tasks_contents() -> Result<Vec<Task>, String> {
    let tasks =
        Task::read_auto_save_content(&Task::get_default_save_file()).map_err(|e| e.to_string())?;

    Ok(tasks)
}
