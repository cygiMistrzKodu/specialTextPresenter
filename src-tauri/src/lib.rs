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
            auto_save_tasks
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn write_container_content(task_content: &str) {
    print!("Z fontu ->>: {}\n", task_content)
}

#[tauri::command]
fn auto_save_tasks(tasks: Vec<Task>) -> Result<(), String> {
    // tutaj będzie jeszcze jakaś wartość do przekazania w parametrze lista danych z taska

    // let task = Task {
    //     content: "cost tam tekst 1".to_string(),
    // };

    // let task2 = Task {
    //     content: "cost tam tekst 2".to_string(),
    // };

    // let tasks = vec![task, task2];

    Task::save_content(&Task::get_default_save_file_patch(), &tasks).map_err(|e| e.to_string())?;

    Ok(())
}
