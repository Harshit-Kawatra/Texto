import { useState, useEffect } from "react";
import Navbar from "./assets/components/navbar";
import "./App.css";
import Tesseract from "tesseract.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Saved from "./assets/pages/saved";
import Main from "./assets/pages/main";

function App() {
  const [savedtext, setsavedtext] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("text")) {
      setsavedtext([...JSON.parse(localStorage.getItem("text"))]);
    }
  }, []);
  //To set item in local storage on change of savedtext state
  useEffect(() => {
    localStorage.setItem("text", JSON.stringify(savedtext));
  }, [savedtext]);
  const deleteobj = (id) => {
    // console.log(id);
    var deleted = savedtext.filter((ele, index) => {
      return index !== id;
    });
    setsavedtext(deleted);
    console.log(deleted);
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/saved"
          element={
            <>
              <Navbar />
              <Saved {...{ savedtext, deleteobj }} />
            </>
          }
        />
        <Route path="/about">{/* <Users /> */}</Route>

        <Route
          path="/"
          element={
<Main {...{savedtext,setsavedtext}}/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
