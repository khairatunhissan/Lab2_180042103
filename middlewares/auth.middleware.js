const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./scratch");
const alert = require("alert");


const isLoggedin = (req, res, next) => {
       
    const name = localStorage.getItem('name')

    if(name){
        alert(`Logged in with: ${name}`)
        next()
    }
    else{
        res.redirect('/')
    }
}

module.exports=isLoggedin
