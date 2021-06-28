const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    passwordHash:{type:String,reequired:true},
})

module.exports=mongoose.model('users',UserSchema)