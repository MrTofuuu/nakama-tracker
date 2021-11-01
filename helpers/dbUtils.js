const mysql = require("mysql2");
const cTable = require("console.table");
require("dotenv").config();
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

const viewDepartments = async () => {
  let query = "SELECT * FROM departments;";
  // console.log('prior to db query in view dept');
  db.query(query, (err, results) => {
    // console.log('in db.query');
    if (err) {
      return console.log(err);
    }
    // console.log('inside view dept');
    return console.table(results);
  });
};

const viewRoles = async () => {
  let query =
    "SELECT d.name as 'Department Name', r.roles_id, r.title, r.salary FROM roles r JOIN departments d ON r.departments_id = d.departments_id;";
  db.query(query, (err, results) => {
    if (err) {
      return "error in viewRoles query";
    }
    console.table(results);
  });
};

const viewEmployees = async () => {
  let query =
    "SELECT  e.employees_id AS 'Employee ID', e.first_name AS 'First Name', e.last_name AS 'Last Name',r.title AS 'Job Title',  d.name AS 'Department', r.salary AS 'Salary',CONCAT(IFNULL(m.first_name,'No'), ' ', IFNULL(m.last_name,'Manager')) AS 'Manager' FROM employees as e INNER JOIN roles as r ON e.roles_id = r.roles_id INNER JOIN departments as d ON r.departments_id = d.departments_id LEFT JOIN employees as m on e.manager_id = m.employees_id;";
  db.query(query, (err, results) => {
    if (err) {
      return console.log(err);
    }
    return console.table(results);
  });
};

const addDepartment = async (dept) => {
  let query = "INSERT INTO departments (name) VALUES (?);";
  let params = [dept];
  db.query(query, params, (err, results) => {
    if (err) {
      return console.log(err);
    }

    console.log(`${dept} Department added successfully`);
  });
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
    console.table(`Employee ID: ${employee}\nNew Role: ${newRole}\nEmployee role updated succesfully!`);
  });
};
const getDepartments =  () =>{
  let query = "SELECT * FROM departments;";
  db.query(query, async(err, results) => {
    if (err) {
      return console.log(err);
    }
    // results is an array of objects {departments_id: id , name: name of departments} 
    let deptArr = await results.map(dept=>({
      value:dept.departments_id,
      name:dept.name
    }));
    console.log("inside getDepts");
    console.log(deptArr);
    return deptArr;
  });
}
const getRoles = async () =>{

}
const getManagers = async () =>{

}
// getDepartments();

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
  getManagers
};
