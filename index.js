const db_students = require('./data/students_model');
const db_cohorts = require('./data/cohorts_model');
const express = require('express');

const server = express();

server.use(express.json());

// endpoints here
const port = 3000; 

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.get("/api/cohorts/",    
(req,res) => 
db_cohorts.find()
.then(result => res.status(200).json(result))
.catch(err => res.status(500).json({error: err, message: "could not gather from database"}))
);

server.get("/api/cohorts/:id",
  (req,res) => db_cohorts.find(req.params.id)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(400).json({error: err, message: "id does not exist"}))
);

server.get("/api/cohorts/:id/students",
    (req,res)=> db_cohorts.getStudents(req.params.id)
    .then(result =>  res.status(200).json(result))
    //.catch(err => res.status(400).json({error: err, message: "id does not exist"}))
);

server.post("/api/cohorts/",
  (req,res,next) =>
  db_cohorts.add(req.body)
  .then(result => res.status(201).json(result))
  .catch(err => res.status(400).json({error: err, message: "cohorts must have a unique name"}))
);


server.delete("/api/cohorts/:id", 
  (req,res) => db_cohorts.remove(req.params.id)
  .then(() => res.status(202).json({message: "you have deleted an item"}))
  .catch(err => res.status(400).json({error: err, message: "cohort could not be deleted."}))
)


server.put("/api/cohorts/:id",
  (req,res) => db_cohorts.update(req.params.id, req.body)
  .then(result => res.status(203).json(result))
  .catch(err => res.status(400).json({error: err, message: "cohort could not be updated"}))
)


server.get("/api/students/",    
(req,res) => 
db_students.find()
.then(result => res.status(200).json(result))
.catch(err => res.status(500).json({error: err, message: "could not gather from database"}))
);

server.get("/api/students/:id",
  (req,res) => db_students.find(req.params.id)
  .then(result => res.status(200).json(result))
  .catch(err => res.status(400).json({error: err, message: "id does not exist"}))
);

server.post("/api/students/",
  (req,res,next) =>
  db_students.add(req.body)
  .then(result => res.status(201).json(result))
  .catch(err => res.status(400).json({error: err, message: "students must have a unique name"}))
);


server.delete("/api/students/:id", 
  (req,res) => db_students.remove(req.params.id)
  .then(() => res.status(202).json({message: "you have deleted an item"}))
  .catch(err => res.status(400).json({error: err, message: "students could not be deleted."}))
)


server.put("/api/students/:id",
  (req,res) => db_students.update(req.params.id, req.body)
  .then(result => res.status(203).json(result))
  .catch(err => res.status(400).json({error: err, message: "students could not be updated"}))
)

