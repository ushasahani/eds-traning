const stocks = [
  { symbol: "NIFTY 50", price: "22,514.65", change: "+0.45%" },
  { symbol: "SENSEX", price: "74,248.22", change: "+0.47%" },
  { symbol: "RELIANCE", price: "2,971.30", change: "-0.12%" },
  { symbol: "TCS", price: "3,945.00", change: "+1.20%" },
  { symbol: "HDFC BANK", price: "1,528.00", change: "-0.85%" },
  { symbol: "INFY", price: "1,452.10", change: "+0.30%" },
  { symbol: "ICICI BANK", price: "1,084.50", change: "+1.15%" }
];

function createTicker() {
  // ✅ 1. Locate the section by data-id
  const section = document.querySelector(
    '.section.ticker-container[data-id="stock-ticker"]'
  );

  if (!section) return;

  // ✅ 2. Make section visible (EDS hides it initially)
  section.style.display = '';

  // ✅ 3. Find the inner empty divs
  const innerDivs = section.querySelectorAll('.ticker.block > div > div');

  if (!innerDivs.length) return;

  // Use the first empty div as ticker track
  const ticker = innerDivs[0];
  ticker.classList.add('ticker-track');

  // ✅ 4. Generate ticker HTML
  const stockHTML = stocks.map(stock => {
    const isUp = stock.change.includes('+');

    return `
      <div class="stock-item">
        <span class="symbol">${stock.symbol}</span>
        <span class="price">₹${stock.price}</span>
        <span class="change ${isUp ? 'up' : 'down'}">
          ${isUp ? '▲' : '▼'} ${stock.change}
        </span>
      </div>
    `;
  }).join('');

  // ✅ 5. Duplicate for seamless scrolling
  ticker.innerHTML = stockHTML + stockHTML;
}

// Initialize after DOM is ready (important for EDS)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createTicker);
} else {
  createTicker();
}
