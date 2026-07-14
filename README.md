# 🎓 GVCC Learning Portal

A full-stack Learning Management Portal that allows users to securely access educational videos, resume learning progress, and manage bookmarks for important timestamps.

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Learning Dashboard
- Displays available courses
- Course thumbnails and descriptions
- Responsive card layout

### Video Learning
- Embedded YouTube Player
- Current playback time
- Resume watching from last position
- Progress saved automatically

### Bookmark Management
- Add bookmark at current timestamp
- Optional bookmark name
- Jump to bookmarked timestamp
- Delete bookmarks

### Content Protection
- Right-click disabled
- Watermark overlay on video player
- Blur video when tab becomes inactive
- Print Screen warning message

### Responsive UI
- Built using Tailwind CSS
- Mobile-friendly layout

---

# 🛠 Tech Stack

## Frontend
- React.js
- React Router DOM
- Tailwind CSS
- Axios
- React YouTube

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---

# 📂 Project Structure

```
gvcc-learning-portal/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/pranav-ukey/gvcc-learning-portal.git
```

## Backend

```bash
cd backend
npm install
npm run dev
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

MONGO_URL=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY
```

---

# 📸 Application Workflow

1. Register/Login
2. View available learning videos
3. Select a course
4. Watch video
5. Add bookmarks
6. Resume learning from previous position
7. Delete bookmarks if required
8. Logout

---

# 🔒 Security Measures

- JWT Authentication
- Protected API Routes
- Disabled Right Click
- Video Watermark
- Blur on Tab Switch
- Print Screen Warning

> **Note:** Complete prevention of screenshots or screen recording is not possible in standard web browsers. The application implements practical deterrents to help protect educational content.

---

# 👨‍💻 Author

**Pranav Ukey**

GitHub:
https://github.com/pranav-ukey

---

# ⭐ Future Enhancements

- Course Categories
- Search Courses
- Admin Panel
- Quiz Module
- Course Completion Tracking
- Certificates
- User Profile Management

---

## 📜 License

This project was developed as part of the **GVCC Learning Portal Assignment**.  