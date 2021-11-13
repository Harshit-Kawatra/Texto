const express = require("express");
const { spawn } = require("child_process");
var cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("i am backend");
});
app.post("/fixgrammer", (req, res) => {
  const data = req.body.text;
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn("python", ["script1.py"]);
  python.stdin.write(data.toString());
  python.stdin.end();
  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    console.log(dataToSend);
    res.send({ fixed: dataToSend });
  });
});
app.listen(port, () =>
  console.log(`Example app listening on port 
${port}!`)
);
