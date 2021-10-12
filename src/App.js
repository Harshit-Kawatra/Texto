import { useState } from "react";
function App() {
  const fetchjson = async () => {
    try {
      let a = await fetch(text);
      let data = await a.json();
      console.log(data);
      let finaldata = JSON.stringify(data);
      settext2(finaldata);
    } catch (e) {
      settext2(e);
    }
  };

  const handelclick = (e) => {
    if (e.target.value === "UpperCase") settext2(text.toUpperCase());
    if (e.target.value === "Lowercase") settext2(text.toLowerCase());
  };
  const [text, settext] = useState("");
  const [text2, settext2] = useState("");
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container align-item-center px-4">
          <a class="navbar-brand" href="#">
            <img
              src="https://ov10-engine.flamingtext.com/netfu/tmp28000/coollogo_com-279222130.png"
              style={{ height: "40px" }}
            />
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
          <div class="col-12 col-lg-6 d-flex justify-content-center">
            <textarea
              onInput={(e) => {
                settext(e.target.value);
                console.log(text);
              }}
              cols="80"
              rows="15"
              style={{ "background-color": "#c2c2c2" }}
            ></textarea>
          </div>
          <div class="col-12 col-lg-6 d-flex justify-content-center">
            <textarea
              value={text2}
              readonly="true"
              cols="80"
              rows="15"
              style={{ "background-color": "#c2c2c8" }}
            ></textarea>
          </div>
        </div>
        <p className="my-4">
          words = {text === "" ? 0 : text.trim().split(" ").length} characters=
          {text.length}
        </p>
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
          <button className="btn-success rounded" onClick={fetchjson}>
            json
          </button>
          <button className="btn-success rounded" onClick={handelclick}>
            UpperCase
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
