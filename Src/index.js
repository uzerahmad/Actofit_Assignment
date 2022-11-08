const express=require("express");
const route=require('./routes/route.js');
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const app=express()
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://Ur-cohort:wFiHzN0B2fHiIgOt@cluster0.ubdll.mongodb.net/assignment",{
    useNewurlparser:true
})
.then(()=>console.log("MongoDB connected..."))
.catch(err=>console.log(err))

app.use('/',route);
 
const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server is Running...${PORT}`)
})