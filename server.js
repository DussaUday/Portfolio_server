import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import certificateRoutes from './routes/certificates.js';
import skillRoutes from './routes/skills.js';
import resumeRoutes from './routes/resumes.js';
import connectDB from './config/db.js';
import fs from 'fs'; // Add fs to check file existence

dotenv.config();
const __dirname = path.resolve();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/resumes', resumeRoutes);

// Serve frontend
const staticPath = path.join(__dirname, 'frontend', 'dist');
const indexPath = path.join(staticPath, 'index.html');

// Log if index.html is missing
if (!fs.existsSync(indexPath)) {
  console.error(`Error: index.html not found at ${indexPath}. Ensure frontend is built.`);
}

app.use(express.static(staticPath));

app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`Error serving index.html: ${err.message}`);
        res.status(500).json({ error: 'Failed to serve frontend' });
      }
    });
  } else {
    res.status(404).json({ error: 'Frontend not found. Please build the frontend.' });
  }
});

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