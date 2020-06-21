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

const viewEmployees = () => {
    connection.query("SELECT * FROM department", (err, data) =>{
        if(err) throw err;
        for(const items of data){
            console.log(`ID. ${items.id} ${items.name}`)
        }
    })
}

const menu = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add employee", "Remomve employee", "Update employee role", "Update employee manager"],
            name: "action",
        }
    ]).then((answer) => {
        switch(answer.action) {
            case "View all employees":
                return viewEmployees();
            case "View all employees by department":
                return employeesDepartment();
        }
    });
};

connection.connect((err) => {
    if(err) throw err;
    console.log(`Connected to id ${connection.threadId}`);
    menu();
});