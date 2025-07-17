import { Router } from 'express';
import  { register, login } from '../../controllers/auth.controllers';
import { validate } from '../../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../../validations/auth.validation';

const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), register);
authRoutes.post('/login', validate(loginSchema), login);

export default authRoutes;
