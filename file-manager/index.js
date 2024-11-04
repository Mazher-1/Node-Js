const fs = require('fs')
const path = require('path')

const  dirPath = path.join(__dirname, 'files')

function createFile(fileName, content){
    fs.writeFileSync(path.join(dirPath, fileName), content, (err) => {
        if (err) throw err;
        console.log('File created successfully');
    })
}

function readFile(fileName){
    fs.writeFileSync(path.join(dirPath, fileName),"utf-8", (err, data) => {
        if(err) throw err;
        console.log(`File Content:\n${data}`);
    })
}
function updateFile(fileName , newContent){
    fs.appendFile(path.join(dirPath, fileName) , newContent , (err) => {
        if(err) throw err;
        console.log('File updated successfully');
    })
}

function deleteFile(fileName){
    fs.unlink(path.join(dirPath, fileName), (err) =>{
        if (err) throw err;
        console.log('File deleted successfully');
    })
}

function listFiles(){
    fs.readdir( dirPath,  (err, files) => {
        if (err) throw err;
        console.log('Files in directory:', files);
    })


}


createFile('test.txt', 'Hello, this is the initial content');
readFile('test.txt');
updateFile('test.txt', '\nThis is some additional content');
deleteFile('test.txt');
listFiles();