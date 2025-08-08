# Backend Deployment Guide

## Overview
This backend is ready for deployment to Netlify with serverless functions.

## Prerequisites
- Node.js 18+
- PostgreSQL database (Supabase recommended)
- Netlify account

## Environment Variables
Create a `.env` file with:
```
DATABASE_URL="postgresql://..."
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
NODE_ENV=production
```

## Deployment Steps

### 1. Database Setup
```bash
# Create Supabase project
# Update DATABASE_URL in .env
```

### 2. Netlify Setup
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod
```

### 3. Environment Variables
Set these in Netlify dashboard:
- DATABASE_URL
- JWT_SECRET
- JWT_EXPIRES_IN
- NODE_ENV=production

### 4. Database Migration
```bash
# Run migrations
npm run db:push
```

### 5. Test Deployment
```bash
# Test locally
npm run dev

# Test production build
npm run build
npm start
```

## API Endpoints
- GET /health - Health check
- POST /api/auth/* - Authentication
- GET /api/cryptos/* - Crypto data
- POST /api/portfolio/* - Portfolio management
- GET /api/watchlist/* - Watchlist
- GET /api/analytics/* - Analytics

## Quick Deploy Commands
```bash
cd backend
npm install
npm run db:generate
npm run build
netlify deploy --prod
