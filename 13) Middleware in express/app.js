const express = require('express');

const app = express();


app.use(express.json()); //global middleware

//mini app;
const authRouter = express.Router();

//base route ,router to use
app.use('/auth',authRouter) //agar route /auth match krega tho use "authRouter"

authRouter
.route('/signup')
// .get(middleware, getSignUp) //showing next() function 
.get(middleware1, getSignUp, middleware2) //middleware can also end request response cycle
.post(postSignUp)

// function middleware(req, res, next){
//     console.log('middleware encountered');
//     next(); //after middleware getSignup function gets called
// }

function middleware1(req, res, next){
    console.log('middleware1 encountered');
    next(); //after middleware1 getSignup function gets called
}

function middleware2(req, res){
    console.log('middleware2 encountered');

    console.log("middleware 2 ended req/res cycle")
    res.sendFile('./public/index.html', {root:__dirname})
}


function getSignUp(req, res, next){
    console.log("getSignUp called");
    next();
    // res.sendFile('./public/index.html', {root:__dirname});
}

function postSignUp(req,res){
    console.log("lkal");
    let obj = req.body;
    console.log('backend', obj);
    res.json({
        message:"user signed up",
        data:obj
    })
}

app.listen(3001);