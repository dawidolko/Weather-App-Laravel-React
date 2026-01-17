# Weather-App-Laravel-React

> 🚀 **Real-Time Weather Application** - Build modern weather platforms with Laravel backend, React frontend, and automated data updates

## 📋 Description

Welcome to the **Weather App** repository! This full-stack application retrieves real-time weather data from the OpenWeatherMap API for 10 selected Polish cities, automatically updates every 30 minutes, and stores historical data in a local database. Built with a powerful Laravel backend and dynamic React frontend, this project demonstrates modern web development practices for data-driven applications.

This repository showcases best practices in RESTful API design, scheduled task automation, React component architecture, and efficient data persistence. Perfect for learning full-stack development with Laravel and React integration.

## 📁 Repository Structure

```

Weather-App-Laravel-React/
├── 📁 backend/ # Laravel backend application
│ ├── 📁 app/
│ │ ├── 🎮 Http/
│ │ │ └── Controllers/ # API controllers
│ │ ├── 📦 Models/ # Eloquent models
│ │ └── 🔧 Console/
│ │ └── Commands/ # Scheduled commands
│ ├── 📁 config/ # Configuration files
│ ├── 📁 database/
│ │ ├── 🌱 seeders/ # Database seeders
│ │ └── 🔄 migrations/ # Database migrations
│ ├── 📁 routes/
│ │ ├── 🌐 web.php # Web routes
│ │ ├── 🔌 api.php # API endpoints
│ │ ├── 📡 channels.php # Broadcasting channels
│ │ └── ⚙️ console.php # Console commands
│ ├── 📁 public/ # Public assets
│ ├── 📁 resources/ # Views and assets
│ ├── 📁 storage/ # Application storage
│ ├── 📁 tests/ # Unit and feature tests
│ ├── ⚙️ .env.example # Environment template
│ ├── 🎯 artisan # Laravel CLI
│ ├── 📦 composer.json # PHP dependencies
│ └── 🔧 webpack.mix.js # Asset compilation
├── 📁 frontend/ # React frontend application
│ ├── 📁 public/
│ │ ├── 📄 index.html # Main HTML file
│ │ └── 🎨 favicon.ico # App favicon
│ ├── 📁 src/
│ │ ├── ⚛️ components/ # React components
│ │ ├── 📄 pages/ # Page components
│ │ ├── 🎨 App.css # Application styles
│ │ ├── 💻 App.js # Main React component
│ │ ├── 📐 index.css # Global styles
│ │ └── 🚀 index.js # React entry point
│ ├── 📦 package.json # Node.js dependencies
│ └── 🔒 package-lock.json # Dependency lock file
├── 📁 docs/ # Project documentation
├── 📁 database/ # Database diagrams and files
├── 🔧 start.sh # Linux/macOS startup script
├── 🔧 start.bat # Windows startup script
└── 📖 README.md # Project documentation

```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/dawidolko/Weather-App-Laravel-React.git
cd Weather-App-Laravel-React
```

### 2. Backend Setup (Laravel)

#### Linux/macOS:

```bash
cd backend
bash ../start.sh
```

#### Windows:

```bash
cd backend
start.bat
```

#### Manual Setup:

```bash
# Install PHP dependencies
composer install

# Create environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure database in .env file
# Add OpenWeatherMap API key to .env

# Run database migrations
php artisan migrate

