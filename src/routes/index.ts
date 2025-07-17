import { Router } from 'express';
import authRoutes from './auth/auth.routes';
import homeRoutes from './home/home';

const router = Router();

router.use('/auth', authRoutes );
router.use('/home', homeRoutes)

export default router;