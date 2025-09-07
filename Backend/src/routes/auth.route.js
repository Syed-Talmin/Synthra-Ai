import express from 'express';
import authMiddleware from "../middleware/auth.middleware.js"
import {registerController,loginController, logoutController} from '../controllers/auth.controller.js'
const router = express.Router();


router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout',logoutController);
router.get('/user', authMiddleware , (req, res) => {
    res.json({ user: req.user });
});

export default router;