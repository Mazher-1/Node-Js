const fs = require('fs');
const readline = require('readline');

const tasksFilePath = 'tasks.json';
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let tasks = [];

// Load tasks from tasks.json
const loadTasks = () => {
    if (fs.existsSync(tasksFilePath)) {
        tasks = JSON.parse(fs.readFileSync(tasksFilePath, 'utf8'));
    }
};

// Save tasks to tasks.json
const saveTasks = () => {
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// List tasks
const listTasks = () => {
    console.log('Your tasks:');
    tasks.forEach((task, index) => console.log(`${index + 1}: ${task}`));
};

// Add a task
const addTask = (task) => {
    tasks.push(task);
    saveTasks();
    console.log(`Task added: "${task}"`);
};

// Delete a task
const deleteTask = (index) => {
    if (index < 1 || index > tasks.length) {
        console.log('Invalid task number.');
    } else {
        const removedTask = tasks.splice(index - 1, 1);
        saveTasks();
        console.log(`Task deleted: "${removedTask}"`);
    }
};

// Main menu
const main = () => {
    loadTasks();
    rl.question('What would you like to do? (add/list/delete/exit): ', (command) => {
        if (command === 'add') {
            rl.question('Enter the task: ', (task) => {
                addTask(task);
                main();
            });
        } else if (command === 'list') {
            listTasks();
            main();
        } else if (command === 'delete') {
            rl.question('Enter the task number to delete: ', (num) => {
                deleteTask(parseInt(num));
                main();
            });
        } else if (command === 'exit') {
            console.log('Goodbye!');
            rl.close();
        } else {
            console.log('Unknown command. Try again.');
            main();
        }
    });
};

main();
