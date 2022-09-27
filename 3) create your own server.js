//server creation

const http = require('http')
const fs = require('fs') //module for reading the file
const _ = require('lodash');

const  server=http.createServer((req,res)=>{
    console.log('request has been made from browser to server');
    console.log(req.method);// which request, GET, POST, PATCH,delete
    console.log(req.url);// url in the browser
    
    //response object is used to give response from server to browser

    // res.setHeader("Content-Type",'text/html') //to tell browser what we're sending ex- text/plain
    // res.write(`<h1>Hello,Pepcoders! :)</h1>`)//data which is to be sent
    // res.write(`<h3>How is everyone doing? :)</h3>`)//data which is to be sent
    // res.end()//telling browser that response is over


    //to send the html file
    // fs.readFile('./views/index.html',(err,fileData)=>{
    //  if(err){
    //      console.log(err);
    //  }
    //  else{
    //      res.write(fileData);
    //      res.end();

    //      //When we are sending only one response then we can also use
    //     //  res.end(fileData);
    //  }
    // })

    //Routing of the html pages
    let path='./views';
    switch(req.url){
        case '/':
            path += '/index.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='/about.html'
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301; //If something is permanently moved than it's status code is 301
            res.setHeader('Location','/about');//If somebody types /about-me in the url then redirect  it to /about page
            res.end();
            break;
        default:
            path+='/404.html'
            res.statusCode = 404;
            break;

    }
    fs.readFile(path, (err, fileData) => {
        if (err) {
            console.log(err);
        }
        else {
            res.write(fileData);
            res.end();

            //When we are sending only one response then we can also use
            //  res.end(fileData);
        }
    })

    //lodash implementation
    let num=_.random(0,20); //printing random numbers between 0 to 20
    console.log(num); 

    let greet= _.once(()=>{  //Even though the function is called twice but will be invoked only once coz of 'once' function of lodash
        console.log('hello');
    });
    greet();
    greet();

})

server.listen(3000,'localhost',()=>{
    console.log('server is listening on port 3000');
})//port number, host, callback func
//By default host is localhost


