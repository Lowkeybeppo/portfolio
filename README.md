# Portfolio - MERN Stack Wordle Game

A full-stack MERN application featuring a portfolio site with an integrated Wordle-type game, user authentication, and admin panel.

## Features

- 🎮 **Wordle Game** - Interactive word guessing game
- 👤 **User Authentication** - Register and login (no email verification required)
- 📊 **User Stats** - Track game performance and statistics
- 🔐 **Admin Panel** - CRUD operations on users and game data
- 🗑️ **Account Deletion** - Users can delete their own accounts
- 🏆 **Leaderboard** - Global player rankings

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM library
- **JWT** - Authentication
- **Bcrypt** - Password hashing

## Project Structure

```
portfolio/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Game/      # Wordle game component
│   │   │   ├── Auth/      # Login/Register components
│   │   │   └── Admin/     # Admin panel component
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── contexts/      # React context for auth
│   │   ├── utils/         # API client, helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Node/Express backend
│   ├── models/            # MongoDB schemas
│   │   ├── User.js
│   │   └── GameScore.js
│   ├── routes/
│   │   ├── auth.js        # Auth endpoints
│   │   ├── game.js        # Game endpoints
│   │   └── admin.js       # Admin endpoints
│   ├── middleware/
│   │   └── auth.js        # JWT verification
│   ├── controllers/       # Business logic
│   ├── database/
│   │   └── connection.js
│   ├── .env.example
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   - Update `.env` file with your MongoDB URI and JWT secrets

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Client will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/admin-login` - Admin login
- `DELETE /api/auth/delete-account` - Delete user account
- `GET /api/auth/me` - Get current user info

### Game
- `POST /api/game/submit` - Submit game result
- `GET /api/game/stats` - Get user stats
- `GET /api/game/leaderboard` - Get global leaderboard

### Admin
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/stats` - Get system stats
- `GET /api/admin/game-scores` - Get all game scores

## Environment Variables

### Server (.env)
```
MONGODB_URI=mongodb://localhost:27017/portfolio
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
ADMIN_SECRET=your_admin_secret_key_here
NODE_ENV=development
```

## Next Steps

- [ ] Implement authentication logic
- [ ] Build Wordle game mechanics
- [ ] Create user profile page
- [ ] Implement admin dashboard
- [ ] Add game leaderboard
- [ ] Deploy to production

## License

ISC
