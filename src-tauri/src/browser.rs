use log::error;
use std::process::Command;
use std::thread;
use std::time::Duration;
use sysinfo::System;

const FIREFOX_LOCATION: &str = "C:/Program Files/Mozilla Firefox/firefox.exe";

pub fn open_in_firefox(links: Vec<String>) {

    if !is_browser_running() {
        Command::new(FIREFOX_LOCATION)
            .spawn()
            .expect("Failed to start firefox");
        thread::sleep(Duration::from_secs(2));
    }

    links.iter().for_each(|link| {
        if let Err(e) = Command::new(FIREFOX_LOCATION)
            .arg(link)
            .spawn()
        {
            error!("Failed to open URL in Firefox: {}", e);
        }
    });
    thread::sleep(Duration::from_millis(500));
}

fn is_browser_running() -> bool {
    let mut system = System::new_all();
    system.refresh_all();

    system
        .processes()
        .iter()
        .any(|(_pid, process)| match process.exe() {
            Some(process_patch) => process_patch.to_string_lossy().contains("firefox"),
            None => false,
        })
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn is_browser_running_manula_test() {
        let a = is_browser_running();

        // open and close firefox to check
        println!("value : {}", a);
    }
}
