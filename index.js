//importing packages
const inquirer = require('inquirer');
const fs = require('fs');
const {viewDepartments,viewRoles,viewEmployees,addDepartment,addRole,addEmployee,updateEmployeeRole} = require('./helpers/dbUtils')
// questions to be used
const questions = {
    user:'What would you like to do?',
    first_name:'What is the employee\'s first name?',
    last_name:'What is the employee\'s last name?',
    role:'What is the employee\'s role?',
    salary:'What is the employee\'s salary?',
    updateRole:'What is the employee\s new role?'
};

const promptUser = ()=>{
    return inquirer.prompt([
        {
            type:'list',
            name:'userChoice',
            message: questions.user,
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role']
        },{
            type:'input',
            name:'first_name',
            message:questions.first_name
        },{
            type:'input',
            name:'last_name',
            message:questions.last_name
        },{
            type:'input',
            name:'role',
            message:questions.role
        },{
            type:'input',
            name:'salary',
            message:questions.salary
        }

])
};

const init = ()=>{
    promptUser()
};

// Function call to initialize app
init();