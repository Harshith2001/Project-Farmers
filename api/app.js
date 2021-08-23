var express= require('express');
const app = express();

// This app has different methods such as get, post, put, delete.

// Testing with arrays before going to integrate them with database.
const profiles= [
    {firstName:"Harshith",
     lastName:"Nimmagadda",
     email:"harshith1450@gmail.com",
     mobile:"7207737050",
     city:"Rajahmundry"
    },
    {firstName:"Priyanka",
     lastName:"Nimmagadda",
     email:"Priyanka141297@gmail.com",
     mobile:"8179228558",
     city:"Rajahmundry"
    },
];    
// To display all the contents in the array
app.get('/api/profiles',(req,res)=>{
    res.send(profiles);
});
// route for get api is /api/profile/id
app.get('/api/profiles/:id',(req,res)=>{
    a= profiles.find(c => c.firstName===req.params.id);
    res.send(a);
    console.log(req.query);
    console.log(typeof(req.params.id));
});
//Port
const port=process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}`));