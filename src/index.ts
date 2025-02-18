import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import { sequelize } from './db';

const PORT = Number(process.env.SERVER_PORT) || 3000;
const PROTOCOL = process.env.SERVER_PROTOCOL || 'http';
const HOST = process.env.SERVER_HOST || 'localhost';
const SERVER_URL = `${PROTOCOL}://${HOST}:${PORT}`;

const app = express();
app.use(express.json());

const startServer = async () => {
    try {
        await sequelize.authenticate(); 
        console.log('✅ Connected to the database successfully.');

        const server = app.listen(PORT, HOST, () => {
            console.log(`\n🚀 The REST API is now accessible at \n${SERVER_URL}`);
        });

        server.on('error', (error: NodeJS.ErrnoException) => {
            if (error.code === 'EADDRINUSE') {
                console.error(`❌🔥 Port ${PORT} is already in use! Try using a different port.`);
            } else {
                console.error('❌🔥 Failed to start server:', error);
            }
            process.exit(1);
        });
    } catch (error) {
        console.error('❌🔥 Database connection failed:', error);
        process.exit(1);
    }
};

startServer();
