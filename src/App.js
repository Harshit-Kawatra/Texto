import { useState, useEffect } from "react";
import Navbar from "./assets/components/navbar";
import ReactReadMoreReadLess from "react-read-more-read-less";
import "./App.css";

function App() {

  //function to convert ovject to json
  function OBJtoXML(obj) {
    var xml = '';
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += "<" + prop + ">";
          // console.log(new Object(obj[prop][array]));
          xml += OBJtoXML(new Object(obj[prop][array]));
          xml += "</" + prop + ">";
        }
      } else if (typeof obj[prop] == "object") {
        // console.log(new Object(obj[prop]));
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
    console.log(xml);
    return xml
  }
  const handelclick = async (e) => {
    if (e.target.value === "UpperCase") settext2(text.toUpperCase());
    if (e.target.value === "Lowercase") settext2(text.toLowerCase());
    if (e.target.value === "JsonToXml") {
      try {
        let texxt = await JSON.parse(text);
        settext2((OBJtoXML(texxt)));
      } catch (e) {
        settext2(
          `OOPS ERROR OCCURRED CHECK YOUR JSON INPUT & TRY AGAIN \nERROR :  ${e}`
        );
      }
    }
    if (e.target.value === "TestApi") {
      try {
        let a = await fetch(text);
        let data = await a.json();
        let finaldata = JSON.stringify(data, null, "\t");
        settext2(finaldata);
      } catch (e) {
        settext2(
          `OOPS ERROR OCCURRED CHECK YOUR API & TRY AGAIN \nERROR :  ${e}`
        );
      }
    }
  };
  //function to delete object from savedtext state
  const deleteobj = (id) => {
    // console.log(id);
    var deleted = savedtext.filter((ele, index) => {
      return index !== id;
    });
    setsavedtext(deleted);
    console.log(deleted);
  };
  //function to save text in array
  const savefunction = (txt) => {
    let textinstring = {
      text: txt.toString(),
      time: new Date().toLocaleString(),
    };
    textinstring = savedtext.concat(textinstring);
    txt !== ""
      ? setsavedtext(textinstring)
      : alert("please enter something before save");
  };
  const [savedtext, setsavedtext] = useState([]);
  const [text, settext] = useState("");
  const [text2, settext2] = useState("");

  //To get item from localstorage
  useEffect(() => {
    if (localStorage.getItem("text")) {
      setsavedtext([...JSON.parse(localStorage.getItem("text"))]);
    }
  }, []);
  //To set item in local storage on change of savedtext state
  useEffect(() => {
    localStorage.setItem("text", JSON.stringify(savedtext));
  }, [savedtext]);

  return (
    <div>
      <Navbar />
      <div class="container my-4">
        {/* Textbox area */}
        <div className="row d-flex justify-content-around">
          <div class="col-12 col-lg-6 d-flex flex-column text-box-area align-item-center justify-content-center">
            <div className="buttons">
              <button onClick={() => savefunction(text)}>
                <i class="fa-solid fa-floppy-disk"></i>
                <p>save</p>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(text);
                }}
              >
                <i class="fa-solid fa-clipboard"></i>
                <p>copy</p>
              </button>
              <button
                onClick={async () => {
                  let clipboardtxt = await navigator.clipboard.readText();
                  if (clipboardtxt) {
                    settext(clipboardtxt.toString());
                  }
                }}
              >
                <i class="fa-solid fa-paste"></i>
                <p>Paste</p>
              </button>
            </div>
            <h4>Input Area</h4>
            <textarea
              className="my-2"
              value={text}
              onInput={(e) => {
                settext(e.target.value);
              }}
              cols="80"
              rows="14"
              style={{ "background-color": "#c2c2c2" }}
            ></textarea>
            <p className="m-3">
              words = {text === "" ? 0 : text.trim().split(" ").length}{" "}
              characters=
              {text.trim().length}
            </p>
          </div>
          <div class="col-12 col-lg-6 d-flex flex-column text-box-area align-item-center justify-content-center">
            <div className="buttons">
              <button onClick={() => savefunction(text2)}>
                <i class="fa-solid fa-floppy-disk"></i>
                <p>save</p>
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(text2);
                }}
              >
                <i class="fa-solid fa-clipboard"></i>
                <p>copy</p>
              </button>
            </div>
            <h4>Output Area</h4>
            <textarea
              className="my-2"
              value={text2}
              readonly="true"
              cols="80"
              rows="14"
              style={{ "background-color": "#c2c2c8" }}
            ></textarea>
            <p className="m-3">
              words = {text2 === "" ? 0 : text2.trim().split(" ").length}{" "}
              characters=
              {text2.trim().length}
            </p>
          </div>
        </div>
        {/* Buttons to all feature */}
        <div className="d-flex container flex-wrap justify-content-center my-4 ">
          <button
            className="btn-success rounded m-2"
            value="UpperCase"
            onClick={handelclick}
          >
            UpperCase
          </button>
          <button
            className="btn-success rounded m-2"
            value="Lowercase"
            onClick={handelclick}
          >
            Lowercase
          </button>
          <button
            value="TestApi"
            className="btn-success rounded m-2"
            onClick={handelclick}
          >
            TestApi
          </button>
          <button
            value="JsonToXml"
            className="btn-success rounded m-2"
            onClick={handelclick}
          >
            JsonToXml
          </button>
        </div>
        {/* rendering savedtext */}
        {savedtext.length ? <h2 className="m-2">Notes</h2> : ""}
        <div class="d-flex flex-wrap justify-content-around">
          {savedtext.map((item, index) => {
            console.log(item.text)
            return (
              <div class="card m-2" style={{ width: "18rem" }} key={index}>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">NOTE</h5>
                  <p style={{whiteSpace:"pre-wrap"}} class="card-text">
                    <ReactReadMoreReadLess
                      charLimit={200}
                      readMoreText={" Read more ▼"}
                      readLessText={" Read less ▲"}
                    >
                     {`${item.text}`}
                    </ReactReadMoreReadLess>
                  </p>
                  <button
                    type="button"
                    class="btn btn-outline-danger mt-auto align-self-start"
                    onClick={() => deleteobj(index)}
                  >
                    delete
                  </button>
                  <p
                    className="text-secondary mb-0 font-italic align-self-end"
                    style={{ fontSize: "0.8em" }}
                  >
                    {item.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
