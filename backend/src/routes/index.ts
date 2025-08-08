import express from 'express';
import authRoutes from './auth';
import cryptoRoutes from './crypto';
import portfolioRoutes from './portfolio';
import watchlistRoutes from './watchlist';
import analyticsRoutes from './analytics';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API routes
router.use('/auth', authRoutes);
router.use('/cryptos', cryptoRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/watchlist', watchlistRoutes);
router.use('/analytics', analyticsRoutes);

export default router;
