import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import "../../App.css";
import Tesseract from "tesseract.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Saved from "./saved";

const Main = ({ savedtext, setsavedtext }) => {
  //state variables
  const [selectedFile, setSelectedFile] = useState();
  //   const [savedtext, setsavedtext] = useState([]);
  const [loading, setloading] = useState(false);
  const [text, settext] = useState("");
  const [text2, settext2] = useState("");
  const [textreco, settextreco] = useState(false);
  //Function to handelclicks
  const handelclick = async (e) => {
    text !== "" ? setloading(true) : setloading(false);
    if (e.target.value === "UpperCase") {
      settext2(text.toUpperCase());
      setloading(false);
    }
    if (e.target.value === "Lowercase") {
      settext2(text.toLowerCase());
      setloading(false);
    }
    if (e.target.value === "fixgrammer") {
      fetch("/fixgrammer", {
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text.toString() }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          settext2(data.fixed);
        })
        .catch((err) => console.log(err));
      setloading(false);
    }
    if (e.target.value === "JsonToXml" && text !== "") {
      try {
        let texxt = await JSON.parse(text);
        settext2(OBJtoXML(texxt));
      } catch (e) {
        settext2(
          `OOPS ERROR OCCURRED CHECK YOUR JSON INPUT & TRY AGAIN \nERROR :  ${e}`
        );
      }
      setloading(false);
    }
    if (e.target.value === "TestApi" && text !== "") {
      {
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
        setloading(false);
      }
    }
  };
  //function to convert ovject to json
  function OBJtoXML(obj) {
    var xml = "";
    for (var prop in obj) {
      xml += obj[prop] instanceof Array ? "" : "<" + prop + ">";
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
      xml += obj[prop] instanceof Array ? "" : "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
    console.log(xml);
    return xml;
  }
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
      : alert("Please enter something before saving");
  };

  //To get item from localstorage
  //   useEffect(() => {
  //     if (localStorage.getItem("text")) {
  //       setsavedtext([...JSON.parse(localStorage.getItem("text"))]);
  //     }
  //   }, []);
  //   //To set item in local storage on change of savedtext state
  //   useEffect(() => {
  //     localStorage.setItem("text", JSON.stringify(savedtext));
  //   }, [savedtext]);
  useEffect(() => {
    if (selectedFile) {
      Tesseract.recognize(selectedFile, "eng")
        .then(({ data }) => {
          //   console.log(data);
          settextreco(false);
          settext(data.text);
        })
        .catch((e) => {
          settextreco(false);
          console.log(e);
        });
    }
  }, [selectedFile]);
  return (
    <>
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
              disabled={textreco}
              className="my-2"
              value={text}
              onInput={(e) => {
                settext(e.target.value);
              }}
              cols="80"
              rows="14"
              style={{ backgroundColor: "#c2c2c2" }}
            ></textarea>
            {textreco ? (
              <>
                <img
                  style={{
                    height: "40%",
                    width: " 60%",
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  src="https://i.stack.imgur.com/hzk6C.gif"
                />
              </>
            ) : (
              ""
            )}
            <p className="m-3">
              words = {text === "" ? 0 : text.trim().split(" ").length}{" "}
              characters=
              {text.trim().length}
            </p>
          </div>

          <div className="col-12 col-lg-6 d-flex flex-column text-box-area align-item-center justify-content-center">
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
              <button
                onClick={() => {
                  settext2("");
                }}
              >
                <i class="fa-solid fa-trash-can"></i>
                <p>clear</p>
              </button>
            </div>

            <h4>Output Area</h4>
            <textarea
              className="my-2"
              value={text2}
              readOnly={true}
              cols="80"
              rows="14"
              style={{ backgroundColor: "#c2c2c8" }}
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
            className="btn-success rounded m-2 px-2"
            value="UpperCase"
            onClick={handelclick}
            disabled={loading ? true : false}
          >
            UpperCase
          </button>
          <button
            className="btn-success rounded m-2 px-2"
            value="Lowercase"
            onClick={handelclick}
            disabled={loading ? true : false}
          >
            Lowercase
          </button>
          <button
            value="TestApi"
            className="btn-success rounded m-2 px-2"
            onClick={handelclick}
            disabled={loading}
          >
            Fetchdata
          </button>
          <button
            value="JsonToXml"
            className="btn-success rounded m-2 px-2"
            onClick={handelclick}
            disabled={loading}
          >
            JsonToXml
          </button>
          <button
            value="fixgrammer"
            className="btn-success rounded m-2 px-2"
            onClick={handelclick}
            disabled={loading ? true : false}
          >
            fixgrammer
          </button>
        </div>
        {/* ocr  */}
        <label>
          Scan text from image <i class="fa-solid fa-barcode-scan"></i>
          <input
            type="file"
            onChange={(event) => {
              try {
                setSelectedFile(URL.createObjectURL(event.target.files[0]));
                settextreco(true);
              } catch (e) {
                settextreco(false);
              }
            }}
            accept="image/*"
          />
        </label>
        {selectedFile ? (
          <img style={{ height: "100px", width: "auto" }} src={selectedFile} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Main;
