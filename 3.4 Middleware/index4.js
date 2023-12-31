import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

function logger(req,res,next){
  console.log("Request method: ",req.method);
  console.log("Request URL: ",req.url);
  next();
}

app.use(logger);

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit",(req,res)=>{
  console.log(req.body);
  res.send(`<h1>Your Brand name is</h1><h3>${req.body.street}${req.body.pet}</h3>`);
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
