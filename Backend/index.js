import 'dotenv/config';
import app from './src/app.js';
import {connectDB} from './src/db/db.js'
import initSocketIo from './src/socket/socket.js'

import { createServer } from "node:http";

const httpServer = createServer(app);
const io = initSocketIo(httpServer);

const PORT = process.env.PORT || 3000;
connectDB().then(
  () => {
    httpServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
);
