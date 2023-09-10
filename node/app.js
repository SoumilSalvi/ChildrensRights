const express = require("express");
const app = express();
const mongoose= require("mongoose");
app.use(express.json());
const cors= require("cors");
app.use(cors());
const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");
const JWT_SECRET= " bbbs722(bs)qy288y%g87";


const mongoUrl=
    "mongodb+srv://salvisoumil:Mongo123@cluster0.3l7ljjr.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
})
.then(() =>{
    console.log("connected to database");
})
.catch((e)=>console.log(e));

require("./userDetails");

const User = mongoose.model("UserInfo");

app.post("/register", async(req,res)=>{
    const { fname, lname , email, password }= req.body;

    const encryptedPassword=await bcrypt.hash(password,10);
    try {
        const oldUser=await User.findOne({email});

        if(oldUser){
            return res.json({error: "User Exists"});
        }
        await User.create({
            fname,
            lname,
            email,
            password:encryptedPassword,
        });
        res.send({status:"ok"});    
    } catch (error) {
        res.send({Status:"error"});       
    }
});

app.post("/login-user",async(req,res)=> {
    const { email, password }= req.body;

    const user=await User.findOne({email});
    if(!user){
        return res.json({error: "User Not Found"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({}, JWT_SECRET);

        if (res.status(201)){
            return res.json({status:"ok", data: token});
        }else{
            return res.json({error:"error"});
        }
    }
    res.json({status:"error", error:"Invalid Password"});
});

app.listen(5000,()=>{
    console.log("server started");
})



