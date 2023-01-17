const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");//reponsible for parsing incoming requests bodies in middleware before you handle it
const cookieParser = require("cookie-parser"); // used to parse the cookie header to store data on the browser whenever a session is establiahed on the server-side
const session = require("express-session"); // HTTP server-side framework to creare  and manage session middleware
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

//adding cookie-parser and body-parse modules
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // extended allows choosing between parsing the URL-encoded data with the qs library(when true)
app.listen(3001, () => {
  console.log("running server");
});

//initializing session

app.use (
    session ({
        key: "userId", //name of the cookie
        secret: "bc0945@75.", //used to access data from the server-side
        resave: false,
        saveUninitialized: false, //allows any uninitialized session to be sent to the store
        cookie: {
            express: 60 * 60 * 24,
        },
    })
)

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

//indicating login status using session variables

app.post('/login', (req,res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user});
    } else {
        res.send({loggedIn: false});
    }

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
                // creating a session
                req.session.user = result;
                console.log(req.session.user);
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

app.listen(3001, () => {
    console.log("running server");
});
