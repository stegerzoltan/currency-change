# Currency Exchange - Real-time Exchange Rates

A modern Next.js web application that provides real-time currency exchange rates with a beautiful, responsive UI.

## Features

✨ **Real-time Currency Converter**

- Convert between 10 major currencies (USD, EUR, GBP, JPY, AUD, CAD, CHF, CNY, INR, MXN)
- Live exchange rates updated every 60 seconds
- Swap currencies with a single click
- Beautiful, responsive design

📊 **Live Price Tracker**

- Monitor multiple currency pairs simultaneously
- Base currency selection (USD, EUR, GBP)
- Visual indicators for price changes
- Auto-updates every 30 seconds

## Tech Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **API**: ExchangeRate-API (free tier)

## Installation

1. **Clone or navigate to the project directory**:

```bash
cd /home/stege/exchange
```

2. **Install dependencies** (already done):

```bash
npm install
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── page.tsx                 # Main page component
├── layout.tsx              # Root layout
├── components/
│   ├── CurrencyConverter.tsx  # Currency conversion component
│   └── LivePriceTracker.tsx   # Live price tracking component
├── globals.css             # Global styles
└── favicon.ico
```

## Components

### CurrencyConverter

A fully functional currency converter that:

- Fetches real-time exchange rates from ExchangeRate-API
- Allows users to select source and target currencies
- Displays the conversion result with exchange rate details
- Includes a manual refresh button
- Shows last update timestamp

### LivePriceTracker

Displays live exchange rates for multiple currency pairs:

- Selectable base currency (USD, EUR, GBP)
- Shows current rates and simulated price changes
- Responsive grid layout
- Auto-updates every 30 seconds

## API Information

This application uses the **ExchangeRate-API** (https://www.exchangerate-api.com/):

- **Free Tier**: 1,500 requests/month (no API key required)
- **Endpoint**: `https://api.exchangerate-api.com/v4/latest/{currency}`
- **Response**: JSON with current exchange rates

### Example API Response:

```json
{
  "rates": {
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.5
  }
}
```

## Supported Currencies

- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- AUD (Australian Dollar)
- CAD (Canadian Dollar)
- CHF (Swiss Franc)
- CNY (Chinese Yuan)
- INR (Indian Rupee)
- MXN (Mexican Peso)

## Features & Functionality

### Real-time Updates

- Exchange rates update automatically every 60 seconds in the converter
- Live prices refresh every 30 seconds in the tracker
- All updates happen in the background without blocking the UI

### User Experience

- Clean, modern interface with gradient background
- Responsive design (mobile, tablet, desktop)
- Error handling for API failures
- Loading states during data fetches
- Easy-to-read currency displays with proper formatting

### Data Persistence

- No data storage required (stateless application)
- All data is fetched from the API in real-time

## Future Enhancements

- Add historical exchange rate charts
- Implement currency favorites/watchlist
- Add alerts for exchange rate thresholds
- Multi-language support
- Dark mode toggle
- Export conversion history
- Offline mode with cached rates

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Currently, this application uses the free tier of ExchangeRate-API without an API key. If you want to use a paid tier with higher limits, create a `.env.local` file:

```
NEXT_PUBLIC_EXCHANGE_RATE_API_KEY=your_api_key_here
```

Then update the API endpoint in the components to include the API key parameter.

## Troubleshooting

**Issue**: "Failed to fetch exchange rates"

- Check your internet connection
- Verify the API is accessible (try visiting the API endpoint in your browser)
- Check if you've exceeded the free tier rate limit (1,500/month)

**Issue**: Rates not updating

- Check that the browser's console doesn't show CORS errors
- Verify that JavaScript is enabled
- Clear browser cache and reload

## License

MIT

## Support

For issues with the ExchangeRate-API, visit: https://www.exchangerate-api.com/docs

Enjoy real-time currency exchange tracking! 💱
