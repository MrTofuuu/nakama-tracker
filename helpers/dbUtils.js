const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: '',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
);

const viewDepartments = () => {
    const query = 'SELECT * FROM departments';
    
};

const viewRoles = () => {
    const query = 'SELECT * FROM roles';
};

const viewEmployees = () => {
    const query = 'SELECT * FROM employees';
};

const addDepartment = () => {
    const query = 'INSERT INTO departments (name) VALUES (?)';
};

const addRole = () => {
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)';
};

const addEmployee = () => {
    const query = 'INSERT INTO employees (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)';
};

const updateEmployeerole = () => {
    const query = 'UPDATE employees SET role_id = ? WHERE id = ?';
};


module.exports={viewDepartments,viewRoles,viewEmployees,addDepartment,addRole,addEmployee,updateEmployee};