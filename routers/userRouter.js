import { Router } from 'express';
import { getRanking, signIn, signUp, userMe } from '../controllers/UserController.js';
import { checkSession } from '../middlewares/checkSession.js';
import { schemaValidator } from '../middlewares/schemaValidator.js';
import { loginSchema, userSchema } from '../schemas/userSchema.js';


const userRouter = Router();

userRouter.post('/signup',schemaValidator(userSchema),signUp);
userRouter.post('/signin', schemaValidator(loginSchema),signIn);
userRouter.get('/users/me', checkSession, userMe);
userRouter.get('/ranking', getRanking);

export default userRouter;