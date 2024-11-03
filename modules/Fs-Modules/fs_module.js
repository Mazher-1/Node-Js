const aditioncontent = '\nThis is additional content.';
const fs = require('fs');



fs.appendFile('example.txt', aditioncontent , (err) =>{
    if(err){
        console.error('Error Occured in file: ', err)
        return;
    }
    console.log('Content appended successfully');
})


fs.appendFileSync('output-sync.txt', aditioncontent);
console.log('Sync content appended successfully');