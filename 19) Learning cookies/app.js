const express = require('express');

const app = express();
app.use(express.json());

const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')//3rd party library for cookies

app.use(cookieParser()) //will be using in middileware fn so that cookies can be accessed from anywhere(req,res)

//connecting Database
const db_link = 'mongodb+srv://admin:zaZ5YMFQMC4Cya0P@cluster0.krg2dqx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('db connected');
}).catch(function(err){
    console.log(err);
})

//mini app
const userRouter = express.Router();
const authRouter = express.Router();

//base route ,router to use
app.use('/user',userRouter) //agar route "/user" match krega tho use "useRouter"
app.use('/auth',authRouter) //agar route /auth match krega tho use "authRouter"

userRouter
.route('/') //final check whether the route provided is / or not, if true then proceed
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
 .route("/getCookies")
 .get(getCookies);

userRouter
 .route("/setCookies")
 .get(setCookies);

authRouter
.route('/signup')
.get(getSignUp)
.post(postSignUp)


//For fetching all the users from Database - Read operation
async function getUsers(req,res){
    console.log("afa");
    // let allUsers = await userModel.find(); //fetches all the document from userModel
    let allUsers = await userModel.findOne({name:'Vaibhav'}); //fetches the first document named Vaibhav from userModel
    res.json({
        message:'list of all users',
        data:allUsers
    })
}


function postUser (req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
        message: "data received successfully",
        user: req.body
    });
};

//update opn in mongodb when patch request is made.
async function updateUser(req, res) {
    console.log('req body-> ', req.body);

    let dataToBeUpdated = req.body;
    let user = await userModel.findOneAndUpdate({emai:'abc@gmail.com'}, dataToBeUpdated)
    res.json({
        message: "data updated successfully",
        data:user
    })
}

//Delete operation on the basis of mail id - Delete Operation
async function deleteUser(req, res){
    let dataToBeDeleted = req.body;
    // let user = await userModel.findOneAndDelete({email:'abcn@gmail.com'}); 
    let user = await userModel.findOneAndDelete(dataToBeDeleted); 
    res.json({
        message: "data has been deleted",
        data:user
    });
}

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


function getSignUp(req, res){
    res.sendFile('./public/index.html', {root:__dirname});
    console.log("Heya");
}

//create operation -> users sends the object -> Create opn in mongodb
async function postSignUp(req,res){
   let dataObj = req.body;
   let user = await userModel.create(dataObj);
    res.json({
        message:"user signed up",
        data:user
    })
}

//Creating a model
const userModel = mongoose.model('userModel', userSchema);

function setCookies(req,res){
//   res.setHeader('Set-Cookie', 'isLoggedIn = true'); //Sending cookies w/o using 3rd party library

//cookie from 3rd party library, 1st param cookie name, 2nd param cookie value
 //maxage for cookie expiration time, secure:true for website to be worked only in https, httpOnly:true -> now cookie can't be accessed from frontend using "document.cookie"
 res.cookie('isLoggedIn', true, {maxAge:1000 * 60 * 60 * 24, secure:true, httpOnly:true});

 //will be accessed from frontend - using "document.cookie" as we have not used httpOnly method
 res.cookie('isPrimeMember', true);
 res.send('cookies has been set');
}


function getCookies(req,res){
    let cookies = req.cookies;
    // let cookies = req.cookies.isLoggedIn;
    console.log(cookies);
    res.send('cookies received');
}

app.listen(3001);