// 1. Initial State / Fallback Data
const stocks = {
  RELIANCE: { price: 2971.30, change: 12.40, isUp: true },
  TCS: { price: 3945.00, change: -5.20, isUp: false },
  HDFCBANK: { price: 1528.00, change: 8.50, isUp: true },
  INFY: { price: 1452.10, change: 10.30, isUp: true },
  ICICIBANK: { price: 1084.50, change: -2.15, isUp: false },
  SBI: { price: 765.20, change: 4.10, isUp: true }
};

// ✅ Correct container (HTML unchanged)
const tickerContainer = document.querySelector(
  '.stocks.ticker-container > div'
);

// 2. Build the Ticker UI
function initializeTicker() {
  let html = '';

  Object.keys(stocks).forEach(symbol => {
    const data = stocks[symbol];
    const sign = data.isUp ? '+' : '';
    const arrow = data.isUp ? '▲' : '▼';
    const colorClass = data.isUp ? 'up' : 'down';

    html += `
      <div class="stock-box" data-symbol="${symbol}">
        <span class="stock-symbol">${symbol}</span>
        <span class="stock-price">₹${data.price.toFixed(2)}</span>
        <span class="stock-change ${colorClass}">
          ${arrow} ${sign}${data.change.toFixed(2)}
        </span>
      </div>
    `;
  });

  // ✅ Duplicate for seamless scrolling
  tickerContainer.innerHTML = html + html;
}
