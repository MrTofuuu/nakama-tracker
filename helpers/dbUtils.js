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
  try{
    const [rows]=await db.promise().query(query);
    return rows;
  } catch (error){
    console.log(`error in viewEmployees`); 
  }
    
};

const addDepartment = (dept) => {
  let query = "INSERT INTO departments (name) VALUES (?);";
  let params = [dept];
    try {
      db.query(query, params);
    } catch (error){
      console.log('error in addDepartment query');
      console.log(error);
    }
  return `${dept} Department added successfully`;
};

const addRole = async (title, salary, department_id) => {
  let query =
    "INSERT INTO roles (title, salary, departments_id) VALUES (?,?,?);";
  let params = [title, salary, department_id];
  // let output =
    try{db.query(query, params);
    } catch (error){
      console.log('error in addRole query');
      console.log(error);
    }
  return `Title: ${title} \nSalary: ${salary} \nDepartment: ${department_id} \nRole added successfully`;
  
};

const addEmployee = (first, last, role_id, manager_id) => {
  let output;
  if (manager_id) {
    let query =
      "INSERT INTO employees (first_name,last_name,roles_id,manager_id) VALUES (?,?,?,?);";
    let params = [first, last, role_id, manager_id];
    try{db.query(query, params, (err, results) => {
      if (err) {
        return console.log(err);
      }
      
      output = `Name: ${(first, " ", last)}\nRole: ${role_id}\nManager ID:${manager_id}\nEmployee added successfully`;
      
        return console.log(output);
    });} catch (error){
      console.log(`error in addEmployee with manager_id`);
      console.log(error);
    } finally {
      return`\nemployee added successfully`;
    }
  } else {
    let query =
      "INSERT INTO employees (first_name,last_name,roles_id) VALUES (?,?,?);";
    let params = [first, last, role_id];
    try{db.query(query, params, (err, results) => {
      if (err) {
        return console.log(err);
      }
     
      output = `Name: ${first + " " + last}\nRole: ${role_id}\nEmployee added successfully`;
      return console.log(output);
    });} catch (error){
      console.log(`error in addEmployee no manager_id`);
      console.log(error);
    } finally{
      return`\nemployee added successfully`;
    }
  }
  
};

const updateEmployeeRole = async (newRole, employee) => {
  let query = "UPDATE employees SET roles_id = ? WHERE employees_id = ?;";
  let params = [newRole, employee];
  db.query(query, params, (err, results) => {
    if (err) {
      console.log('error in update employee;')
      return console.log(err);
    }
  
  });

  return`Employee ID: ${employee}\nNew Role: ${newRole}\nEmployee role updated succesfully!`
};

const updateEmployeeManager = async (newManager,employee ) => {
  let query = "UPDATE employees SET manager_id = ? WHERE employees_id = ?;";
  let params = [newManager, employee];
  db.query(query, params, (err, results) => {
    if (err) {
      console.log('error in update employee maanger;')
      return console.log(err);
    }
  
  });

  return`Employee ID: ${employee}\nNew Manager: ${newManager}\nEmployee manager updated succesfully!`
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
  updateEmployeeManager
};
