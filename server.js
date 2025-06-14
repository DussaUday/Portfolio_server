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
import connectDB from './config/db.js';

dotenv.config();
const __dirname = path.resolve();
const app = express();
const server = createServer(app);

const clientUrl = process.env.CLIENT_URL?.replace(/\/$/, '') || 'https://uday469-git-main-dussa-uday-krishnas-projects.vercel.app' || 'http://localhost:5173';

const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// Middleware
app.use(cors({
  origin: clientUrl,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/skills', skillRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Portfolio server is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist/index.html'));
  });
}

// Socket.io
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.set('io', io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS configured for: ${clientUrl}`);
});