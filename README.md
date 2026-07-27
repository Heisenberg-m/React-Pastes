# DropCode

DropCode is a modern, responsive, and secure pastebin application built with React and Firebase. It allows users to securely store, organize, and copy code snippets, text notes, and daily todos. 

Featuring a sleek dark glass-morphism UI, DropCode comes fully equipped with user authentication, custom color tagging, and instant client-side filtering.

## ✨ Features

- **Secure Authentication:** User login and registration using Firebase Authentication (Email/Password & Google Sign-in).
- **Protected Data:** Firestore security rules ensure users can only view, edit, and delete their own pastes.
- **Color Tagging:** Assign custom color codes (🔴, 🟢, 🔵, etc.) to pastes for easy visual organization.
- **Advanced Filtering & Sorting:** Instantly sort pastes by Date (Newest/Oldest), Alphabetically, or filter by specific Color Tags and Favorites without querying the database.
- **One-Click Copy:** Easily copy code snippets to your clipboard with visual feedback.
- **Responsive Design:** A fully mobile-optimized layout that looks great on any screen size.
- **Toast Notifications:** Beautiful, non-intrusive popups for success and error messages using `react-hot-toast`.

## 🛠️ Tech Stack

- **Frontend:** React.js (Vite)
- **Routing:** React Router v6
- **Backend/BaaS:** Firebase (Auth, Firestore, Hosting)
- **Styling:** Vanilla CSS (Custom Glass-morphism Theme)
- **Utilities:** `react-copy-to-clipboard`, `react-hot-toast`

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
- npm
  ```sh
  npm install npm@latest -g
for the best performance.
