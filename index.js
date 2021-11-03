//importing packages
const inquirer = require("inquirer");
const {
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
} = require("./helpers/dbUtils");
let deptChoice = [];
// questions to be used
const questions = {
  user: "What would you like to do?",
  firstName: "What is the employee's first name?",
  lastName: "What is the employee's last name?",
  empRole: "What is the employee's role?",
  salary: "What is the role's salary?",
  updateEmployee: "Which employee did you want to change the role of?",
  updateRole: "What is the employees new role?",
  updateManager:"Who is the employee's new manager?",
  deptName: "What is the new department name?",
  roleName: "What is the new role name?",
  department: "Which department will be assigned?",
  hasManager: "Does the employee have a manager?",
  manager: "Who is the employee's manager?",
};

// Switch case for menu 
const menuSelectCheck = async (menuItem) => {
  let rows;
  switch (menuItem) {
    case "View all departments":
      rows = await viewDepartments();
      console.table(rows);
      break;
    case "View all roles":
      rows = await viewRoles();
      console.table(rows);
      break;
    case "View all employees":
      rows = await viewEmployees();
      console.table(rows);
      break;
    case "Add a department":
      await addDeptMenu();
      break;
    case "Add a role":
      await addRoleMenu(); 
      break;
    case "Add an employee":
      await addEmpMenu(); 
      break;
    case "Update an employee role": 
      await updateEmpRoleMenu();
      break;
      case "Update employee manager": 
      await updateEmpMgrMenu();
      break;
    case "Exit":
      process.exit(0);
    default:
      "Something wrong in switch statement";
  }
  console.log("\n");
  mainMenu();
};
// function to prompt user on what they would like to do
const mainMenu = async () => {
  
  const { userChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "userChoice",
      message: questions.user,
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Update employee manager",
        "Exit",
      ],
    },
  ]);
  //running a check to see what the user selection was and run other function if needed
  menuSelectCheck(userChoice);
};

// add department menu
const addDeptMenu = async () => {
  const { deptName } = await inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: questions.deptName,
    },
  ]);
  //function to add department
  return  console.log(`\n${await addDepartment(deptName)}`);
};

// add role menu
const addRoleMenu = async () => {
  const { roleName, roleSalary, dept } = await inquirer.prompt([
    {
      type: "input",
      name: "roleName",
      message: questions.roleName,
    },
    {
      type: "input",
      name: "roleSalary",
      message: questions.salary,
    },
    {
      type: "list",
      name: "dept",
      message: questions.department,
      choices: await getDepartments(),
    },
  ]);
  // function to add role
  return console.log(`${await addRole(roleName, roleSalary, dept)}`);
};
// add employee menu 
const addEmpMenu = async () => {
  const { firstName, lastName, empRole, manager } = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: questions.firstName,
    },
    {
      type: "input",
      name: "lastName",
      message: questions.lastName,
    },
    {
      type: "list",
      name: "empRole",
      message: questions.empRole,
      choices: await getRoles(),
    },
    {
      type: "confirm",
      name: "hasManager",
      message: questions.hasManager,
    },
    {
      type: "list",
      name: "manager",
      message: questions.manager,
      choices: await getEmployees(),
      when: (answers) => answers.hasManager,
    },
  ]);
  return  console.log(`${ addEmployee(firstName, lastName, empRole, manager)}`);
};
// update employee menu 
const updateEmpRoleMenu = async () => {
  const { employee, roleName } = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: questions.updateEmployee,
      choices: await getEmployees(),
    },
    {
      type: "list",
      name: "roleName",
      message: questions.updateRole,
      choices: await getRoles(),
    },
  ]);
  // function to update employee role
  return (`\n${await updateEmployeeRole(roleName, employee)}`);
};

// update employee manager menu 
const updateEmpMgrMenu = async () => {
  const { employee, newManager } = await inquirer.prompt([
    {
      type: "list",
      name: "employee",
      message: questions.updateEmployee,
      choices: await getEmployees(),
    },
    {
      type: "list",
      name: "newManager",
      message: questions.updateManager,
      choices: await getEmployees(),
    },
  ]);
  // function to update employee role
  return (`\n${await updateEmployeeManager(newManager, employee)}`);
};

// function to initialize app
const init = async () => {
   mainMenu();
};

// Function call to initialize app
init();

module.exports = mainMenu;
