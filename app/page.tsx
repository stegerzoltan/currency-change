import CurrencyConverter from './components/CurrencyConverter';
import LivePriceTracker from './components/LivePriceTracker';

export const metadata = {
  title: 'Currency Exchange - Real-time Rates',
  description: 'Real-time currency converter with live exchange rates',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeInDown">
          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 drop-shadow-lg animate-pulse">
            💱 Currency Exchange
          </h1>
          <p className="text-xl text-gray-600 font-semibold animate-fadeIn animation-delay-200">
            Real-time exchange rates with live updates
          </p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-pink-600 rounded-full mx-auto mt-4 animate-fadeIn animation-delay-400"></div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Currency Converter */}
          <div className="animate-fadeInLeft animation-delay-300">
            <CurrencyConverter />
          </div>

          {/* Live Price Tracker */}
          <div className="animate-fadeInRight animation-delay-500">
            <LivePriceTracker />
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-600 text-sm animate-fadeInUp animation-delay-600 bg-white bg-opacity-50 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <p className="font-semibold">⚡ Powered by <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">ExchangeRate-API</span> | Data updates every 30-60 seconds</p>
        </div>
      </div>
    </main>
  );
}
