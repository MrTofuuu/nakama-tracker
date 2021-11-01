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
} = require("./helpers/dbUtils");
// questions to be used
const questions = {
  user: "What would you like to do?",
  first_name: "What is the employee's first name?",
  last_name: "What is the employee's last name?",
  role: "What is the employee's role?",
  salary: "What is the employee's salary?",
  updateRole: "What is the employees new role?",
  deptName: "What is the department name?"
};

// function to check user choice from main menu and kicks off the next prompt 
const menuSelectCheck = (menuItem) => {
    switch(menuItem){
        case "View all departments": viewDepartments();
            break;
        case "View all roles": viewRoles();
            break;
        case "View all employees":viewEmployees();
            break;
        case "Add a department": addDeptMenu(); //need inquirer prompt to ask for department name
            break;
        case "Add a role": //need inquirer prmopt to ask for role info
            break;
        case "Add an employee": //need inquirer prmopt to ask for employee info
            break;
        case "Update an employee role": //need inquirer prmopt asking for new employee role
            break;
        case "Exit": process.exit(0);
        default:"Something wrong in switch statement";
      }
};
// function to prompt user on what they would like to do
const mainMenu = async () => {
  const {userChoice} = await inquirer.prompt([
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
        "Exit"
      ],
    },
  ]);
  //running a check to see what the user selection was and run other function if needed
  menuSelectCheck(userChoice);
};

// menu prompt for adding a department
const addDeptMenu = async () =>{
    const {deptName} = await inquirer.prompt([
        {
          type: "input",
          name: "deptName",
          message: questions.deptName
        },
      ]);
      addDepartment(deptName);
};

/* {
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
} */
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
