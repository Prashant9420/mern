const mongoose=require('mongoose');
const db=process.env.DB_URL;

mongoose.connect(db).then(()=>{
    console.log("connection sucessfull");
}).catch((err)=>{alert("Cannot connect to the database");console.log("no Connection")})