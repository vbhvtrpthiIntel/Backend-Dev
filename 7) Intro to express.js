const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send('<h1>Hello world</h1>');
    
    // res.sendFile('C:/Users/vaibhav.c.tripathi/Desktop/Pepcoding/Backend/views/index.html');

});


app.get('/about',(req,res)=>{
    // res.send('<h1>about</h1>');

    //To send the HTML file
    res.sendFile('./views/about.html',{root:__dirname})
})

//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

//404 page
app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{root:__dirname})
})



app.listen(3000);