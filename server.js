import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import certificateRoutes from './routes/certificates.js';
import skillRoutes from './routes/skills.js';
import resumeRoutes from './routes/resumes.js';
import connectDB from './config/db.js';
import fs from 'fs';

dotenv.config();
const __dirname = path.resolve();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'https://uday469-git-main-dussa-uday-krishnas-projects.vercel.app/',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'https://uday469-git-main-dussa-uday-krishnas-projects.vercel.app/',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes
app.use('https://uday469-git-main-dussa-uday-krishnas-projects.vercel.app/auth', authRoutes);
app.use('https://uday469-git-main-dussa-uday-krishnas-projects.vercel.app/projects', projectRoutes);
app.use('https://uday469-git-main-dussa-uday-krishnas-projects.vercel.app/certificates', certificateRoutes);
app.use('https://uday469-git-main-dussa-uday-krishnas-projects.vercel.app/skills', skillRoutes);
app.use('https://uday469-git-main-dussa-uday-krishnas-projects.vercel.app/resumes', resumeRoutes);


// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Make io accessible to routes
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));