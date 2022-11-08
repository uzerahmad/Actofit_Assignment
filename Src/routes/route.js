const usercontroller=require("../controller/usercontroller")
const express=require("express");
const router=express.Router()
router.post("/Create",usercontroller.CreateUser)
router.post("/login",usercontroller.loginuser)
router.get("/user/:userId",usercontroller.getuser)
router.put('/userdetail/:userId',usercontroller.updateuser)
router.delete('/user/:userId',usercontroller.deleteuser)
module.exports=router;