const express = require("express");
const path =require("path");
const fs =require("fs");
const uniqid = require("uniqid");



const app = express();


var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"))


// let dbData = fs.readFileSync(path.join(__dirname,"/db.json"),"utf8");
// dbData = JSON.parse(dbData);



// Variable for JSON Object
// let notesData = dbData;
// console.log(notesData);

// returns json object
app.get("/api/notes", function(req,res) {
    const notes = noteRead()
   res.json(notes);
});


// post notes
app.post('/api/notes', function(req, res) {
  let note = noteRead();
  const newNote = req.body
  let id = uniqid()
  newNote.id = id 
  note.push(newNote)
  noteWrite(note)
  res.json(note)
});


const noteWrite = function(data) {
  const jsonPath = path.join(__dirname, "/db.json")
  fs.writeFile(jsonPath, JSON.stringify(data), (err) => {
          if (err) throw err;
      });
};

app.delete('/api/notes/:id', function(req,res) {
  const noteJson = noteRead();
  const result = noteJson.filter(note => note.id != req.params.id)
  writeData(result)
  res.json(result)
});

const noteRead = function() {
  const notePath = path.join(__dirname, "/db.json")
  const json = JSON.parse(fs.readFileSync(notePath))
  return json
};


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
