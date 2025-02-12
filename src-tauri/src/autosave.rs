use log::{error, info, warn};
use serde::{Deserialize, Serialize};
use std::env;
use std::fs::{create_dir_all, File};
use std::io::{Read, Write};
use std::path::Path;

#[derive(Debug, Serialize, Deserialize)]
pub struct Task {
    content: String,
    #[serde(rename = "isDone")]
    is_done: bool,
}

impl Task {
    pub fn new(content: String, is_done: bool) -> Self {
        Self { content, is_done }
    }

    fn get_appdata_path() -> String {
        return env::var("APPDATA").map_err(|e| e.to_string()).unwrap();
    }

    fn get_deafult_saving_directory_part() -> String {
        return r"textPresenter\autoSavings".to_string();
    }

    fn make_save_file_patch(path: String, file_name: String) -> String {
        return path + "/" + &file_name;
    }

    pub fn save_content(
        file_path: &str,
        content: Option<Vec<Option<Task>>>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let content_null_save: Vec<Task> = content
            .unwrap_or_default()
            .into_iter()
            .map(|task| match task {
                Some(t) => t,
                None => Task::new("".to_string(), false),
            })
            .collect();

        let task_contents = serde_json::to_string_pretty(&content_null_save)?;

        let path = Path::new(file_path);
        if let Some(path_directory) = path.parent() {
            create_dir_all(path_directory).map_err(|e| {
                error!("Cannot create directory: {}", e);
                e
            })?;
        }

        let mut file = File::create(file_path).map_err(|e| {
            error!("Cannot create file: {}", e);
            e
        })?;

        file.write_all(task_contents.as_bytes()).map_err(|e| {
            error!("Failed to save file: {}", e);
            e
        })?;

        Ok(())
    }

    pub fn get_deafult_directory() -> String {
        return format!(
            "{}\\{}",
            Task::get_appdata_path(),
            Task::get_deafult_saving_directory_part()
        );
    }

    pub fn get_default_save_file() -> String {
        return Task::make_save_file_patch(
            Task::get_deafult_directory(),
            "autoSavingDev.json".to_string(),
        );
    }

    pub fn read_auto_save_content(
        file_path: &str,
    ) -> Result<Vec<Task>, Box<dyn std::error::Error>> {
        let mut file = File::open(file_path).map_err(|e| {
            error!("Cannot open file: {}", e);
            e
        })?;
        let mut content = String::new();
        file.read_to_string(&mut content).map_err(|e| {
            error!("Failed to read a file content: {}", e);
            e
        })?;
        let tasks: Vec<Task> = serde_json::from_str(&content).map_err(|e| {
            error!("Failed to parse JSON: {}", e);
            e
        })?;

        Ok(tasks)
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    #[ignore = "testing"]
    fn read_app_data_test() {
        let appdata_path = env::var("APPDATA").map_err(|e| e.to_string());
        let test = format!("{}\n", appdata_path.unwrap());
        print!("{}", test);
    }

    #[test]
    fn make_save_file_manula_test() {
        print!("{}", Task::get_default_save_file());

        let task = Task::new("cost tam tekst 19".to_string(), false);
        let task2 = Task::new("cost tam tekst 15".to_string(), false);

        let tasks = Some(vec![Some(task), Some(task2)]);

        let _ = Task::save_content(&Task::get_default_save_file(), tasks);
    }

    #[test]
    fn make_deafult_file_to_save_test() {
        let location_path: String = r"C:/Users/jacek/Roaming/textPresenter".to_string();
        let file_name_in_location: String = r"auto_savings.json".to_string();

        assert_eq!(
            Task::make_save_file_patch(location_path, file_name_in_location),
            r"C:/Users/jacek/Roaming/textPresenter/auto_savings.json"
        );
    }

    #[test]
    fn default_saving_path_is_right_test() {
        assert_eq!(
            Task::get_deafult_saving_directory_part(),
            r"textPresenter\autoSavings"
        );
    }

    #[test]
    fn read_auto_save_content_manual() {
        match Task::read_auto_save_content(&Task::get_default_save_file()) {
            Ok(tasks) => {
                for task in tasks {
                    print!("{:?}", task);
                }
            }
            Err(e) => eprint!("error reading file: {:?}", e),
        }
    }
}
