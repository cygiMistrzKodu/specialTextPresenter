// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
pub mod autosave;
use autosave::Task;
use browser::open_in_firefox;
use std::env;
pub mod browser;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        .invoke_handler(tauri::generate_handler![
            auto_save_tasks,
            read_saved_tasks_contents,
            send_to_browser
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
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

#[tauri::command]
fn send_to_browser(links: Vec<String>) -> Result<(), String> {
    open_in_firefox(links);

    Ok(())
}
