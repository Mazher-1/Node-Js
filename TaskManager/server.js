const http = require('http');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const taskEmitter = new EventEmitter();

function readTasks(callback) {
    fs.readFile(path.join(__dirname, 'tasks.json'), 'utf8', (err, data) => {
        if (err) return callback(err);
        const tasks = data ? JSON.parse(data) : [];
        callback(null, tasks);
    });
}

function writeTasks(tasks, callback) {
    fs.writeFile(path.join(__dirname, 'tasks.json'), JSON.stringify(tasks, null, 2), callback);
}

const server = http.createServer((req, res) => {
    const { url, method } = req;
    console.log(`Received request: ${method} ${url}`); // Log incoming requests

    if (url === '/add-task' && method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        
        req.on('end', () => {
            try {
                const { task } = JSON.parse(body);
                console.log(`Task received: ${task}`); // Log task data

                readTasks((err, tasks) => {
                    if (err) {
                        res.writeHead(500);
                        res.end('Error reading tasks');
                        return;
                    }

                    tasks.push({ task, completed: false });
                    
                    writeTasks(tasks, err => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Error saving task');
                            return;
                        }

                        taskEmitter.emit('taskAdded', task);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ message: 'Task added' }));
                    });
                });
            } catch (parseError) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
    }
});

taskEmitter.on('taskAdded', (task) => {
    console.log(`New task added: ${task}`);
});

server.listen(5173, () => {
    console.log('Server running on http://localhost:5173');
});
