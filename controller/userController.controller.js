const User=require('../models/userModel')
const bcrypt=require('bcryptjs')
const LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

const alert= require('alert')

const  getLoginPage =(req,res) => {
    res.sendFile('login.html', {root: './views/pages/examples'});
};

const  getRegisterPage =(req,res) => {
    res.sendFile('register.html', {root: './views/pages/examples'});
};

const postRegisterPage =async(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    const retype=req.body.retype

    try{
        const user=await User.findOne({email:email})
        if(user){
            alert("There is already an account under this user")
            res.redirect('/login')
        }
        else if(password.length<=6){
            alert('Password must contain 6 characters')
            res.redirect('/register')
        }
        else if(password!==retype){
            alert('Please enter same password')
            res.redirect('/register')
        }
        else if(!name||!email){
            alert("please fill the fields")
            res.redirect('/register')
        }
        else{
            const salt=await bcrypt.genSaltSync(10)
            const passwordHash=await bcrypt.hash(password,salt)
            const createUser=new User({
                name,
                email,
                passwordHash,
            })
            await createUser.save()
            alert('Sucessfully Created')
            res.redirect('/login')
        }


    }
    catch(error){
        console.log(error)
        alert('Something went wrong')
        res.redirect('/register')

    }

}

const postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const passMatch = await bcrypt.compare(password, existingUser.passwordHash);
      if (passMatch) {
        localStorage.setItem("name", existingUser.name);
  
        res.redirect("/dashboard");
      } else {
        alert("Wrong Password");
        res.redirect("/login");
      }
    } else {
      alert("You are not registered\nPlease create an account");
      res.redirect("/register");
    }
  };

  const getDashboard=(req,res)=>{
    res.sendFile('index3.html', {root: './views' });
  }

module.exports ={
    getLoginPage,
    getRegisterPage,
    postRegisterPage,
    postLogin,
    getDashboard
};