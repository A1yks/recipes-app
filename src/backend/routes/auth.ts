import AuthController from 'backend/controllers/auth';
import { loginSchema, registrationSchema } from 'backend/controllers/auth/validation';
import ValidationMiddleware from 'backend/middleware/schema-validation';
import { Router } from 'express';

const router = Router();

router.post('/login', ValidationMiddleware.validate(loginSchema), AuthController.login);

router.post('/register', ValidationMiddleware.validate(registrationSchema), AuthController.register);

export default router;