# (Optional) Seed database
php artisan db:seed
```

### 3. Frontend Setup (React)

#### Linux/macOS:

```bash
cd frontend
bash ../start.sh
```

#### Windows:

```bash
cd frontend
start.bat
```

#### Manual Setup:

```bash
# Install Node.js dependencies
npm install
```

### 4. Start the Application

#### Start Laravel Backend:

```bash
cd backend
php artisan serve
```

- Backend API runs at [http://localhost:8000](http://localhost:8000)

#### Start React Frontend:

```bash
cd frontend
npm start
```

- Frontend application runs at [http://localhost:3000](http://localhost:3000)

## ⚙️ System Requirements

### **Essential Tools:**

- **PHP** (version 8.0 or higher)
- **Composer** for PHP dependency management
- **Node.js** (version 14.0 or higher)
- **npm** or **yarn** for JavaScript packages
- **MySQL** or compatible database system
- **Git** for version control

### **Development Environment:**

- **Laravel** (latest version)
- **React** (latest version)
- **Code Editor** (VS Code, PhpStorm, WebStorm)
- **API Testing Tool** (Postman, Insomnia)

### **External Services:**

- **OpenWeatherMap API Key** (free registration at [openweathermap.org](https://openweathermap.org/api))
- Valid API credentials configured in `.env` file

### **Recommended Extensions:**

- **Laravel** and **PHP** IntelliSense
- **React Developer Tools** browser extension
- **ESLint** for JavaScript code quality
- **Prettier** for code formatting
- **Thunder Client** or **REST Client** for API testing

### **Laravel Ecosystem:**

- **Eloquent ORM** for database operations
- **Task Scheduler** for automated weather updates
- **Laravel Mix** for asset compilation
- **Guzzle HTTP Client** for API requests

## ✨ Key Features

### **🌤️ Real-Time Weather Data**

- Fetches current weather conditions for 10 Polish cities
- Temperature, humidity, wind speed, and atmospheric pressure
- Weather descriptions and icon representations
- Accurate and up-to-date meteorological information

### **⏰ Automated Updates**

- Scheduled data refresh every 30 minutes
- Laravel Task Scheduler for background job execution
- Automatic API calls without manual intervention
- Efficient cron-based automation

### **💾 Data Persistence**

- Historical weather data storage in MySQL database
- Archival records for trend analysis
- Query optimization for fast data retrieval
- Efficient database schema design

### **🔌 RESTful API**

- Clean API endpoints for weather data access
- JSON response format for easy consumption
- Proper HTTP status codes and error handling
- CORS configuration for frontend integration

### **⚛️ Dynamic React Frontend**

- Modern component-based architecture
- Real-time data rendering without page refreshes
- Responsive design for all device sizes
- Interactive weather visualization

### **🎨 User Interface**

- Clean and intuitive weather display
- City-based weather cards or lists
- Visual weather icons and indicators
- Mobile-friendly responsive layout

## 🛠️ Technologies Used

- **Laravel** - Robust PHP framework for backend
- **React** - Modern JavaScript library for UI
- **MySQL** - Reliable relational database
- **OpenWeatherMap API** - Weather data provider
- **Eloquent ORM** - Database abstraction layer
- **Axios** - HTTP client for API requests
- **Laravel Task Scheduler** - Automated job execution
- **Composer** - PHP dependency management
- **NPM** - Node.js package management
- **Webpack Mix** - Asset compilation and bundling

## 🌍 API Configuration

### **1. OpenWeatherMap API Key**

Sign up at [openweathermap.org](https://openweathermap.org/api) to obtain a free API key.

Add your API key to the `.env` file:

```env
OPENWEATHER_API_KEY=your_api_key_here
```

### **2. City Configuration**

The application targets 10 major Polish cities by default. You can modify city IDs in the configuration or database table.

Refer to the [OpenWeatherMap city list](http://bulk.openweathermap.org/sample/city.list.json.gz) for valid city IDs.

### **3. Update Frequency**

Weather data updates automatically every 30 minutes via Laravel's task scheduler. To modify the frequency, edit the scheduled task in `app/Console/Kernel.php`.

## 📊 Project Status

✅ **Completed** - Fully functional weather application with automated updates!

## 🤝 Contributing

Contributions are highly welcomed! Here's how you can help:

- 🐛 **Report bugs** - Found an issue? Let us know!
- 💡 **Suggest improvements** - Have ideas for better features?
- 🔧 **Submit pull requests** - Share your enhancements and solutions
- 📖 **Improve documentation** - Help make the project clearer

Feel free to open issues or reach out through GitHub for any questions or suggestions.

## 👨‍💻 Author

Created by **Dawid Olko** - Part of the full-stack web development series.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Found this helpful?** Give it a star and share with fellow full-stack developers!
