const express = require('express');
const app = express();
const mongoose = require('mongoose')
const emailValidator = require("email-validator")// 3rd party library to validate email
const bcrypt = require('bcrypt'); //3rd aprty libray for generating hashed

app.use(express.json());
const authRouter = express.Router();

app.use('/auth',authRouter) //agar route /auth match krega tho use "authRouter"

authRouter
.route('/signup')
.post(postSignUp)

const db_link = 'mongodb+srv://admin:zaZ5YMFQMC4Cya0P@cluster0.krg2dqx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
    console.log(db);
    console.log('db connected');
}).catch(function(err){
    console.log(err);
})

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true, // so that every user has a unique mail id,
        // for validating email id, if not checkd user can enter unique string and it will work
        validate:function(){
            return emailValidator.validate(this.email)
        }
    },

    password:{
        type:String,
        requiredL:true,
        minLength:8 //password min length will be 8
    },

    confirmPassword:{
        type:String,
        required:true,
        minLength:8,
        //valid pwd and cnfrm pwd are same or not
        validate:function(){
            return this.password == this.confirmPassword
           }
    }
});

//Before save event occurs in DB
userSchema.pre('save', function(){
    // console.log('before saving in db', this);
}
)

//As confirm password is a redundant data, so no need to store it in db
userSchema.pre('save', function(){
    this.confirmPassword = undefined; // if you do undefined, then it doesn't gets stored in db
}
)

//we want pwd to be hashed before saving in DB, so we'll use pre hook
userSchema.pre('save', async function(){
    let salt = await bcrypt.genSalt(); //generating salt
    let hashedString = await bcrypt.hash(this.password, salt);//doing the encryption
    // console.log(hashedString);
    this.password = hashedString
}
)


//post fn will be fired after saving in DB, doc will print whatever was stored in DB
//After save event occurs in DB
userSchema.post('save', function(doc){
    // console.log('After saving in db', doc);
}
)

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

app.listen(3001);