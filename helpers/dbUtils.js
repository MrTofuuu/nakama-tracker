const mysql = require("mysql2");
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

const viewDepartments = () => {
  let query = "SELECT * FROM departments";
  db.query(query, (err, results) => {
    if (err) {
      return "error in viewDepartments query";
    }
    return results;
  });
};

const viewRoles = () => {
  let query = "SELECT * FROM roles";
  db.query(query, (err, results) => {
    if (err) {
      return "error in viewRoles query";
    }
    return results;
  });
};

const viewEmployees = () => {
  let query = "SELECT * FROM employees";
  db.query(query, (err, results) => {
    if (err) {
      return "error in viewEmployees query";
    }
    return results;
  });
};

const addDepartment = (dept) => {
  let query = "INSERT INTO departments (name) VALUES (?)";
  let params = [dept];
  db.query(query, params, (err, results) => {
    if (err) {
      return "error in addDepartment query";
    }
    return results;
  });
};

const addRole = (title, salary, deptartment_id) => {
  let query = "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)";
  db.query(query, params, (err, results) => {
    if (err) {
      return "error in addRole query";
    }
    return results;
  });
};

const addEmployee = (first, last, role_id, manager_id) => {
  let query = "INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)";
  db.query(query, params, (err, results) => {
    if (err) {
      return "error in addEmployee query";
    }
    return results;
  });
};

const updateEmployeeRole = (newRole, currentRole) => {
  let query = "UPDATE employees SET role_id = ? WHERE id = ?";
  db.query(query, params, (err, results) => {
    if (err) {
      return "error in updateEmployeeRole query";
    }
    return results;
  });
};

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
