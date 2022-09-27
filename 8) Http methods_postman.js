// const express = require('express');

// const app=express();

// //app.use middleware func hai jo 'post' ki request mey use hota hai,to convert the data coming from frontend into  JSON format.
//without it post request won't work 
// app.use(express.json());


// let users={};

// app.get('/users',(req,res)=>{
//     res.send(users);
// })

// //'post' request is used to send the data from frontend to server 
// app.post('/users',(req,res)=>{
//     console.log(req.body);//data frontend sey req ki body mey aayga
//     users=req.body;
//     //res.send and res.json are almost same only difference is in the latter we are sending res in json format
//     res.json({
//         message:"data received successfully",
//         user:req.body
//     })
// })

// //update
// app.patch('/user',(req,res)=>{
//     console.log('req body-> ',req.body);
    
//     //update data in users obj
//     let dataToBeUpdated=req.body;
//     for (key in dataToBeUpdated){
//        users[key]=dataToBeUpdated[key];
//     }
//     users = {...users, ...req.body} // can also update using destructuring
//     res.json({
//         message:"data updated successfully"
//     })
// });

// //To delete a data
// app.delete('/user',(req,res)=>{
//     users={};
//     res.json({
//         message:"data has been deleted"
//     });
// });

// app.listen(3000);

const express = require('express')

const app = express()
app.use(express.json());

let users = {}

app.get('/users', (req,res) =>{
   res.send(users)
})

app.post('/users', (req,res)=>{
    console.log(req.body);
    users= req.body
    res.json({
        message:"data received successfully",
        user:req.body
    });
})

app.patch('/users', (req,res)=>{
    console.log('req.boydy ->', req.body);
    users = {...users, ...req.body}
    res.json({
        message:"data updated successfully"
    })
})

app.delete('/users', (req,res)=>{
    users={};
    res.json({
        message:"data has been delted successfullu"
    })
})

app.listen(3000)