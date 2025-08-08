import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Portfolio performance analytics
router.get('/portfolio-performance', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const portfolioItems = await prisma.portfolioItem.findMany({
      where: { userId },
      include: { crypto: true }
    });

    const totalValue = portfolioItems.reduce((sum, item) => {
      return sum + (item.amount * item.crypto.currentPrice);
    }, 0);

    const totalInvested = portfolioItems.reduce((sum, item) => {
      return sum + (item.amount * item.purchasePrice);
    }, 0);

    const totalGainLoss = totalValue - totalInvested;
    const percentageChange = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    res.json({
      totalValue,
      totalInvested,
      totalGainLoss,
      percentageChange,
      itemCount: portfolioItems.length
    });
  } catch (error) {
    console.error('Error fetching portfolio performance:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio performance' });
  }
});

// Portfolio diversification analysis
router.get('/portfolio-diversification', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const portfolioItems = await prisma.portfolioItem.findMany({
      where: { userId },
      include: { crypto: true }
    });

    const totalValue = portfolioItems.reduce((sum, item) => {
      return sum + (item.amount * item.crypto.currentPrice);
    }, 0);

    const diversification = portfolioItems.map(item => ({
      symbol: item.crypto.symbol,
      name: item.crypto.name,
      percentage: totalValue > 0 ? ((item.amount * item.crypto.currentPrice) / totalValue) * 100 : 0,
      value: item.amount * item.crypto.currentPrice,
      amount: item.amount
    }));

    res.json({ 
      diversification, 
      totalValue,
      totalAssets: diversification.length 
    });
  } catch (error) {
    console.error('Error fetching diversification data:', error);
    res.status(500).json({ error: 'Failed to fetch diversification data' });
  }
});

// Top performers in portfolio
router.get('/top-performers', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const portfolioItems = await prisma.portfolioItem.findMany({
      where: { userId },
      include: { crypto: true }
    });

    const performers = portfolioItems.map(item => {
      const currentValue = item.amount * item.crypto.currentPrice;
      const investedValue = item.amount * item.purchasePrice;
      const gainLoss = currentValue - investedValue;
      const percentageChange = investedValue > 0 ? (gainLoss / investedValue) * 100 : 0;

      return {
        symbol: item.crypto.symbol,
        name: item.crypto.name,
        currentValue,
        investedValue,
        gainLoss,
        percentageChange,
        amount: item.amount
      };
    });

    // Sort by percentage change (descending)
    performers.sort((a, b) => b.percentageChange - a.percentageChange);

    res.json({ performers });
  } catch (error) {
    console.error('Error fetching top performers:', error);
    res.status(500).json({ error: 'Failed to fetch top performers' });
  }
});

// Portfolio summary
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const portfolioItems = await prisma.portfolioItem.findMany({
      where: { userId },
      include: { crypto: true }
    });

    const watchlistItems = await prisma.watchlistItem.findMany({
      where: { userId },
      include: { crypto: true }
    });

    const totalValue = portfolioItems.reduce((sum, item) => {
      return sum + (item.amount * item.crypto.currentPrice);
    }, 0);

    const totalInvested = portfolioItems.reduce((sum, item) => {
      return sum + (item.amount * item.purchasePrice);
    }, 0);

    const totalGainLoss = totalValue - totalInvested;
    const percentageChange = totalInvested > 0 ? (totalGainLoss / totalInvested) * 100 : 0;

    res.json({
      portfolio: {
        totalValue,
        totalInvested,
        totalGainLoss,
        percentageChange,
        itemCount: portfolioItems.length
      },
      watchlist: {
        itemCount: watchlistItems.length
      }
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

// Historical performance (mock data for now)
router.get('/historical-performance', authenticateToken, async (req, res) => {
  try {
    const { days = 30 } = req.query;
    
    // Generate mock historical data
    const historicalData = [];
    const today = new Date();
    
    for (let i = parseInt(days as string); i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Mock performance data with some randomness
      const baseValue = 10000;
      const randomFactor = Math.random() * 0.1 - 0.05; // -5% to +5%
      const trendFactor = (parseInt(days as string) - i) * 0.001; // Slight upward trend
      
      historicalData.push({
        date: date.toISOString().split('T')[0],
        value: baseValue * (1 + randomFactor + trendFactor)
      });
    }

    res.json({ historicalData, days: parseInt(days as string) });
  } catch (error) {
    console.error('Error fetching historical performance:', error);
    res.status(500).json({ error: 'Failed to fetch historical performance' });
  }
});

export default router;
