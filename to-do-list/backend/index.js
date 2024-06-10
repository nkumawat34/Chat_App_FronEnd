const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
//const userModel=require("./Models/Todo")
const UserModel = require("./Models/Todo")
const app=express()
app.use(cors())
app.use(express.json())


mongoose.connect('mongodb+srv://nkumawat34:nkumawat34@cluster0.6msxxm4.mongodb.net/Registeration')

app.post('/add', async (req, res) => {
    const { username, Password } = req.body; // Destructure password instead of Password
    console.log(typeof(Password))
    const user=UserModel.create({
        username: username,
        password: Password
    })
    
    
});


app.get("/get",(req,res)=>{
    const user =UserModel.find(req.body.username);
    console.log(user)
    
})
app.get("/hello",(req,res)=>{

    return res.json("hi")
})
app.listen(3001,()=>{
    console.log("Server is running")
})