const User=require('../models/userModel')
const bcrypt=require('bcryptjs')
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
            const salt=await bycrypt.genSaltSync(10)
            const passwordHash=await bycrypt.hash(password,salt)
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

module.exports ={
    getLoginPage,
    getRegisterPage,
    postRegisterPage
};