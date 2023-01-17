const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const express = require("express");
const { response } = require("express");
const app = express();

app.use(express.json());

//adding CORS
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.listen(3001, () => {
  console.log("running server");
});

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  email: "add-email",
  registrationno: "add-registration number",
  password: "add-password",
  database: "loginsystem",
});

//saltRound defines the no of hashing rounds done during bcrypt hashing

const saltRound = 10;

//login route
app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const registrationno = req.registrationno;
  const password = req.password;

  bcrypt.hash(password, saltRound, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.execute(
      "INSERT INTO users (username,email,registration.no,password) VALUES (?,?,?,?",
      [username, email, registrationno, password],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.execute(
    "SELECT * FROM users WHERE username = ?;",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password,(error, response) => {
            if (response) {
                res.send(result);
            } else {
                res.send({message: "Wrong username/ password combination!"});
            }
        });
      } else {
        res.send({message:"User doesn't exist"});
      }
      }
    
  );
});
