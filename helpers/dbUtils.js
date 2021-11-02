const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
// creating connection to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the business_db database.`)
);

// helper functions
const viewDepartments = async () => {
  let query = "SELECT * FROM departments;";
  const [rows] = await db.promise().query(query);
  return rows;
};

const viewRoles = async () => {
  let query =
    "SELECT d.name as 'Department Name', r.roles_id, r.title, r.salary FROM roles r JOIN departments d ON r.departments_id = d.departments_id;";
  const [rows] = await db.promise().query(query);
  return rows;
};

const viewEmployees = async () => {
  let query =
    "SELECT  e.employees_id AS 'Employee ID', e.first_name AS 'First Name', e.last_name AS 'Last Name',r.title AS 'Job Title',  d.name AS 'Department', r.salary AS 'Salary',CONCAT(IFNULL(m.first_name,'No'), ' ', IFNULL(m.last_name,'Manager')) AS 'Manager' FROM employees as e INNER JOIN roles as r ON e.roles_id = r.roles_id INNER JOIN departments as d ON r.departments_id = d.departments_id LEFT JOIN employees as m on e.manager_id = m.employees_id;";
  const [rows]=await db.promise().query(query);
  return rows;
};

const addDepartment = async (dept) => {
  let query = "INSERT INTO departments (name) VALUES (?);";
  let params = [dept];
  let [ResultSetHeader] = await db.promise().query(query, params);
  console.log(ResultSetHeader)
  console.log(`${dept} Department added successfully`);
  return ;
};

const addRole = async (title, salary, department_id) => {
  let query =
    "INSERT INTO roles (title, salary, departments_id) VALUES (?,?,?);";
  let params = [title, salary, department_id];
  db.query(query, params, (err, results) => {
    if (err) {
      return console.log(err);
    }
    console.table(results);
    console.log(
      `Title: ${title} \nSalary: ${salary} \nDepartment: ${department_id} \nRole added successfully`
    );
  });
};

const addEmployee = async (first, last, role_id, manager_id) => {
  if (manager_id) {
    let query =
      "INSERT INTO employees (first_name,last_name,roles_id,manager_id) VALUES (?,?,?,?);";
    let params = [first, last, role_id, manager_id];
    db.query(query, params, (err, results) => {
      if (err) {
        return console.log(err);
      }
      console.table(results);
      console.log(
        `Name: ${
          (first, " ", last)
        }\nRole: ${role_id}\nManager ID:${manager_id}\nEmployee added successfully`
      );
    });
  } else {
    let query =
      "INSERT INTO employees (first_name,last_name,roles_id) VALUES (?,?,?);";
    let params = [first, last, role_id];
    db.query(query, params, (err, results) => {
      if (err) {
        return console.log(err);
      }
      console.table(results);
      console.log(
        `Name: ${
          first + " " + last
        }\nRole: ${role_id}\nEmployee added successfully`
      );
    });
  }
};

const updateEmployeeRole = async (newRole, employee) => {
  let query = "UPDATE employees SET roles_id = ? WHERE employees_id = ?;";
  let params = [newRole, employee];
  db.query(query, params, (err, results) => {
    if (err) {
      return console.log(err);
    }
    console.table(
      `Employee ID: ${employee}\nNew Role: ${newRole}\nEmployee role updated succesfully!`
    );
  });
};

const getDepartments = async () => {
  let query = "SELECT * FROM departments;";
  let deptArr = [];
  const [rows] = await db.promise().query(query);
  // map over departments_id and name for use by inquirer, which only takes a name:value pair
  deptArr = rows.map((dept) => ({
    value: dept.departments_id,
    name: dept.name,
  }));
  return deptArr;
};
const getRoles = async () => {
  let query = "SELECT * FROM roles;";
  const [rows] = await db.promise().query(query);
    // map over roles_id and title for use by inquirer, which only takes a name:value pair
  let roleArr = rows.map((role) => ({
    value: role.roles_id,
    name: role.title,
  }));
  return roleArr;
};
const getEmployees = async () => {
  let query = "SELECT employees_id, CONCAT(IFNULL(first_name,'No'), ' ', IFNULL(last_name,'Manager')) AS 'Manager' FROM employees;";
  const [rows] = await db.promise().query(query);
    // map over employees_id and Manager for use by inquirer, which only takes a name:value pair
  let empArr = rows.map((employee) => ({
    value: employee.employees_id,
    name: employee.Manager,
  }));
  console.log(empArr)
  return empArr;
};

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  getDepartments,
  getRoles,
  getEmployees,
};
