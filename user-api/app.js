const http = require('http');

// sample user data 

let users= [
    { id:1,  name: 'John', age: 25 },
    {  id:2,  name: 'Jane', age: 30 },
    {  id:3,  name: 'Bob', age: 35 }
]

const server = http.createServer((req, res) =>{
    const { method, url} = req;
    
    if(method === 'GET' && url === './users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users))
    }

    else if(method === 'POST' && url === './users'){
        let body = '';

        req
    }
    
})