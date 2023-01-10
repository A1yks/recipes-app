import AuthController from 'backend/controllers/auth';
import { Router } from 'express';

const router = Router();

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

export default router;
