'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface PriceData {
  currency: string;
  rate: number;
  change: number;
  timestamp: Date;
}

export default function LivePriceTracker() {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Show live rates of these base currencies against HUF
  const targetCurrency = 'HUF';
  const trackedBases = ['EUR', 'USD', 'RON'];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setLoading(true);
        // Fetch rates for each tracked base currency
        const responses = await Promise.all(
          trackedBases.map((base) =>
            axios.get(`https://api.exchangerate-api.com/v4/latest/${base}`)
          )
        );

        const newPrices: PriceData[] = responses.map((res, idx) => ({
          currency: trackedBases[idx], // base currency (EUR, USD, RON)
          rate: res.data.rates?.[targetCurrency] || 0,
          change: (Math.random() - 0.5) * 0.5, // Simulated change for demo
          timestamp: new Date(),
        }));

        setPrices(newPrices);
        setError(null);
      } catch (err) {
        setError('Failed to load HUF rates');
        console.error('HUF price fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
          📊 Live HUF Exchange Rates
        </h2>
        <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
          Tracking: EUR→HUF, USD→HUF, RON→HUF
        </div>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mx-auto mb-4"></div>
            <p className="text-gray-500 font-semibold">Loading prices...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 rounded-lg text-red-600 border-2 border-red-200 animate-shake">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prices.map((price, index) => (
            <div
              key={price.currency}
              className="p-5 border-2 border-gray-200 rounded-xl hover:shadow-xl hover:border-indigo-300 transition-all duration-300 transform hover:scale-105 bg-gradient-to-br from-white to-gray-50 animate-fadeIn"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600 font-medium">
                    1 {price.currency} = {price.rate.toFixed(4)} {targetCurrency}
                  </p>
                  <p className="text-xs text-indigo-600 font-bold mt-2 animate-pulse">
                    {price.currency} → {targetCurrency}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                    {price.rate.toFixed(2)}
                  </p>
                  <p
                    className={`text-sm font-bold mt-1 animate-bounce ${
                      price.change >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {price.change >= 0 ? '↑' : '↓'} {Math.abs(price.change).toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-pink-50 rounded-xl text-xs text-gray-600 border-2 border-indigo-100 animate-fadeIn">
        <p className="font-medium">⚡ Updates every 30 seconds • Pairs: <span className="font-bold text-indigo-600">EUR→HUF, USD→HUF, RON→HUF</span></p>
      </div>
    </div>
  );
}
