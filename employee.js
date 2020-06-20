//require mysql and inquirer
const mysql = require("mysql");
const inquirer = require("inquirer");


//create connection information
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    PORT: 3306,
    database: "employee_tracker_db"
});

connection.connect((err) => {
    if(err) throw err;
    console.log(`Connected to id ${connection.threadId}`)
});