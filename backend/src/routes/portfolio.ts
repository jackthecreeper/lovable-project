import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's portfolio
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user?.id;
    const portfolio = await prisma.portfolioItem.findMany({
      where: { userId },
      include: {
        crypto: {
          select: {
            id: true,
            coinId: true,
            name: true,
            symbol: true,
            image: true,
            currentPrice: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio' });
  }
});

// Add to portfolio
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { cryptoId, amount, purchasePrice } = req.body;
    const userId = req.user?.id;

    if (!cryptoId || !amount || !purchasePrice) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const portfolioItem = await prisma.portfolioItem.create({
      data: {
        userId,
        cryptoId,
        amount: parseFloat(amount),
        purchasePrice: parseFloat(purchasePrice)
      },
      include: {
        crypto: {
          select: {
            id: true,
            coinId: true,
            name: true,
            symbol: true,
            image: true
          }
        }
      }
    });

    res.status(201).json(portfolioItem);
  } catch (error) {
    console.error('Error adding to portfolio:', error);
    res.status(500).json({ error: 'Failed to add to portfolio' });
  }
});

// Remove from portfolio
router.delete('/remove/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const portfolioItem = await prisma.portfolioItem.findUnique({
      where: { id }
    });

    if (!portfolioItem || portfolioItem.userId !== userId) {
      return res.status(404).json({ error: 'Portfolio item not found' });
    }

    await prisma.portfolioItem.delete({
      where: { id }
    });

    res.json({ message: 'Portfolio item removed successfully' });
  } catch (error) {
    console.error('Error removing from portfolio:', error);
    res.status(500).json({ error: 'Failed to remove from portfolio' });
  }
});

export default router;
