const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
require("../DB/conn")
const User = require("../Model/userShema")
const jwt= require('jsonwebtoken');
const cookieParser =require("cookie-parser");
router.use(cookieParser()); 


router.post('/register',async (req,res)=>{
    const {name, email, username, password, cpassword} = req.body;
    if( !name || !email || !username|| !password || !cpassword){
        return res.status(422).json({error:"Error fill please"})
    }
    try{      
     const userExist = await User.findOne({email : email})
     const userNameExist = await User.findOne({username : username})
     if(userExist){
        return res.status(422).json({error:"Email already exist"})
      }else if(userNameExist){
        return res.status(422).json({error:"Username already exists"})
      }
      else if (password != cpassword){
        return res.status(422).json({error:"Password do not match"})
      }else{
        const user = new User ({name, email, username, password, followers: [], following:[],bookmark: [] ,profilepicimage: "http://res.cloudinary.com/filtersocial/image/upload/v1659176524/accok1wqhgjnscbrfdkc.png", Bio:"", Location:""});
        await user.save();
        res.status(210).json({message: "Registration Success"})
      }
    }catch(err){
        console.log(err);
    } })


router.post('/login',async (req,res)=>{
  router.use(cookieParser())
    try{    
        const { email,password} = req.body;
        if(  !email  || !password ){
            return res.status(400).json({error:"Error fill please"})
        }
     const userLogin = await User.findOne({email : email})
   if(userLogin){
    const isMatch = await bcrypt.compare(password, userLogin.password)
    if(isMatch){
   
      token = await userLogin.genrateAuthToken();
      res.cookie("jwtoken",token,{
        expires:new Date(Date.now() + 25892000000),
        httpOnly:true 
      })
    
      return res.json({message:"Login success", token}) 
     }else{  
       return res.status(400).json({error:"Invalid Credencials password"})
     }
   }else{
    return res.status(400).json({error:"Invalid Credencials email"})
   }
    }catch(err ){
        console.log(err);
    } 
})


router.get('/login',async (req,res)=>{
  return res.json(token)
})

router.get ("/logout", async (req,res)=> {
    res.clearCookie('jwtoken',{httpOnly:true})
  
    res.status(200).send({message:"logout success"})
  })

module.exports = router;