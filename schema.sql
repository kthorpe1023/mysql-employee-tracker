CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

CREATE TABLE department(
id INT AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE role(
id INT auto_increment,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INT NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE employee(
id INT AUTO_INCREMENT NOT NULL,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
manager VARCHAR(30) NOT NULL,
title VARCHAR(30) NOT NULL,
primary key(id)
);

INSERT INTO employee(first_name, last_name, manager_id) VALUES("Betsy", "Johnson", 8675);
INSERT INTO department(name) VALUES("marketing");
INSERT INTO department(name) VALUES("reception");
INSERT INTO department(name) VALUES("web development");
INSERT INTO department(name) VALUES("manager");

INSERT INTO role(title, salary, department_id) VALUES("marketing coordinator", 50000, 1);
INSERT INTO role(title, salary, department_id) VALUES("receptionist", 50000, 2);
INSERT INTO role(title, salary, department_id) VALUES("web developer", 70000, 3);
INSERT INTO role(title, salary, department_id) VALUES("manager", 80000, 4);

SELECT department.id, department.name, role.title, role.salary
FROM department INNER JOIN role INNER JOIN employee ON (department.id = role.department_id AND role.title=employee.title);