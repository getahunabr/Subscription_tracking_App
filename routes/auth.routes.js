import {Router} from "express"
import {signIn, signOut, signUp} from "../controller/auth.controller.js";
const authRouter = Router();

authRouter.post('/Sign-up', signUp);

authRouter.post('/Sign-in', signIn);

authRouter.post('/Sign-out', signOut);


export default authRouter;