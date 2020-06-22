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

var query = "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, employee.manager, role.salary";
query += "FROM department INNER JOIN role INNER JOIN employee ON (department.id = role.department_id AND employee.department_id);";

const viewEmployees = () => {
    connection.query(query, (err, data) =>{
        if(err) throw err;
        
        for(const items of data){
            console.log(`ID. ${items.id} || Name: ${items.first_name} ${items.last_name} || Department: ${items.name} || Title: ${items.title} || Manager: ${items.manager} || Salary: ${items.salary}`)
        }
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the first name of this employee?",
            name: "first_name",
           //add validate: function(value) if possible to ensure string and NaN
        },
        {
            type: "input",
            message: "What is the last name of this employee?",
            name: "last_name",
            //same validate as above
        },
        {
            type: "list",
            message: "Who is this employee's manager?",
            name: "manager",
            choices: ["Troy Barnes", "Abed Nadir", "Britta Perry", "Annie Edison", "Shirley Bennett", "Jeff Winger"]

        },
        {
            type: "list",
            message: "What is the employee's title?",
            name: "title",
            choices: ["marketing coordinator", "receptionist", "web developer", "managmr"]

        }

    ]).then((data) => {
        connection.query("INSERT INTO employee SET ?",
        {
            first_name: data.first_name,
            last_name: data.last_name,
            manager: data.manager,
            title: data.title,
        },
        (err)=> {
            if(err) throw err;
            console.log(`Employee ${data.first_name} has been added`)
        })
    })
};


const removeEmployee = () => {
    // let empName = []
    // const nameTime = () => {connection.query("SELECT first_name, last_name FROM employee;", (err, res) => {
    //     if(err) throw err;
    //     for(items of res){
    //         empName.push(`${items.first_name} ${items.last_name}`)
    //     }
    // })
    // }
    // nameTime()
    // console.log(empName);
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to remove?",
            name: "employeeName",
            choices: [empName]
        }
    ]).then((data) =>{
        connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?",
        [first_name = data.first_name],[last_name = data.last_name])
    })
};

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
                break;
            case "View all employees by department":
                return employeesDepartment();
                break;
            case "View all employees by manager":
                return employeeManager();
                break;
            case "Add employee":
                return addEmployee();
                break;
            case "Remomve employee":
                return removeEmployee();
                break;
            case "Update employee role":
                return updateRole();
                break;
            case "Update employee manager":
                return updateManager();
                break;
        }
    });
};

connection.connect((err) => {
    if(err) throw err;
    console.log(`Connected to id ${connection.threadId}`);
    menu();
});