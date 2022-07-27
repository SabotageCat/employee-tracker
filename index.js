const inquirer = require('inquirer');

const menuOptions = [
    {
        type: 'list',
        name: 'menuOptions',
        message: 'Select an option',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
];

const addDepartment = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the department name',
        validate: answer => {
            if (!answer) {
                console.log('You must enter a name!');
                return false
            }
            return true
        }
    }
];

const addRole =[
    {
        type: 'input',
        name: 'title',
        message: 'Enter the role title',
        validate: answer => {
            if (!answer) {
                console.log('You must enter the role title!');
                return false
            }
            return true
        }
    },
    {
        type: 'number',
        name: 'salary',
        message: "Enter this role's salary",
        validate: answer => {
            if (!answer) {
                console.log('You must enter a salary!');
                return false
            }
            return true
        }
    },
    {
        type: 'number',
        name: 'department_id',
        message: "Enter this role's department ID",
        validate: answer => {
            if (!answer) {
                console.log("You must enter this role's deparment ID!");
                return false
            }
            return true
        }
    }
];

const addEmployee = [
    {
        type: 'input',
        name: 'first_name',
        message: "Enter ths employee's name",
        validate: answer => {
            if (!answer) {
                console.log("You must enter the employee's first name!");
                return false
            }
            return true
        }
    },
    {
        input: 'input',
        name: 'last_name',
        message: "Enter this employee's last name",
        validate: answer => {
            if (!answer) {
                console.log("You must enter this employee's last name!");
                return false
            }
            return true
        }
    },
    {
        input: 'number',
        name: 'role_id',
        message: "Enter this employee's role ID",
        validate: answer => {
            if (!answer) {
                console.log("You must enter this employee's role ID!");
                return false
            }
            return true
        }
    },
    {
        input: 'number',
        name: 'manager_id',
        message: "Enter the manager ID for this employee"
    }
];

const editEmployee = [
    {
        type: 'number',
        name: 'id',
        message: 'Enter the employee ID number',
        validate: answer => {
            if (!answer) {
                console.log('You must enter an employee ID number!');
                return false;
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'first_name',
        message: "Enter ths employee's name",
        validate: answer => {
            if (!answer) {
                console.log("You must enter the employee's first name!");
                return false
            }
            return true
        }
    },
    {
        input: 'input',
        name: 'last_name',
        message: "Enter this employee's last name",
        validate: answer => {
            if (!answer) {
                console.log("You must enter this employee's last name!");
                return false
            }
            return true
        }
    },
    {
        input: 'number',
        name: 'role_id',
        message: "Enter this employee's role ID",
        validate: answer => {
            if (!answer) {
                console.log("You must enter this employee's role ID!");
                return false
            }
            return true
        }
    },
    {
        input: 'number',
        name: 'manager_id',
        message: "Enter the manager ID for this employee"
    }
];

const promptUser = () => {
    return inquirer.prompt(menuOptions)
    .then(choice => {
        console.log(choice.menuOptions);
        
        if(choice.menuOptions === 'View all departments') {
            return viewAll('departments');
        } else if (choice.menuOptions === 'View all roles') {
            return viewAll('roles');
        } else if (choice.menuOptions === 'View all employees') {
            return viewAll('employees');
        } else if (choice.menuOptions === 'Add a department') {
            return addToTable('departments');
        } else if (choice.menuOptions === 'Add a role') {
            return addToTable('roles');
        } else if (choice.menuOptions === 'Add an employee') {
            return addToTable('employees');
        } else if (choice.menuOptions === 'Update an employee role') {
            return updateEmployee();
        }
    })
};

const viewAll = option => {
    console.log(option);

    return fetch(`/api/${option}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};

const addToTable = option => {
    console.log(option);

    if (option === 'departments') {
        return inquirer.prompt(addDepartment)
        .then(postData => {
            console.log(postData);
            fetch(`/api/${option}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify
            });
        })
        .catch(err => console.log(err))
    } else if (option === 'roles') {
        return inquirer.prompt(addRole)
        .then(postData => {
            console.log(postData);

            fetch(`/api/${option}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify
            });
        })
        .catch(err => console.log(err))
    } else if (option === 'employees') {
        return inquirer.prompt(addEmployee)
        .then(postData => {
            console.log(postData);

            fetch(`/api/${option}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });
        })
        .catch(err => console.log(err))
    }
};

const updateEmployee = () => {
    return inquirer.prompt(editEmployee)
    .then(data => {
        console.log(data, data.id);

        fetch(`/api/employees/${data.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
    })
    .catch(err => console.log(err))
}

promptUser()
.then(data => {
    console.log(data);
})
.catch(err => {
    console.log(err);
})