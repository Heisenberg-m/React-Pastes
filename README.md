# 📋 DropCode

An AI-powered notes and paste-sharing web app that helps you save, organize, and quickly find snippets, notes, and pastes — with a little help from AI.

## 📖 About the Project

DropCode lets you create quick notes or "pastes" with a title and description, tag them with a color for easy categorization, and get back to them fast with search, filters, and favorites. It also uses Google's Gemini API to suggest a title for your note and generate a short AI summary of it.

## ✨ Features

- User sign-up and login (Firebase Authentication)
- Create, view, edit, and delete notes/pastes with a title and description
- **Color-coded categories** to organize notes by type
- Mark notes as **favorites**
- **Debounced search bar** for fast, smooth searching as you type
- Filter and sort notes by newest first, oldest first, favorites only, or a specific color code
- **One-click copy** to clipboard from the note view
- **AI-suggested titles** and **AI-generated summaries** on the note detail page, powered by the Gemini API
- Toast notifications for a smooth user experience

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, React Hot Toast
- **Backend/Storage:** Firebase (Authentication + Firestore)
- **AI:** Google Gemini API (free tier)

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ and npm
- A free [Firebase](https://firebase.google.com/) project
- A free [Google Gemini API](https://ai.google.dev/) key

### 1. Clone the repository

```bash
git clone https://github.com/Heisenberg-m/DropCode.git
cd DropCode
npm install
```

### 2. Set up environment variables

Create a `.env` file in the project root with your Firebase and Gemini credentials:

```
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
REACT_APP_GEMINI_API_KEY=your-gemini-api-key
```

> Rename the prefix if you're not using Create React App — for example, use `VITE_` instead of `REACT_APP_` if the project runs on Vite.

### 3. Run the app

```bash
npm start        # or `npm run dev` if you're using Vite
```

The app will open at `http://localhost:3000/` (or `http://localhost:5173/` for Vite).

## 🧑‍💻 Usage

1. Sign up or log in.
2. Create a new note — give it a title, description, and pick a color category.
3. Use the search bar, filters, and sort options to find notes quickly.
4. Open a note to copy it in one click, mark it as a favorite, or generate an AI title/summary.

## 🔮 Future Improvements

- Syntax highlighting for code pastes
- Shareable public links for notes
- Dark mode
- Tag-based (not just color-based) organization

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋 Author

**Mridul Anand**
📧 mridul.katyayan@gmail.com
🔗 [github.com/Heisenberg-m](https://github.com/Heisenberg-m)
