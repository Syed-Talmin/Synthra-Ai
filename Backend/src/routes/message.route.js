import express from 'express';
import messageModel from '../models/message.model.js'
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:chatId', authMiddleware ,async (req, res) => {
    const { chatId } = req.params;
    
    const messages = await messageModel.find({
        chatId
    })

    res.status(200).json(messages);
})

export default router;