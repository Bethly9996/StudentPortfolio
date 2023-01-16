const mysql = require("mysql2");
const express = require("express");
const app = express();

app.use(express.json());
app.listen(3001, () => {
    console.log("running server");
});

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    email:"add-email",
    password: "add-password",
    database: "loginsystem",
});

