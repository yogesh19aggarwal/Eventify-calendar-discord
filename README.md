# Eventify Calendar Discord

A modern calendar application integrated with Discord that helps users manage and schedule events efficiently.

## 🌟 Features

- Discord integration for event management
- Interactive calendar interface
- Event creation and management
- Real-time notifications
- User authentication and authorization
- Responsive design for all devices

## 🛠️ Tech Stack

### Frontend

- React.js with Vite
- Modern JavaScript (ES6+)
- CSS for styling
- Responsive design principles

### Backend

- Node.js
- Express.js
- MongoDB (Database)
- Discord API integration

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB
- Discord Developer Account
- Google Developer Account

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/Eventify-calendar-discord.git
cd Eventify-calendar-discord
```

2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

3. Backend Setup

```bash
cd backend
npm install
```

4. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
# Server Configuration
PORT=3000

# Discord Configuration
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CHANNEL_ID=your_discord_channel_id

# Google OAuth Configuration
CLIENT_ID=your_google_client_id
PROJECT_ID=your_google_project_id
AUTH_URI=https://accounts.google.com/o/oauth2/auth
TOKEN_URI=https://oauth2.googleapis.com/token
AUTH_PROVIDER=https://www.googleapis.com/oauth2/v1/certs
CLIENT_SECRET=your_google_client_secret
REDIRECT_URIS=your_redirect_uri
JAVASCRIPT_ORIGINS=your_allowed_origins

# Database Configuration
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host

# JWT Configuration
JWT_SECRET=your_jwt_secret
```

5. Start the Backend Server

```bash
npm start
```

## 📝 API Documentation

The backend provides the following main endpoints:

- `POST /api/auth/login` - User authentication
- `GET /api/events` - Fetch all events
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

## 🔒 Security

- JWT authentication
- Environment variables for sensitive data
- Input validation and sanitization
- Rate limiting
- CORS configuration

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👥 Authors

- Yogesh Aggarwal - Initial work

## 🙏 Acknowledgments

- Discord API Documentation
- MongoDB Documentation
- React.js Community
- All contributors who helped with the project
