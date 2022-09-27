const express = require('express');
const app = express();

const mongoose = require('mongoose')

//connecting Databasr
const db_link = 'mongodb+srv://admin:zaZ5YMFQMC4Cya0P@cluster0.krg2dqx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('db connected');
}).catch(function(err){
    console.log(err);
})

//Creating Schema
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true // so that every user has a unique mail id
    },

    password:{
        type:String,
        requiredL:true,
        minLength:8 //password min length will be 8
    },

    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }
})

//Creating a model
const userModel = mongoose.model('userModel', userSchema);

(async function createUser(){
    let user = {
        name:'Vaibhav',
        email:'abcn@gmail.com',
        password:'12345678',
        confirmPassword:'12345678'
    };

    let data = await userModel.create(user);
    console.log(data);

})()