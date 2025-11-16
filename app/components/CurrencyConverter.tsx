'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface ExchangeRate {
  [key: string]: number;
}

export default function CurrencyConverter() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN', 'HUF', 'RON'];

  // Fetch exchange rates from API
  const fetchExchangeRate = useCallback(async () => {
    if (!fromCurrency || !toCurrency) return;

    setLoading(true);
    setError(null);

    try {
      // Using exchangerate-api.com free tier (no API key required for basic usage)
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );

      const rates = response.data.rates;

      if (rates[toCurrency]) {
        const rate = rates[toCurrency];
        setExchangeRate(rate);
        setConvertedAmount(parseFloat(amount) * rate);
        setLastUpdate(new Date());
      } else {
        setError('Currency not found');
      }
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again.');
      console.error('Exchange rate fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [fromCurrency, toCurrency, amount]);

  // Auto-refresh exchange rates every 60 seconds
  useEffect(() => {
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 60000);
    return () => clearInterval(interval);
  }, [fromCurrency, toCurrency, amount, fetchExchangeRate]);

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
          💱 Currency Converter
        </h2>
      </div>

      {/* Amount Input */}
      <div className="mb-6 animate-fadeIn">
        <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors duration-200">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          onBlur={() => setAmount(parseFloat(amount).toFixed(2))}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-black font-bold"
          placeholder="Enter amount"
          min="0"
          step="0.01"
        />
      </div>

      {/* From Currency */}
      <div className="mb-4 animate-fadeIn animation-delay-100">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          From
        </label>
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 bg-white text-black font-bold"
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center mb-4 animate-fadeIn animation-delay-200">
        <button
          onClick={handleSwapCurrencies}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-180 active:scale-95"
        >
          ⇄ Swap
        </button>
      </div>

      {/* To Currency */}
      <div className="mb-6 animate-fadeIn animation-delay-300">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          To
        </label>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 bg-white text-black font-bold"
        >
          {currencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      {loading && (
        <div className="p-4 bg-blue-50 rounded-lg text-center animate-pulse border-2 border-blue-200">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-3 h-3 bg-blue-600 rounded-full animate-bounce"></span>
            <p className="text-blue-600 font-semibold">Loading exchange rate...</p>
            <span className="inline-block w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 rounded-lg text-center border-2 border-red-200 animate-shake">
          <p className="text-red-600 font-semibold">{error}</p>
        </div>
      )}

      {!loading && !error && exchangeRate && convertedAmount !== null && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-300 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="text-center">
              <p className="text-gray-600 mb-3 text-sm font-medium">
                {amount} {fromCurrency} =
              </p>
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-pulse">
                {convertedAmount.toFixed(2)} {toCurrency}
              </p>
              <p className="text-sm text-gray-500 mt-4 font-medium">
                1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
              </p>
            </div>
          </div>

          {/* Last Update Time */}
          {lastUpdate && (
            <p className="text-xs text-gray-500 text-center animate-fadeIn animation-delay-100">
              ⏱️ Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}

          {/* Refresh Button */}
          <button
            onClick={fetchExchangeRate}
            disabled={loading}
            className="w-full px-4 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 font-semibold"
          >
            🔄 Refresh Rates
          </button>
        </div>
      )}
    </div>
  );
}
