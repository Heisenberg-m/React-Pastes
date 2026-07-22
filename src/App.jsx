import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SideRays from "./Components/React Bits/Siderays";
import Navbar from "./Components/Navbar";
import { db } from "./FirebaseConfig/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import HomeRoute from "./Router/HomeRoute";
import ViewEditRoute from "./Router/ViewEditRoute";

function App() {
  const [search, setSearch] = useState("");
  const [pasteList, setPasteList] = useState([]);

  useEffect(() => {
    const fetchPastes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Pastes"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPasteList(items);
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };
    fetchPastes();
  }, []);

  return (
    <Router>
      <div className="main-container">
        <div className="siderays-bg">
          <SideRays />
        </div>

        <div className="app-content">
          <Navbar search={search} setSearch={setSearch} />
          <Routes>
            <Route
              path="/"
              element={
                <HomeRoute
                  search={search}
                  setSearch={setSearch}
                  pasteList={pasteList}
                  setPasteList={setPasteList}
                />
              }
            />
            <Route
              path="/paste/:id"
              element={
                <ViewEditRoute
                  pasteList={pasteList}
                  setPasteList={setPasteList}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
