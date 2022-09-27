const express = require('express');

const app = express();

let users = [
    {
        'id':1,
        'name':'ABhishek'
    },
    {
        'id':2,
        'name':'Jasbir'
    },
    {
        'id':3,
        'name':'kartik'
    },
];

//params
app.get('/users/:username',(req,res)=>{
  
    
    console.log(req.params);
    res.send("user name received");
})//url:- 'localhost:3000/users/VaibhavTriapthi', O/p- { username: 'vaibhavtripathi' }

//Queries
app.get('/users',(req,res)=>{
    console.log("Query example",req.query);
    res.send(users);
})//url:- localhost:3000/users/?VaibhavTripathi=21&age=80, O/P- Query example { VaibhavTripathi: '21', age: '80'} 

app.listen(3000);