# Attend Hub

[AttendHub](https://sanskaroh.github.io/AttendHub/) is an attendance management system designed to simplify and streamline the process of tracking attendance for educational institutions and organizations. It offers an intuitive interface for easy navigation and efficient attendance recording.

## Installation:
1. **Clone this repository:**
    ```sh
    git clone https://github.com/yourusername/AttendHub.git
    ```
2. **Open your browser and navigate to the Extensions tab.**
3. **Enable Developer Mode:**
    - In Chrome, toggle the switch in the top right corner to enable Developer mode.
4. **Load the Unpacked Extension:**
    - Click the "Load unpacked" button.
    - Select the cloned folder and then select the `extensions` folder.
5. The extension is now ready to use from the extensions menu.

## Google Service Account Setup:
1. **Create a Google Cloud Project:**
    - Go to the [Google Cloud Console](https://console.cloud.google.com/).
    - Create a new project or select an existing one.
2. **Enable the Google Sheets API:**
    - Navigate to "APIs & Services" > "Library".
    - Search for "Google Sheets API" and enable it.
3. **Create a Service Account:**
    - Go to "APIs & Services" > "Credentials".
    - Click "Create Credentials" and select "Service Account".
    - Follow the prompts to create a new service account.
4. **Create a JSON Key:**
    - After creating the service account, go to "Keys" and click "Add Key" > "Create new key".
    - Select "JSON" and click "Create". This will download a JSON file containing your service account credentials.
    - Rename that file to keys.json.
5. **Share Your Google Sheet with the Service Account:**
    - Open your Google Sheet.
    - Click "Share" and share the sheet with the service account email (ending in `@your-project-id.iam.gserviceaccount.com`).

## Configuration:
1. **Add the Google Sheets API Key:**
    - Open the `config` folder in the `extensions` folder.
    - Add the keys.json file in that folder.

2. **Set the Spreadsheet ID:**
    - Open the `config` folder in the `extensions` folder.
    - In that open `.env` file
    - Add your Google Spreadsheet ID.
    - ```https://docs.google.com/spreadsheets/d/1fkByy5z6NnHKAkhLisifXlh-gdmy4SsbirqpzGRR/edit?gid=0#gid=0``` here it is after d/ to /edit that is ```1fkByy5z6NnHKAkhLisifXlh-gdmy4SsbirqpzGRR```
## Starting the Backend Server:
1. **Navigate to the `server` folder:**
    ```sh
    cd server
    ```
2. **Install the dependencies:**
    ```sh
    npm install
    ```
3. **Start the server:**
    ```sh
    npm start
    ```
    The server should now be running and ready to handle requests from the extension.

## Usage:
1. **Join the Google Meet:**
    - Join a Google Meet session.
2. **Press the Start Tracking  Button:**
    - Click the "Start Tracking" button provided by the AttendHub extension.
    - As soon as you end or leave the meet the list of participants will be logged to your configured Google Sheets , as well as downloaded as a .csv file.

