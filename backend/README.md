# Crypto Tracker Backend

A comprehensive backend API for a cryptocurrency portfolio tracker built with Node.js, Express, TypeScript, and Prisma.

## Features

### ✅ Core Features
- **Authentication**: JWT-based authentication with register/login endpoints
- **Crypto Data**: Real-time cryptocurrency data from CoinGecko API
- **Portfolio Management**: Add, remove, and track cryptocurrency holdings
- **Watchlist**: Save favorite cryptocurrencies for quick access
- **Analytics**: Comprehensive portfolio analytics and performance tracking

### 📊 Analytics Features
- **Portfolio Overview**: Total value, total invested, P&L calculations
- **Asset Allocation**: Percentage distribution across holdings
- **Performance Tracking**: Real-time profit/loss calculations
- **Top Performers**: Best performing assets in your portfolio

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Cryptocurrency Data
- `GET /api/cryptos` - Get all cryptocurrencies (paginated)
- `GET /api/cryptos/:id` - Get specific cryptocurrency details
- `GET /api/cryptos/trending/all` - Get trending cryptocurrencies
- `GET /api/cryptos/search/query` - Search cryptocurrencies

### Portfolio
- `GET /api/portfolio` - Get user's portfolio
- `POST /api/portfolio/add` - Add cryptocurrency to portfolio
- `DELETE /api/portfolio/remove/:id` - Remove from portfolio

### Watchlist
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist/add` - Add to watchlist
- `DELETE /api/watchlist/remove/:cryptoId` - Remove from watchlist

### Analytics
- `GET /api/analytics/portfolio-overview` - Get portfolio analytics
- `GET /api/analytics/asset-allocation` - Get asset allocation
- `GET /api/analytics/top-performers` - Get top performing assets

## Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Set up database**:
   ```bash
   npm run db:push
   npm run db:generate
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | Database connection string | `file:./dev.db` |
| `JWT_SECRET` | JWT signing secret | Required |
| `JWT_EXPIRES_IN` | JWT expiration time | `7d` |
| `COINGECKO_API_URL` | CoinGecko API base URL | `https://api.coingecko.com/api/v3` |
| `PORT` | Server port | `3001` |

## Database Schema

### User
- id (CUID)
- email (unique)
- username (unique)
- password (hashed)
- createdAt, updatedAt

### Cryptocurrency
- id (CUID)
- coinId (unique)
- name, symbol
- image, currentPrice
- marketCap, priceChange24h
- lastUpdated

### PortfolioItem
- id (CUID)
- userId (foreign key)
- cryptoId (foreign key)
- amount, purchasePrice
- purchaseDate

### WatchlistItem
- id (CUID)
- userId (foreign key)
- cryptoId (foreign key)
- addedAt

## Development

### Database Management
- **Prisma Studio**: `npm run db:studio`
- **Generate types**: `npm run db:generate`
- **Push schema changes**: `npm run db:push`

### Building
- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Production**: `npm start`

## API Response Examples

### Portfolio Overview
```json
{
  "totalValue": 1250.50,
  "totalInvested": 1000.00,
  "totalProfitLoss": 250.50,
  "totalProfitLossPercentage": 25.05,
  "assets": [
    {
      "id": "cl...",
      "crypto": {
        "id": "cl...",
        "coinId": "bitcoin",
        "name": "Bitcoin",
        "symbol": "btc",
        "image": "https://...",
        "currentPrice": 45000
      },
      "amount": 0.5,
      "purchasePrice": 40000,
      "currentValue": 22500,
      "investedValue": 20000,
      "profitLoss": 2500,
      "profitLossPercentage": 12.5
    }
  ]
}
```

### Asset Allocation
```json
{
  "allocation": [
    {
      "crypto": {
        "id": "cl...",
        "coinId": "bitcoin",
        "name": "Bitcoin",
        "symbol": "btc"
      },
      "value": 22500,
      "percentage": 75.0
    }
  ]
}
