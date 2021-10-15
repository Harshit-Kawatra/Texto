import { useState } from "react";
import Texto from "./assets/image/Texto.png";
function App() {
  function OBJtoXML(obj) {
    var xml = "";
    for (var prop in obj) {
      xml += "<" + prop + ">";
      if (obj[prop] instanceof Array) {
        for (var array in obj[prop]) {
          xml += OBJtoXML(new Object(obj[prop][array]));
        }
      } else if (typeof obj[prop] == "object") {
        xml += OBJtoXML(new Object(obj[prop]));
      } else {
        xml += obj[prop];
      }
      xml += "</" + prop + ">";
    }
    var xml = xml.replace(/<\/?[0-9]{1,}>/g, "");
    return xml;
  }
  const handelclick = async (e) => {
    if (e.target.value === "UpperCase") settext2(text.toUpperCase());
    if (e.target.value === "Lowercase") settext2(text.toLowerCase());
    if (e.target.value === "JsonToXml") {
      try {
        let texxt = await JSON.parse(text);
        settext2(OBJtoXML(texxt));
      } catch (e) {
        settext2(`${e}`);
      }
    }
    if (e.target.value === "TestApi") {
      //function to get data from api
      try {
        let a = await fetch(text);
        let data = await a.json();
        console.log(data);
        let finaldata = JSON.stringify(data, null, "\t");
        settext2(finaldata);
      } catch (e) {
        settext2(
          `OOPS ERROR OCCURRED CHECK YOUR API OR TRY AGAIN LATER\nERROR :  ${e}`
        );
      }
    }
  };
  const [text, settext] = useState("");
  const [text2, settext2] = useState("");
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container align-item-center px-4">
          <a class="navbar-brand" href="#">
            <img src={Texto} style={{ height: "60px", width: "100px" }} />
          </a>
          <button
            class="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="navbar-collapse justify-content-end collapse"
            id="navbarNavAltMarkup"
          >
            <div class="navbar-nav w-50 justify-content-end">
              <a class="nav-link active mx-2" aria-current="page" href="#">
                Home
              </a>
              <a class="nav-link mx-2" href="#Aboutus">
                About Us
              </a>
              <a class="nav-link mx-2" href="#">
                Reach Us
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div class="container my-4">
        <div className="row d-flex justify-content-around">
          <div class="col-12 col-lg-6 d-flex flex-column align-item-center justify-content-center">
            <textarea
              className="my-2"
              onInput={(e) => {
                settext(e.target.value);
                console.log(text);
              }}
              cols="80"
              rows="14"
              style={{ "background-color": "#c2c2c2" }}
            ></textarea>
            <p className="m-3">
              words = {text === "" ? 0 : text.trim().split(" ").length}
              characters=
              {text.trim().length}
            </p>
          </div>
          <div class="col-12 col-lg-6 d-flex flex-column align-item-center justify-content-center">
            <textarea
              className="my-2"
              value={text2}
              readonly="true"
              cols="80"
              rows="14"
              style={{ "background-color": "#c2c2c8" }}
            ></textarea>
                        <p className="m-3">
              words = {text2 === "" ? 0 : text2.trim().split(" ").length}
              characters=
              {text2.trim().length}
            </p>
          </div>
        </div>

        <div className="d-flex justify-content-around my-4 ">
          <button
            className="btn-success rounded"
            value="UpperCase"
            onClick={handelclick}
          >
            UpperCase
          </button>
          <button
            className="btn-success rounded"
            value="Lowercase"
            onClick={handelclick}
          >
            Lowercase
          </button>
          <button
            value="TestApi"
            className="btn-success rounded"
            onClick={handelclick}
          >
            TestApi
          </button>
          <button
            value="JsonToXml"
            className="btn-success rounded"
            onClick={handelclick}
          >
            JsonToXml
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
