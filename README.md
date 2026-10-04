# DevTinder

DevTinder is a full-stack developer networking app inspired by swipe-based matchmaking, designed to help developers discover, connect, and collaborate with like-minded people.

Users can create a profile, browse other developers, send connection requests, review incoming requests, chat in real time, and unlock premium features.

## Features

- Developer signup and login
- Profile creation and profile editing
- Browse suggested developers in a feed
- Send, accept, reject, and manage connection requests
- Real-time chat between connected users
- Premium membership flow with Razorpay integration
- Responsive UI built with React + Vite
- Secure auth using JWT cookies and hashed passwords

## Tech Stack

### Frontend
- React 19
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Axios
- Socket.IO client

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Socket.IO
- Razorpay

## App Overview

DevTinder combines a social-first onboarding flow with developer-focused networking:

- A user signs up or logs in
- A developer profile is created with personal details and skills
- The feed shows other users with matching interests
- Users can send `interested` or `ignore` actions
- Requests can be accepted or rejected from the requests page
- Approved connections can use chat for communication
- Premium plans can be accessed through the premium section

## Project Structure

```text
DevTinder/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── helper/
│   │   │   ├── razorpay.js
│   │   │   ├── socket.js
│   │   │   └── validator.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── chat.js
│   │   │   ├── connectionRequest.js
│   │   │   ├── payment.js
│   │   │   └── user.js
│   │   └── routers/
│   │       ├── authRouter.js
│   │       ├── chatRouter.js
│   │       ├── paymentRouter.js
│   │       ├── profileRouter.js
│   │       ├── requestRouter.js
│   │       └── userRouter.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Body.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Connections.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Premium.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Requests.jsx
│   │   │   ├── UserCard.jsx
│   │   │   └── ...
│   │   ├── utils/
│   │   │   ├── __redux_store__/
│   │   │   ├── constants.js
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── screenshots/
│   ├── auth/
│   ├── feed/
│   ├── profile/
│   ├── connections/
│   ├── chat/
│   └── requests/
├── .gitignore
├── README.md
└── .github/
```

## Screenshots

Use the folders below to store project screenshots as the app evolves:

```text
screenshots/
├── auth/          # login/signup screens
├── feed/          # developer discovery feed
├── profile/       # user profile and edit profile
├── connections/   # accepted / connected profiles
├── chat/          # messaging interface
├── requests/      # incoming and outgoing requests
└── premium/       # pricing / membership screens
```

Add screenshots here in the format:

```text
screenshots/
├── auth/login.png
├── auth/signup.png
├── feed/feed.png
├── profile/edit-profile.png
├── chat/messages.png
├── requests/incoming-requests.png
└── premium/plans.png
```

## Prerequisites

Before running the project, make sure you have:

- Node.js 18+
- npm or yarn
- MongoDB running locally or a MongoDB Atlas connection string
- A Razorpay account for payment testing if using premium features

## Environment Variables

Create a `.env` file inside the `backend` folder with the following variables:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/devtinder
JWT_SECRET=your_super_secret_key
FRONTEND_DEV_URL=http://localhost:5173
FRONTEND_URL=http://localhost:3000
RAZ_TEST_API_KEY=your_razorpay_key
RAZ_TEST_SEC_KEY=your_razorpay_secret
WEBHOOK_SECRET=your_webhook_secret
```

Note: if you are using MongoDB Atlas, set `MONGODB_URI` to your Atlas connection string instead of the local MongoDB URL.

## Getting Started

### 1) Clone the repository

```bash
git clone https://github.com/oonnkar/DevTinder.git
cd DevTinder
```

### 2) Install backend dependencies

```bash
cd backend
npm install
```

### 3) Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4) Start the backend

```bash
cd ../backend
npm run dev
```

### 5) Start the frontend

```bash
cd ../frontend
npm run dev
```

The frontend will usually run on:

- http://localhost:5173

The backend will run on:

- http://localhost:3000

## Backend API Highlights

Some of the main API routes include:

- `POST /auth/signup` — register a new user
- `POST /auth/login` — login and create a JWT cookie
- `POST /auth/logout` — logout and clear cookie
- `GET /profile/view` — fetch authenticated user profile
- `PATCH /profile/edit` — update profile details
- `PATCH /profile/edit/password` — change password
- `POST /request/send/:status/:toUserId` — send a connection request
- `POST /request/review/:status/:requestId` — accept or reject a request
- `GET /chat/:id` — fetch or create a chat between users

## Contributor Notes

This app is a learning project and a strong example of a modern full-stack product workflow that combines:

- real authentication flow
- secure session handling
- full CRUD-style user profile updates
- request-based social networking
- real-time messaging
- AI/ML-inspired matching product design patterns

## License

This project is currently for educational and demo purposes.

## Future Improvements

- add more robust filtering and recommendation logic
- add dedicated admin dashboard
- improve chat UX with message sending and real-time updates
- add notifications and push updates
- add profile media upload support
- improve validation and error handling across the app

## Contributing

Pull requests are welcome. For major changes, please open an issue first so the design and implementation can be discussed.
