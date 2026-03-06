import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Globe, Settings, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

const MOCK_STOCKS = [
  { symbol: 'S&P 500', price: '5,137.08', change: '+0.80%', up: true },
  { symbol: 'NASDAQ', price: '16,274.94', change: '+1.14%', up: true },
  { symbol: 'DOW JONES', price: '38,989.83', change: '-0.12%', up: false },
  { symbol: 'NVDA', price: '822.79', change: '+4.00%', up: true },
  { symbol: 'AAPL', price: '179.66', change: '-0.60%', up: false },
  { symbol: 'TSLA', price: '202.64', change: '+2.33%', up: true },
  { symbol: 'BTC/USD', price: '64,281', change: '+3.15%', up: true },
  { symbol: 'GOLD', price: '2,083', change: '+0.55%', up: true },
];

const MOCK_NEWS = [
  {
    id: 1,
    category: 'Politics',
    title: 'Senate reaches bipartisan agreement on infrastructure spending bill',
    description: 'The new proposal aims to allocate $1.2 trillion over eight years for transportation and energy projects.',
    time: '10m ago',
    source: 'The Hill',
    image: 'https://images.unsplash.com/photo-1541872703-74c5e443d1f9?w=800&q=80'
  },
  {
    id: 2,
    category: 'Economy',
    title: 'Fed Chair indicates potential rate cuts later this year as inflation cools',
    description: 'Jerome Powell shared insights suggesting the central bank is monitoring economic indicators closely.',
    time: '25m ago',
    source: 'Bloomberg',
    image: 'https://images.unsplash.com/photo-1611974717482-aa389146522c?w=800&q=80'
  },
  {
    id: 3,
    category: 'Politics',
    title: 'New poll shows shifting dynamics in upcoming primary elections',
    description: 'Voter sentiment across key swing states indicates a focus on economic stability and social policies.',
    time: '1h ago',
    source: 'Politico',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80'
  },
  {
    id: 4,
    category: 'Economy',
    title: 'Retail sales exceed expectations in latest quarterly report',
    description: 'Consumer spending remains resilient despite higher borrowing costs, surprising analysts.',
    time: '2h ago',
    source: 'CNBC',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80'
  }
];

function App() {
  const [news] = useState(MOCK_NEWS);
  const [filter, setFilter] = useState('All');

  const filteredNews = filter === 'All'
    ? news
    : news.filter(n => n.category === filter);

  return (
    <div className="app-container">
      {/* Ticker Row */}
      <div className="stock-ticker-container">
        <div className="ticker-content">
          {[...MOCK_STOCKS, ...MOCK_STOCKS].map((stock, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-symbol">{stock.symbol}</span>
              <span className="ticker-value">{stock.price}</span>
              <span className={stock.up ? 'price-up' : 'price-down'}>
                {stock.up ? <TrendingUp size={14} style={{ display: 'inline', marginRight: '4px' }} /> : <TrendingDown size={14} style={{ display: 'inline', marginRight: '4px' }} />}
                {stock.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Modern Navbar */}
      <nav className="navbar">
        <div className="max-width-wrapper flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="brand-icon">
              <Globe className="text-white" size={24} />
            </div>
            <div>
              <h1 className="brand-text" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>US News Pulse</h1>
              <p className="text-xs text-gray-400" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>Real-time Headlines</p>
            </div>
          </div>

          <div className="search-bar" style={{ display: window.innerWidth > 768 ? 'flex' : 'none' }}>
            <Search size={18} className="text-gray-400" style={{ marginRight: '8px' }} />
            <input type="text" placeholder="Search news, markets..." className="search-input" />
          </div>

          <div className="flex items-center gap-4">
            <div className="live-indicator">
              <div className="dot-pulse" />
              <span>LIVE</span>
            </div>
            <Settings className="text-gray-400" size={20} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </nav>

      <main className="max-width-wrapper" style={{ paddingTop: '2rem' }}>
        <div style={{ marginBottom: '2.5rem' }} className="flex justify-between items-end">
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Market Briefing</h2>
            <p className="text-gray-400">Essential insights for today's market movers</p>
          </div>
          <div className="filter-group">
            {['All', 'Politics', 'Economy'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="main-grid">
          {/* News Section */}
          <div className="flex" style={{ flexDirection: 'column', gap: '1.5rem' }}>
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card news-article"
                >
                  <div className="article-image-container" style={{ overflow: 'hidden', position: 'relative' }}>
                    <img src={item.image} alt={item.title} className="article-image" />
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <span className={`badge ${item.category === 'Politics' ? 'badge-politics' : 'badge-economy'}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="article-content" style={{ flex: 1 }}>
                    <div className="flex items-center gap-3 text-xs text-gray-400" style={{ marginBottom: '0.75rem' }}>
                      <span className="font-bold" style={{ color: 'var(--accent-indigo)' }}>{item.source}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {item.time}</span>
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', lineHeight: '1.3' }}>
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm" style={{ marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.description}
                    </p>
                    <div style={{ marginTop: 'auto' }} className="flex items-center justify-between">
                      <button className="flex items-center gap-1" style={{ background: 'none', border: 'none', color: 'var(--accent-indigo)', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        READ SOURCE <ChevronRight size={14} />
                      </button>
                      <div className="flex gap-2">
                        <span className="text-xs" style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>#breaking</span>
                        <span className="text-xs" style={{ padding: '2px 6px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }}>#US2026</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <aside>
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }} className="flex items-center gap-2">
                <TrendingUp size={18} className="price-up" /> Market Movers
              </h3>
              <div>
                {MOCK_STOCKS.slice(0, 5).map((stock, i) => (
                  <div key={i} className="ticker-sidebar-item">
                    <div>
                      <div className="text-sm font-bold">{stock.symbol}</div>
                      <div className="text-xs text-gray-400">US Markets</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div className="text-sm font-bold">{stock.price}</div>
                      <div className={`text-xs font-bold ${stock.up ? 'price-up' : 'price-down'}`}>
                        {stock.up ? '+' : ''}{stock.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)', borderRadius: '12px', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                VIEW FULL EXCHANGE
              </button>
            </div>

            <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--accent-indigo)' }}>
              <p className="text-xs font-bold text-gray-400" style={{ textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Special Report</p>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', lineHeight: '1.3' }}>How the 2026 Housing Market is Defying Predictions</h4>
              <button style={{ background: 'none', border: 'none', color: 'var(--accent-indigo)', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>LEARN MORE</button>
            </div>
          </aside>
        </div>
      </main>

      <footer>
        <div className="max-width-wrapper">
          <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
            <div className="brand-icon" style={{ width: '32px', height: '32px' }}>
              <Globe className="text-white" size={18} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>US News Pulse</h2>
          </div>
          <p className="text-gray-400 text-sm" style={{ maxWidth: '400px' }}>
            Premium headline news and financial snapshots. Built with precision for the modern analyst.
          </p>
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-glass)', color: '#475569', fontSize: '0.75rem' }}>
            &copy; 2026 US News Pulse. All data is for demonstration purposes.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
