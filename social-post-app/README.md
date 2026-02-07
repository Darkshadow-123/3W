# Mini Social Post Application

A simple social media application built with React.js, Node.js, Express, and MongoDB. Users can create accounts, post text or images, view posts from others, like, and comment.

## Features

- User authentication (signup and login)
- Create posts with text and/or images
- View public feed of all posts
- Like posts
- Comment on posts
- Real-time updates for likes and comments
- Clean, modern UI with Material UI

## Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Axios for API calls
- React Router for navigation

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Project Structure

```
social-post-app/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   └── Post.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── posts.js
│   ├── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.js
    │   │   ├── Signup.js
    │   │   ├── Feed.js
    │   │   ├── Post.js
    │   │   ├── CreatePost.js
    │   │   └── Navbar.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── services/
    │   │   └── api.js
    │   └── App.js
    └── package.json
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd social-post-app/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following content:
```env
MONGODB_URI=mongodb://localhost:27017/social-post-app
JWT_SECRET=your-secret-key-change-this-in-production
PORT=5000
```

4. Start the backend server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd social-post-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

### Quick Start (Both Servers)

For Windows users, simply run:
```bash
cd social-post-app
start.bat
```

For Linux/Mac users:
```bash
cd social-post-app
chmod +x start.sh
./start.sh
```

This will start both the backend and frontend servers simultaneously.

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Click on "Sign up" to create a new account
3. Fill in your username, email, and password
4. After signing up, you'll be redirected to the feed
5. Create a post by entering text and/or an image URL
6. Like and comment on posts from other users
7. Logout when done

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login with email and password

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `POST /api/posts/:id/like` - Like or unlike a post
- `POST /api/posts/:id/comment` - Comment on a post

## Database Schema

### User
- username: String (unique)
- email: String (unique)
- password: String (hashed)
- createdAt: Date

### Post
- userId: ObjectId (reference to User)
- username: String
- text: String (optional)
- image: String (optional)
- likes: Array of Strings (usernames)
- comments: Array of objects {username, text, createdAt}
- createdAt: Date

## Notes

- Both text and image fields in posts are optional
- Only one of them is required to create a post
- Images are stored as URLs (not uploaded to server)
- JWT tokens expire after 24 hours
- MongoDB uses two collections: users and posts

## Future Enhancements

- Image upload functionality
- User profiles
- Follow/unfollow users
- Edit and delete posts
- Real-time notifications
- Infinite scroll for posts
- Search functionality
