use log::{error, info, warn};
use serde::{Deserialize, Serialize};
use std::env;
use std::fs::{create_dir_all, File};
use std::io::{Read, Write};
use std::path::Path;

#[derive(Serialize, Deserialize)]
pub struct Task {
    pub content: String,
}

impl Task {
    fn get_appdata_path() -> String {
        return env::var("APPDATA").map_err(|e| e.to_string()).unwrap();
    }

    fn get_deafult_saving_path() -> String {
        return r"textPresenter\autoSavings".to_string();
    }

    fn make_save_file_patch(path: String, file_name: String) -> String {
        return path + "/" + &file_name;
    }

    pub fn save_content(
        file_path: &str,
        content: &Vec<Task>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let contents = serde_json::to_string_pretty(content)?;

        let path = Path::new(file_path);
        if let Some(path_directory) = path.parent() {
            create_dir_all(path_directory).map_err(|e| {
                error!("Nie można utworzyć katalogu: {}", e);
                e
            })?;
        }

        let mut file = File::create(file_path).map_err(|e| {
            error!("Nie można utworzyć pliku: {}", e);
            e
        })?;

        file.write_all(contents.as_bytes()).map_err(|e| {
            error!("Nie można zapisać pliku: {}", e);
            e
        })?;

        Ok(())
    }

    pub fn get_deafult_directory() -> String {
        return format!(
            "{}\\{}",
            Task::get_appdata_path(),
            Task::get_deafult_saving_path()
        );
    }

    pub fn get_default_save_file_patch() -> String {
        return Task::make_save_file_patch(
            Task::get_deafult_directory(),
            "atuoSaving.json".to_string(),
        );
    }

    pub fn read_auto_save_content(file_path: &str) -> serde_json::Result<Vec<Task>> {
        let mut file = File::open(file_path).unwrap();
        let mut content = String::new();
        file.read_to_string(&mut content).unwrap(); // skonczyłem jak obsłużyć bład wrócę tutaj potem
        let tasks: Vec<Task> = serde_json::from_str(&content)?;
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
        print!("{}", Task::get_default_save_file_patch());

        let task = Task {
            content: "cost tam tekst 19".to_string(),
        };

        let task2 = Task {
            content: "cost tam tekst 15".to_string(),
        };

        let tasks = vec![task, task2];

        let _ = Task::save_content(&Task::get_default_save_file_patch(), &tasks);
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
            Task::get_deafult_saving_path(),
            r"textPresenter\autoSavings"
        );
    }
}
