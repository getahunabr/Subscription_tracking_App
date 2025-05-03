import{Router} from "express"
import {getUser, getUsers} from "../controller/user.controller.js";
import authorize from "../middleware/auth.middleware.js";
const userRouter=Router()

userRouter.get("/",getUsers)


userRouter.get("/:id",authorize,getUser)


userRouter.post("/users",(req,res)=>{
    res.send({message:"Create new Users"})
});
userRouter.put("/:id",(req,res)=>{
    res.send({message:"Update Users by id"})
});
userRouter.delete("/:id",(req,res)=>{
    res.send({message:"Delete Users by id"})
});

export default userRouter;