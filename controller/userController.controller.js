const User=require('../models/userModel')

const  getLoginPage =(req,res) => {
    res.sendFile('login.html', {root: './views/pages/examples'});
};

const  getRegisterPage =(req,res) => {
    res.sendFile('register.html', {root: './views/pages/examples'});
};

const postRegisterPage =(req,res)=>{
    const name=req.body.name
    const email=req.body.email
    const password=req.body.password
    const retype=req.body.retype

    try{
        const user=User.findOne({email:email})
        if(user){
            alert("There is already an account under this user")
            res.redirect('./login')
        }
        else if(password.length<=6){
            alert('Password must contain 6 characters')
            res.redirect('./register')
        }

    }
    catch(error){

    }

    if(password.length<=6||!name||!email){
        return res.json({message:'Registration Failed'})
    }
    res.json({message:'Registration Succesfull'})
}

module.exports ={
    getLoginPage,
    getRegisterPage,
    postRegisterPage
};