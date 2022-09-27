const express = require('express');

const app = express();


app.use(express.json());


let users = [
    {
        'id': 1,
        'name': 'ABhishek'
    },
    {
        'id': 2,
        'name': 'Jasbir'
    },
    {
        'id': 3,
        'name': 'kartik'
    },
];

//mini app
const userRouter = express.Router();

//base route ,router to use
app.use('/user',userRouter) //agar route "/user" match krega tho use "useRouter"

userRouter
.route('/') //final check whether the route provided is / or not, if true then proceed
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id') //final check whether the route provided is /:id or not, if true then proceed.
.get(getUserById)

// app.get('/users/:id', )

function getUser(req,res){
    res.send(users)
}

function postUser (req, res) {
    console.log(req.body);
    users = req.body;
    res.json({
        message: "data received successfully",
        user: req.body
    });
};

function updateUser(req, res) {
    console.log('req body-> ', req.body);
    
    //update data in users obj
    let dataToBeUpdated = req.body;
    for (key in dataToBeUpdated) {
        users[key] = dataToBeUpdated[key];
    }
    res.json({
        message: "data updated successfully"
    })
}

function deleteUser(req, res){
    users = {};
    res.json({
        message: "data has been deleted"
    });
}

function getUserById(req, res) {
    console.log(req.params.id);
    let paramId=req.params.id;
    let obj={};
    for(let i=0;i<users.length;i++){
        if(users[i]['id']==paramId){
            obj=users[i];
        }
    }
    res.json({
       message:"req received",
       data:obj
    });
}
app.listen(3000);