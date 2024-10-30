const express = require('express')
const app = express()


app.get('/', (req,res) =>{
    res.send('Welcome to Homepage')
});

app.get('/about', (req , res) =>{
    res.send("Welcome to About Page")
});


const PORT = 3000;

app.listen(PORT, () =>{
    console.log(`Server running: ${PORT}`)
})