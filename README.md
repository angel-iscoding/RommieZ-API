# 🏠 RommieZ API

A comprehensive RESTful API for student accommodation management, connecting students with landlords for room rentals.

## 🚀 Quick Start

### Option 1: Development with JSON Server (Mock Data)

1. **Install dependencies:**
	```bash
	npm install
	```

2. **Start JSON server with mock data:**
	```bash
	npm run start-json
	```

3. **Access the API:** [http://localhost:3099](http://localhost:3099)

### Option 2: Full Development with MySQL Database

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start with Docker (recommended):**
   ```bash
   docker-compose up --build
   ```

3. **Access the API:** [http://localhost:3010/api/V1](http://localhost:3010/api/V1)

### Option 3: Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=3010
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_DATABASE=RoomieZ
   DB_PORT=3306
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 📋 API Documentation

### Base URL
- **Development:** `http://localhost:3010/api/V1`
- **Production:** `https://your-domain.com/api/V1`

### 👥 User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users` | Get all users |
| `GET` | `/users/:id` | Get user by ID |
| `GET` | `/users/:id/exists` | Check if user exists |
| `GET` | `/users/:id/contacts` | Get user social contacts |
| `POST` | `/users` | Create new user |
| `POST` | `/users/check-email` | Check if email is registered |
| `POST` | `/users/:id/contacts` | Create/update user contacts |
| `PUT` | `/users/:id` | Update user information |
| `DELETE` | `/users/:id` | Delete user |

### 🏡 Room Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/roomz` | Get all rooms |
| `GET` | `/roomz/type/:type` | Get rooms by type |
| `GET` | `/roomz/:id` | Get room by ID |
| `POST` | `/roomz` | Create new room |
| `PUT` | `/roomz/:id` | Update room information |
| `DELETE` | `/roomz/:id` | Delete room |

### Valid Room Types
- `studio` - Studio apartment
- `apartment` - Regular apartment
- `residential_complex` - Residential complex

### Valid User Roles
- `student` - Student looking for accommodation
- `landlord` - Property owner offering rooms

## 🗄️ Database Schema

The API uses MySQL with the following main tables:

- **users** - User information (students and landlords)
- **roomz** - Room listings and details
- **bookings** - Reservation management
- **transactions** - Payment tracking
- **contact** - User social media and contact information

## 🧪 Testing with Postman

A complete Postman collection is available in the `Utils/` folder:

1. **Import the collection:**
   - Open Postman
   - Go to File → Import
   - Select `Utils/RommieZ-API-Postman-Collection.json`

2. **Configure environment:**
   - Set `base_url` to `http://localhost:3010/api/V1`

3. **Test the endpoints:**
   - All endpoints include example requests and responses
   - Validation tests are included

## 📁 Project Structure

```
RommieZ-API/
├── src/
│   ├── config/           # Database and environment configuration
│   ├── controller/       # Request handlers
│   ├── database/         # Database scripts and mock data
│   ├── router/           # Route definitions
│   ├── service/          # Business logic layer
│   └── server.js         # Express server setup
├── Utils/                # Postman collection and utilities
├── docker-compose.yml    # Docker configuration
├── Dockerfile           # Docker image definition
└── index.js             # Application entry point
```

## 🔧 Development Scripts

```bash
# Start development server with nodemon
npm run dev

# Start production server
npm start

# Start JSON server (mock data)
npm run start-json
```

## 🐳 Docker Support

The project includes full Docker support:

```bash
# Build and start all services
docker-compose up --build

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Reset database (remove volumes)
docker-compose down -v
```

## 🔒 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3010` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_USER` | MySQL username | - |
| `DB_PASSWORD` | MySQL password | - |
| `DB_DATABASE` | Database name | `RoomieZ` |
| `DB_PORT` | MySQL port | `3306` |

## 📄 Example Requests

### Create a new user
```bash
POST /api/V1/users
Content-Type: application/json

{
  "first_name": "John",
  "middle_name": "Michael",
  "last_name": "Doe",
  "username": "johndoe",
  "email": "john.doe@email.com",
  "password": "securepassword123",
  "city": "Barranquilla",
  "birthdate": "1998-05-15",
  "role": "student"
}
```

### Create a new room listing
```bash
POST /api/V1/roomz
Content-Type: application/json

{
  "user_id": 2,
  "title": "Cozy Studio Near University",
  "subtitle": "Perfect for students",
  "details": "WiFi, utilities included",
  "description": "A comfortable studio apartment perfect for students, located near the university campus.",
  "address": "123 University Ave, Barranquilla",
  "price": 350.00,
  "roomz_type": "studio",
  "is_available": true
}
```

## 🚦 Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "message": "Operation completed successfully",
  "data": { /* response data */ }
}
```

### Error Response
```json
{
  "error": "Error description",
  "details": "Detailed error message"
}
```

## 🛠️ Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **Docker** - Containerization
- **mysql2** - MySQL driver for Node.js
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📝 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For questions or support, please contact the development team or create an issue in the repository.

---

**Happy coding! 🎉**