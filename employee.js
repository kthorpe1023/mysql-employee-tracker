//require mysql and inquirer
const mysql = require("mysql");
const inquirer = require("inquirer");

let employeesArray = []

//create connection information
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    PORT: 3306,
    database: "employee_tracker_db"
});

var query = "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, employee.manager, role.salary FROM department INNER JOIN role INNER JOIN employee ON (department.id = role.department_id AND role.title = employee.title);";
// query += "FROM role INNER JOIN employee ON (role.title = employee.title);";

const viewEmployees = () => {
    connection.query(query, (err, data) =>{
        if(err) throw err;
        
        for(const items of data){
            console.log(`ID. ${items.id} || Name: ${items.first_name} ${items.last_name} || Department: ${items.name} || Title: ${items.title} || Manager: ${items.manager} || Salary: ${items.salary}`)
        }
    })
}

var querydept = "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, employee.manager, role.salary FROM department INNER JOIN role INNER JOIN employee ON (department.id = role.department_id AND role.title = employee.title) ORDER BY department.name;"

const employeesDepartment = () => {
    connection.query(querydept, (err, data) =>{
        if(err) throw err;
        
        for(const items of data){
            console.log(`ID. ${items.id} || Name: ${items.first_name} ${items.last_name} || Department: ${items.name} || Title: ${items.title} || Manager: ${items.manager} || Salary: ${items.salary}`)
        }
    })
};

var querymanager = "SELECT employee.id, employee.first_name, employee.last_name, department.name, role.title, employee.manager, role.salary FROM department INNER JOIN role INNER JOIN employee ON (department.id = role.department_id AND role.title = employee.title) ORDER BY employee.manager;"

const employeeManager = () => {
    connection.query(querymanager, (err, data) =>{

        // use a filter to fill up employeeTableByName include id 
        if(err) throw err;
        
        for(const items of data){
            console.log(`ID. ${items.id} || Name: ${items.first_name} ${items.last_name} || Department: ${items.name} || Title: ${items.title} || Manager: ${items.manager} || Salary: ${items.salary}`)
        }
    })
}

const getEmpData = () => {
    connection.query(query, (err, data) =>{

        // use a filter to fill up employeeTableByName include id 
        if(err) throw err;
        
        for(const items of data){
            employeesArray.push(`${items.id}. ${items.first_name} ${items.last_name}`)
        }
        // console.log(employeesArray + " line 65")
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
            choices: ["marketing coordinator", "receptionist", "web developer", "manager"]

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
    menu();
    })
};


const removeEmployee = () => {
    console.log("Deleting an employee");
    var query =
      `SELECT employee.id, employee.first_name, employee.last_name
        FROM employee`
    connection.query(query, function (err, res) {
      if (err) throw err;
      const deleteEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));
    inquirer.prompt([
        {
            type: "list",
            message: "Which employee would you like to remove?",
            name: "id",
            choices: deleteEmployeeChoices
        }
    ]).then((data) =>{
        console.log(data);

        connection.query("DELETE FROM employee WHERE id = ?",
        [data.id],
        (err)=> {
            if(err) throw err;
            console.log(`Employee ${employee.id} has been removed`)
        })
        menu();
    })
})
};

const updateRole = () => {
    console.log("Update role of an employee");
    var query =
      `SELECT employee.id, employee.first_name, employee.last_name
        FROM employee`
    connection.query(query, function (err, res) {
      if (err) throw err;
      const updateEmployeeChoices = res.map(({ id, first_name, last_name }) => ({
        value: id, name: `${id} ${first_name} ${last_name}`
      }));
    
    // console.log(employeesArray + " line 128")
    inquirer.prompt([
        {
            type: "list",
            message: "Whose role do you need to update?",
            name: "employeeRole",
            choices: updateEmployeeChoices
        },
        {
            type: "list",
            message: "What would you like to update for this employee?",
            name: "updateChoice",
            choices: ["Name", "Manager", "Title"]
        }

    ]).then((answer) =>{
        switch(answer.action){
            case "Name":
                changeName(answer);
                break;
            case "Last name":
                changeManager(answer);
                break;
            case "Title":
                changeTitle(answer);
                break;
        }
    })
})
};
        
        const changeName = () =>{
            inquirer.prompt([
                {
                    type: "input",
                    message: "what is the employee's new first name?",
                    name: "newFirst",
                },
                {
                    type: "input",
                    message: "What is the employee's new last name?",
                    name: "newLast"
                }
            ]).then((data) => {
                connection.query("UPDATE employee WHERE id = ?",

                (err)=> {
                    if(err) throw err;
                    console.log(`Employee ${data.id} has been removed`)
                })
            })

        menu();
        };

const menu = () => {
    
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            choices: ["View all employees", "View all employees by department", "View all employees by manager", "Add employee", "Remove employee", "Update employee role", "Update employee manager", "Exit"],
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
            case "Remove employee":
                return removeEmployee();
                break;
            case "Update employee role":
                return updateRole();
                break;
            case "Update employee manager":
                return updateManager();
                break;
            case "Exit":
                return connection.end()
        }
    });
};

connection.connect((err) => {
    if(err) throw err;
    console.log(`Connected to id ${connection.threadId}`);
    menu();
    getEmpData();
    
})
