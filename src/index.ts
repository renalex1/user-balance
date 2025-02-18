import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const PORT = Number(process.env.SERVER_PORT) || 3000;
const PROTOCOL = process.env.SERVER_PROTOCOL || 'http';
const HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_URL = `${PROTOCOL}://${HOST}:${PORT}`;

const app = express();
app.use(express.json());

const server = app.listen(PORT, HOST, () => {
    console.log(`\n🚀 The REST API is now accessible at \n${SERVER_URL}`);
});

server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌🔥 Port ${PORT} is already in use! Try using a different port.`);
    } else {
        console.error('❌🔥 Failed to start server:', error);
    }
});
