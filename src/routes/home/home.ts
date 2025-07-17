import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.middleware';
const homeRoutes = Router();

homeRoutes.get('/', requireAuth, (req, res) => {
    const user = (req as any).user;
  res.json({
    message: `Welcome ${user.email}! This is a protected route.`,
    user,
  });
});

export default homeRoutes;
