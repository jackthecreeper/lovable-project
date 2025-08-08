import express from 'express';
import axios from 'axios';

const router = express.Router();
const COINGECKO_API_URL = process.env.COINGECKO_API_URL || 'https://api.coingecko.com/api/v3';

// Get all cryptocurrencies
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const response = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: limit,
        page: page,
        sparkline: false
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    res.status(500).json({ error: 'Failed to fetch cryptocurrencies' });
  }
});

// Get specific cryptocurrency
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${COINGECKO_API_URL}/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching cryptocurrency:', error);
    res.status(500).json({ error: 'Failed to fetch cryptocurrency' });
  }
});

// Get trending cryptocurrencies
router.get('/trending/all', async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/search/trending`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching trending cryptocurrencies:', error);
    res.status(500).json({ error: 'Failed to fetch trending cryptocurrencies' });
  }
});

// Search cryptocurrencies
router.get('/search/query', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const response = await axios.get(`${COINGECKO_API_URL}/search`, {
      params: { query: q }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error searching cryptocurrencies:', error);
    res.status(500).json({ error: 'Failed to search cryptocurrencies' });
  }
});

export default router;
