const express = require("express");
const app = express();


app.get("/", function(request, response){
    //  console.log(request);
    response.send("<h1>World</h1>Hello");
});

app.get("/contact", function(req,res){
    res.send("contact me at:angel@gamil.com")
});

app.get("/about", function(req,res){
    res.send("My name is gurvinder");
});

app.get("/hobbies", function(req,res){
    res.send("<ul><li>Computer</li><li>Cofee</li><li>Astronomy</li></ul>");
});

app.listen(3000, function(){
    console.log("server started on port 3000");
});

