# Weather App (Laravel + React)

This project is a simple weather application that retrieves data from the [OpenWeatherMap API](https://openweathermap.org/api) for **10 selected Polish cities**, updates every **30 minutes**, and stores the results in a local database. The backend is built with **Laravel**, while the frontend uses **React**.

---

## Project structure

- **backend/** – Laravel application (backend server).
- **frontend/** – React application (user interface).
- **docs/** – Project documentation.
- **database/** – Files and diagrams related to the database.

```
project
├── README.md
├── docs
├── database
├── backend
│   ├── app
│   ├── bootstrap
│   ├── config
│   ├── database
│   ├── public
│   ├── resources
│   ├── routes
│   │   ├── api.php
│   │   ├── channels.php
│   │   ├── console.php
│   │   └── web.php
│   ├── storage
│   ├── tests
│   ├── vendor
│   ├── .env
│   ├── artisan
│   ├── composer.json
│   ├── composer.lock
│   └── webpack.mix.js
├── frontend
│   ├── public
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules
```

---

## Features

- **Real-time Weather**: Fetches current weather data for each selected city.
- **Scheduled Updates**: Automatically updates data every 30 minutes.
- **Data Storage**: Saves fetched weather information for archival or later use.
- **RESTful API**: Exposes endpoints (Laravel) that the React frontend consumes.

---

## Requirements

- **PHP >= 8.x** (with Composer)
- **Node.js >= 14.x** (with npm or yarn)
- **MySQL** or another supported database for Laravel
- **OpenWeatherMap API Key** (free at [openweathermap.org](https://openweathermap.org/api))

---

## Installation

1. **Clone the repository**:

   ```bash
   git clone [https://gitlab.ideo.pl/d.olko/weather-app-laravel-react.git](https://github.com/dawidolko/Weather-App-Laravel-React)
   cd weather-app-laravel-react
   ```

2. **Backend (Laravel) setup**:

   - Install dependencies (LINUX/MACOS):
     ```bash
     bash start.sh
     ```

   - Install dependencies (WINDOWS):
     ```bash
     start.bat
     ```

3. **Frontend (React) setup**:

   - Go to the React app folder (LINIX/MACOS):
     ```bash
     bash start.sh
     ```

    - Go to the React app folder (WINDOWS):
     ```bash
     start.bat
     ```

4. **Run the application**:
   - Start the Laravel server:
     ```bash
     php artisan serve
     ```

     - Start the React server:
     ```bash
     npm start
     ```
---

## Usage

- The app will fetch weather data every 30 minutes for the chosen Polish cities (configured in the code or via database).
- You can view current conditions, such as temperature, wind speed, humidity, etc., and see updated info without manual refreshes (thanks to React’s re-rendering).

---

## Configuration

1. **OpenWeatherMap API Key**
   - Sign up at [openweathermap.org](https://openweathermap.org/api) to get a free API key.
   - Insert your key into the `.env` file (for Laravel) and any frontend config if required.
2. **City IDs**
   - By default, the app targets 10 major Polish cities. You can modify these in the code or in a dedicated config/database table.
   - Refer to the [OpenWeatherMap city list](http://bulk.openweathermap.org/sample/city.list.json.gz) for valid IDs.

---

## Author

Created by **Dawid Olko** as part of a practice project.  
Feel free to reach out for any questions or feedback.

---

## Project Status

**In Development** – Finished project!
