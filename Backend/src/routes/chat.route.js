import express from 'express';
import { createChatController, listChatsController, renameChatController, deleteChatController } from '../controllers/chat.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createChatController);
router.get('/list', authMiddleware, listChatsController);
router.patch('/rename/:chatId', authMiddleware, renameChatController);
router.delete('/delete/:chatId', authMiddleware, deleteChatController);

export default router;