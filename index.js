const app = require('./app');

require('dotenv').config();
const mongoose=require('mongoose')

mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})
.then(()=>{
    console.log('Mongodb Connected')
})
.catch((err)=>{
    if(err){
        console.log('unable to connect to mongodb')
    }
})

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));