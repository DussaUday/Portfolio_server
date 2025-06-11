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
import fs from 'fs'; // Although fs is imported, it's not used in this snippet.

dotenv.config(); // Load environment variables from .env

const __dirname = path.resolve(); // This is correctly set up for ES Modules

const app = express();
const server = createServer(app);

// Define your allowed origins as an array
// IMPORTANT: Be careful with process.env.CLIENT_URL.
// If it only contains one URL, you need to add localhost manually for development.
// A better approach is to have a comma-separated list in your .env or multiple env vars.
const allowedOrigins = [
    'http://localhost:5173', // Your React/Vite development server
    'https://uday469-git-main-dussa-uday-krishnas-projects.vercel.app', // Your Vercel deployed client
    // Add your Render server URL if it also acts as a client that needs to make requests to itself,
    // though usually a backend doesn't make requests to its own origin.
    // 'https://portfolio-server-9qz2.onrender.com' // Example if needed, but usually not for client access
];

// Configure CORS middleware for Express routes
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // or if the origin is in our allowedOrigins list.
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

// Configure CORS for Socket.io
const io = new Server(server, {
    cors: {
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS for Socket.IO'));
            }
        },
        methods: ['GET', 'POST'], // Socket.IO typically uses GET and POST for polling/websocket handshake
        credentials: true,
    },
});

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Routes - Corrected to use relative paths
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/certificates', certificateRoutes);
app.use('/skills', skillRoutes);
app.use('/resumes', resumeRoutes);

// Serve static assets in production (if you have a frontend build)
// This part is crucial if your frontend is served by the same Express server in production.
// If your frontend is deployed separately on Vercel, you might not need this here.
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

    // Serve index.html for all non-API routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
}


// Socket.io connection handling
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
    // Add any other Socket.IO event listeners here
});

// Make io accessible to routes (if needed for emitting events from API routes)
app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));