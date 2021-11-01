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
  getManagers
} = require("./helpers/dbUtils");
// questions to be used
const questions = {
  user: "What would you like to do?",
  firstName: "What is the employee's first name?",
  lastName: "What is the employee's last name?",
  empRole: "What is the employee's role?",
  salary: "What is the role's salary?",
  updateRole: "What is the employees new role?",
  deptName: "What is the new department name?",
  roleName: "What is the new role name?",
  department: "Which department will be assigned?",
  manager: "Who is the employee's manager?"
};

// function to check user choice from main menu and kicks off the next prompt
const menuSelectCheck = (menuItem) => {
  switch (menuItem) {
    case "View all departments":
      viewDepartments();
      break;
    case "View all roles":
      viewRoles();
      break;
    case "View all employees":
      viewEmployees();
      break;
    case "Add a department":
      addDeptMenu(); //need inquirer prompt to ask for department name
      break;
    case "Add a role":
      addRoleMenu(); //need inquirer prmopt to ask for role info
      break;
    case "Add an employee":
      addEmpMenu(); //need inquirer prmopt to ask for employee info
      break;
    case "Update an employee role": //need inquirer prmopt asking for new employee role
      break;
    case "Exit":
      process.exit(0);
    default:
      "Something wrong in switch statement";
  }
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
        "Exit",
      ],
    },
  ]);
  //running a check to see what the user selection was and run other function if needed
  menuSelectCheck(userChoice);
};

// menu prompt for adding a department
const addDeptMenu = async () => {
  const { deptName } = await inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: questions.deptName,
    },
  ]);
  addDepartment(deptName);
};

// menu prompt for adding role
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
      choices: await getDepartments()
    },
  ]);
  parseInt(dept);
  addRole(roleName, roleSalary, dept);
};

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
          type: "input",
          name: "empRole",
          message: questions.empRole,
        },
        {
            type: "input",
            name: "manager",
            message: questions.manager,
        },
      ]);
      addEmployee(firstName, lastName, empRole, manager);
};

const updateEmpRole = async () => {};

// function to initialize app
const init = () => {
  mainMenu();
  // promptUser()
  // console.log('before view dep');
  // viewDepartments();
  // viewRoles();
  // viewEmployees();
  //  addDepartment('Devil Hunters');
  //  addRole('Devil Hunters', 69000.69, 5);
  // addEmployee('Denji', 'Man', 10);
  // updateEmployeeRole(7,14);
  // console.log('after view dep in init');
  // return process.exit();
};

// Function call to initialize app
init();
// process.exit(0);
// viewDepartments();
