const usermodel = require("../Model/usermodel.js");
const jwt = require("jsonwebtoken");
//----------Create User------------
const CreateUser = async (req, res) => {
    let data = req.body;
    let {  PhoneNo, Email, } = data;
    let PhoneNoExist = await usermodel.findOne({ PhoneNo });
    if (PhoneNoExist) {
        return res
            .status(409)
            .send({ status: false, msg: `This ${PhoneNo} Number already Exist` });
    }
    let Emailexist = await usermodel.findOne({ Email });
    if (Emailexist) {
        return res
            .status(409)
            .send({ status: false, msg: `this ${Email} email already Exist` });
    }
    let user = await usermodel.create(data);
    res
        .status(201)
        .send({ status: true, msg: "user create successfully", data: user });
};
//---------------------Login User------------------
const loginuser = async (req, res) => {
    let { Email, Password } = req.body;

    let user = await usermodel.findOne({ Email: Email, Password: Password });
    if (!user)
      return res.status(404).send({status: false, msg: "Please enter a valid email address and password"});

    let token = jwt.sign(
        {
            userId:user._id.toString(),
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
        },
        "company assignment"
    );
    res.setHeader("X-api-key", token);
    res.status(201).send({ status: true, token: token });

};
//---------------getuser----------------
const getuser=async (req,res)=>{
    let userId=req.params.userId

    let userdetail=await usermodel.find({userId})
    if(!userdetail){
        return res.status(400).send({status:false,msg:"this user is not rajister"})
    }
   
    const user= await usermodel.find({ userId: userId });
    res.status(200).send({status:true,data:userdetail,user:user})
    
}
//----------update user details--------
const updateuser=async (req,res)=>{
    let data=req.body
    const userId=req.params.userId;
    let{Name,Address,PhoneNO}=data 
   
    const updateuser = await usermodel.findByIdAndUpdate( userId,
        
         { $set : { Name: Name, Address: Address,PhoneNo:PhoneNO,isPublished:true}
        },
        { new: true});
        return res.status(200).send({ status: true, data:updateuser });
    }

//--------------------------Delete user-------------
const deleteuser=async (req,res)=>{
    let userId=req.params.userId
    let UserExist=await usermodel.findById(userId)
    if(!UserExist){
        return res.status(400).send({status:false,msg:"please enter a valid user"})

    }
    let userDelete = await usermodel.findByIdAndUpdate(userId, {
        $set: { isDeleted: true },
      });
      res
        .status(200)
        .send({ status: true, message: "userdetail is deleted successfully",  });
    };
module.exports.CreateUser = CreateUser;
module.exports.loginuser = loginuser;
module.exports.getuser=getuser
module.exports.updateuser=updateuser
module.exports.deleteuser=deleteuser
