const http = require('http')
const fs = require('fs')
const path = require('path');

const server =  http.createServer((req, res) => {
    let filePath = path.join(__dirname , 'pages' , 'index.html')
    let contentType =  'text/html';
    let statusCode =  200;

    if(req.url === '/'){
        filePath = path.join(__dirname ,'pages' ,'about.html')
    }
    else if(req.url === '/about'){
        filePath = path.join(__dirname ,'pages' ,'contact.html')
    }
    else {
        // 404 Page
        filePath = path.join(__dirname, 'pages', '404.html');
        statusCode = 404;
    }

    fs.readFile(filePath, (err,content) => {
        if(err){
            console.error(`Error reading file: ${err}`);
            res.writeHead(500)
            res.end('Error reading file')
        }
        else{
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content)
        }
    });

});


server.listen(3000,() => {
    console.log('Server is hosting')
})


