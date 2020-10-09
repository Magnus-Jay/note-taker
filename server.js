const express = require("express");
const path =require("path");
const fs =require("fs");


const app = express();

var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))




let dbData = fs.readFileSync(path.join(__dirname,"/db.json"),"utf8");
dbData = JSON.parse(dbData);

// Variable for JSON Object
let notesData = dbData.notesArray;
console.log(notesData);

//
app.post("/api/notes", function(req, res) {
    // req.body is available since we're using the body parsing middleware
      notesData.push(req.body);
      res.json(true);
    }
  );


  //app.METHOD(PATH, HANDLER)

//Routing to note and sending to notes.html
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });

app.get("/index", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

 app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.listen(PORT,function(){
    console.log("listenin on port " +PORT)
})

