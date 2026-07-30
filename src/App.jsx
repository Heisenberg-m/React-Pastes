import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideRays from "./Components/React Bits/Siderays";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import { db, auth } from "./FirebaseConfig/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import HomeRoute from "./Router/HomeRoute";
import ViewEditRoute from "./Router/ViewEditRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const [search, setSearch] = useState("");
  const [pasteList, setPasteList] = useState([]);

  const [user, setUser] = useState(null);
  /////Checks if the user is already logged in when page renders
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);
  //fetching the data from firestore for current logged in user
  useEffect(() => {
    const fetchPastes = async () => {
      try {
        const q = query(
          ////writing the query
          collection(db, "Pastes"),
          where("userId", "==", user.uid),
        );

        const querySnapshot = await getDocs(q); ///fetching the data
        const items = querySnapshot.docs.map((doc) => ({
          ///converting it into a javascript obj
          id: doc.id,
          ...doc.data(),
        }));
        setPasteList(items);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };
    if (user) {
      fetchPastes();
    }
  }, [user]);

  return (
    <Router>
      <div className="main-container">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "rgb(13, 13, 13)",
              color: "whitesmoke",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              fontFamily: '"Courier New", Courier, monospace',
            },
          }}
        />
        <div className="siderays-bg">
          <SideRays />
        </div>
        <div className="app-content">
          <Navbar search={search} setSearch={setSearch} user={user} />
          <Routes>
            <Route
              path="/"
              element={
                // Show home only when the user is logged in./////
                user ? (
                  <HomeRoute
                    search={search}
                    setSearch={setSearch}
                    pasteList={pasteList}
                    setPasteList={setPasteList}
                  />
                ) : (
                  <Login />
                )
              }
            />

            <Route
              path="/paste/:id"
              element={
                // Show edit only when the user is logged in./////
                user ? (
                  <ViewEditRoute
                    pasteList={pasteList}
                    setPasteList={setPasteList}
                  />
                ) : (
                  <Login />
                )
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
