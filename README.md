# Customer & Invoice Management System

A comprehensive full-stack web application for managing customers and invoices, built with Laravel and React. This project demonstrates modern web development practices, RESTful API design, and seamless frontend-backend integration.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-11-red.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![PHP](https://img.shields.io/badge/PHP-8.2-purple.svg)

## 🚀 Features

### Core Functionality
- **Customer Management**: Create, read, update, and delete customer records
- **Invoice Management**: Comprehensive invoice handling with status tracking
- **User Authentication**: Secure registration and login system
- **Dashboard Analytics**: Real-time statistics and data visualization
- **Advanced Filtering**: Search and filter customers/invoices by multiple criteria
- **Pagination**: Efficient data loading with paginated results
- **Bulk Operations**: Handle multiple records simultaneously

### Technical Features
- RESTful API with Laravel 11
- Token-based authentication using Laravel Sanctum
- Responsive React SPA with modern UI/UX
- Database relationships and data integrity
- Form validation and error handling
- Real-time data updates

## 🛠️ Tech Stack

### Backend
- **Framework**: Laravel 11
- **Language**: PHP 8.2+
- **Database**: MySQL
- **Authentication**: Laravel Sanctum
- **API**: RESTful with resource transformations

### Frontend
- **Framework**: React 18
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: Fetch API

### Development Tools
- **Version Control**: Git
- **Package Managers**: Composer (PHP), npm (JavaScript)
- **Database Migrations**: Laravel Migrations
- **Seeding**: Laravel Factories & Seeders

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- PHP 8.2 or higher
- Composer
- Node.js 16+ and npm
- MySQL 8.0+
- Git

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/customer-invoice-management.git
cd customer-invoice-management
```

### 2. Backend Setup (Laravel)

```bash
# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate

# Configure your database in .env file
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 3. Database Setup

```bash
# Run migrations
php artisan migrate

# Seed the database (optional)
php artisan db:seed
```

### 4. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd transport-web-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Start Laravel Development Server

```bash
# In the root directory
php artisan serve
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | User registration |
| POST | `/api/login` | User login |
| POST | `/api/logout` | User logout |

### Customer Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/customers` | Get all customers |
| POST | `/api/v1/customers` | Create new customer |
| GET | `/api/v1/customers/{id}` | Get specific customer |
| PUT | `/api/v1/customers/{id}` | Update customer |
| DELETE | `/api/v1/customers/{id}` | Delete customer |

### Invoice Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/invoices` | Get all invoices |
| POST | `/api/v1/invoices` | Create new invoice |
| GET | `/api/v1/invoices/{id}` | Get specific invoice |
| PUT | `/api/v1/invoices/{id}` | Update invoice |
| DELETE | `/api/v1/invoices/{id}` | Delete invoice |
| POST | `/api/v1/invoices/bulk` | Bulk create invoices |

### Filtering Examples

```bash
# Filter customers by name
GET /api/v1/customers?name[eq]=John

# Filter invoices by amount range
GET /api/v1/invoices?amount[gte]=1000&amount[lte]=5000

# Filter by status
GET /api/v1/invoices?status[eq]=P

# Include relationships
GET /api/v1/customers/1?includeInvoices=true
```

## 🏗️ Project Structure

```
├── app/
│   ├── Filters/           # API filtering logic
│   ├── Http/
│   │   ├── Controllers/   # API controllers
│   │   ├── Requests/      # Form request validation
│   │   └── Resources/     # API resource transformations
│   ├── Models/            # Eloquent models
│   └── Policies/          # Authorization policies
├── database/
│   ├── factories/         # Model factories
│   ├── migrations/        # Database migrations
│   └── seeders/           # Database seeders
├── routes/
│   ├── api.php           # API routes
│   └── web.php           # Web routes
└── transport-web-react/
    ├── src/
    │   ├── Components/    # Reusable components
    │   ├── Context/       # React context
    │   ├── Pages/         # Page components
    │   └── App.jsx        # Main application
    └── public/            # Static assets
```

## 💡 Usage

### Customer Management
1. **Create Customer**: Navigate to `/create` and fill in customer details
2. **View Customers**: Access `/customers` for a paginated list
3. **Customer Details**: Click on any customer to view detailed information
4. **Update Customer**: Use the edit button on customer detail pages
5. **Delete Customer**: Remove customers with proper authorization

### Invoice Management
1. **Create Invoice**: Use `/createInvoice` to generate new invoices
2. **View Invoices**: Browse all invoices at `/invoices`
3. **Invoice Details**: Click on invoices for comprehensive information
4. **Bulk Operations**: Import multiple invoices simultaneously
5. **Status Tracking**: Monitor payment status and billing information

### Dashboard
- View real-time statistics
- Quick access to customer and invoice counts
- Navigate to creation forms
- Overview of system data

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

```env
APP_NAME="Customer Invoice Management"
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password

SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

## 🧪 Testing

```bash
# Run PHP tests
php artisan test

# Run with coverage
php artisan test --coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 Academic Context

This project was developed as part of the Web Application Development module in Semester 2 of the IT and Management degree program at the Faculty of IT, University of Moratuwa.

## 👨‍💻 Author

**Geeneth Punchihewa**
- GitHub: [@MazterGD](https://github.com/MazterGD)
- LinkedIn: [Geeneth Punchihewa](https://linkedin.com/in/geeneth-punchihewa)

## 🙏 Acknowledgments

- University of Moratuwa Faculty of IT
- Laravel Documentation and Community
- React Documentation and Community
- All open-source libraries and tools used in this project
