import express from 'express';
import authRouter from './routes/auth.route.js'
import chatRouter from './routes/chat.route.js'
import messageRouter from './routes/message.route.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cookieParser());

app.use('/auth', authRouter)
app.use('/chat', chatRouter)
app.use('/message', messageRouter)


export default app;