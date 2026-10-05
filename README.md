# MeetNewDevs

MeetNewDevs is a full-stack developer networking app inspired by swipe-based matchmaking, designed to help developers discover, connect, and collaborate with like-minded people.

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

MeetNewDevs combines a social-first onboarding flow with developer-focused networking:

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
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Body.jsx
│   │   │   ├── BrandLogo.jsx
│   │   │   ├── Chat.jsx
│   │   │   ├── Connections.jsx
│   │   │   ├── EditProfile.jsx
│   │   │   ├── Feed.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Premium.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Requests.jsx
│   │   │   └── UserCard.jsx
│   │   ├── utils/
│   │   │   ├── __redux_store__/
│   │   │   │   ├── appStore.js
│   │   │   │   ├── connectionsSlice.js
│   │   │   │   ├── feedSlice.js
│   │   │   │   └── userSlice.js
│   │   │   ├── constants.js
│   │   │   └── socket.js
│   │   ├── App.jsx
│   │   ├── index.css
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
│   ├── requests/
│   ├── chat/
│   └── premium/
├── .gitignore
├── README.md
└── .github/
```

### Frontend component responsibilities

- `App.jsx` declares the route tree and provides the Redux store.
- `Body.jsx` is the shared authenticated layout: it renders the navigation, loads the signed-in profile, and hosts nested pages.
- `Navbar.jsx` provides the app navigation, account menu, and logout action; `BrandLogo.jsx` is the shared wordmark and icon.
- `Login.jsx` handles both login and signup views.
- `Feed.jsx` loads the discovery feed and renders the first available `UserCard`; `UserCard.jsx` renders a profile and sends ignore/interested actions.
- `Profile.jsx` hosts `EditProfile.jsx`, which edits the current user's profile.
- `Connections.jsx` lists accepted connections and links to their chats.
- `Requests.jsx` lists incoming connection requests and handles accept/reject actions.
- `Chat.jsx` loads chat history and sends/receives live messages through Socket.IO.
- `Premium.jsx` displays membership plans and starts the Razorpay checkout flow.

### State management

The Redux Toolkit store is created in `frontend/src/utils/__redux_store__/appStore.js` and provided to the app in `App.jsx`. Its top-level state is:

| State key | Slice | Contents |
| --- | --- | --- |
| `user` | `userSlice.js` | Signed-in user profile, or `null`. |
| `feed` | `feedSlice.js` | Feed user array, or `null` before it has been loaded. |
| `connection` | `connectionsSlice.js` | `{ connections, requests }`; both collections start as `null` until loaded. Logout resets the slice. |

Components read shared state with `useSelector` and update it with `useDispatch`. The user, feed, and connection slices own their respective add/remove/reset actions. API data is fetched with Axios using the shared `BACKEND_API` constant, and Socket.IO is used for live chat events. Short-lived UI state—such as form values, drag position, and chat input/messages—is held locally with React state hooks.

## Screenshots

```text
screenshots/
├── auth/
│   ├── login.png
│   └── signup.png
├── feed/
│   └── feed.png
├── profile/
│   └── edit-profile.png
├── connections/
│   └── connections.png
├── requests/
│   └── requests.png
├── chat/
│   └── messages.png
└── premium/
    └── plans.png
```

| Page / state | Route | Screenshot | Main components |
| --- | --- | --- | --- |
| Login | `/login` | `screenshots/auth/login.png` | `Login.jsx` |
| Signup | `/login` (select **Create an account**) | `screenshots/auth/signup.png` | `Login.jsx` |
| Developer feed | `/feed` | `screenshots/feed/feed.png` | `Feed.jsx`, `UserCard.jsx` |
| Profile editing | `/profile` | `screenshots/profile/edit-profile.png` | `Profile.jsx`, `EditProfile.jsx` |
| Connections | `/connections` | `screenshots/connections/connections.png` | `Connections.jsx` |
| Connection requests | `/requests` | `screenshots/requests/requests.png` | `Requests.jsx` |
| Chat | `/chat/:id` | `screenshots/chat/messages.png` | `Chat.jsx` |
| Premium plans | `/premium` | `screenshots/premium/plans.png` | `Premium.jsx` |

The screenshot folders currently contain only `.gitkeep` placeholders, so page images are not checked in yet. Add each capture at the path listed above to populate this gallery.

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
