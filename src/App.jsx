import { useState, useEffect } from "react";
import "./App.css";
import SideRays from "./Components/React Bits/Siderays";
import Navbar from "./Components/Navbar";
import CreatePaste from "./Components/CreatePaste";
import PasteCard from "./Components/PasteCard";
import { db } from "./FirebaseConfig/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";

function App() {
  // defining the search state here so that it can be passed a prop to the child components
  const [search, setSearch] = useState("");
  const [pasteList, setPasteList] = useState([
    // {
    //   id: 1784125439105,
    //   title: "Sample Paste",
    //   content:
    //     "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    // },
  ]);

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
    <div className="main-container">
      <div className="siderays-bg">
        <SideRays />
      </div>

      <div className="app-content">
        <Navbar search={search} setSearch={setSearch} />
        <CreatePaste
          search={search}
          setSearch={setSearch}
          pasteList={pasteList}
          setPasteList={setPasteList}
        />
        <PasteCard
          pasteList={pasteList}
          search={search}
          setPasteList={setPasteList}
        />
      </div>
    </div>
  );
}

export default App;
