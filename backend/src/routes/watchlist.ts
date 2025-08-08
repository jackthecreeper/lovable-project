import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get user's watchlist
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.id;
    const watchlist = await prisma.watchlistItem.findMany({
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
      orderBy: { addedAt: 'desc' }
    });

    res.json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist:', error);
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
});

// Add to watchlist
router.post('/add', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { cryptoId } = req.body;
    const userId = req.user?.id;

    if (!cryptoId) {
      return res.status(400).json({ error: 'Crypto ID is required' });
    }

    const watchlistItem = await prisma.watchlistItem.create({
      data: {
        userId: userId!,
        cryptoId
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

    res.status(201).json(watchlistItem);
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ error: 'Failed to add to watchlist' });
  }
});

// Remove from watchlist
router.delete('/remove/:cryptoId', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { cryptoId } = req.params;
    const userId = req.user?.id;

    await prisma.watchlistItem.deleteMany({
      where: { userId: userId!, cryptoId }
    });

    res.json({ message: 'Watchlist item removed successfully' });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ error: 'Failed to remove from watchlist' });
  }
});

export default router;
