export default async function decorate(block) {
  // Read config from da.live table
  const config = {};
  [...block.children].forEach((row) => {
    const key = row.children[0]?.textContent?.trim();
    const value = row.children[1]?.textContent?.trim();
    if (key && value) config[key] = value;
  });

  const endpoint = config.endpoint;
  const limit = Number(config.limit || 6);

  if (!endpoint) {
    block.innerHTML = '<p>Endpoint not configured</p>';
    return;
  }

  // Show loader
  block.innerHTML = '<p>Loading products…</p>';

  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('API failed');

    const json = await response.json();
    const products = json.products.slice(0, limit);

    block.innerHTML = `
      <div class="products-grid">
        ${products.map(product => `
          <div class="product-card">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p class="price">$${product.price}</p>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    console.error(error);
    block.innerHTML = '<p>Failed to load products</p>';
  }
}
