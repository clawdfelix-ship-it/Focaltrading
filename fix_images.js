const fs = require('fs');
const path = require('path');

const productsDir = '../honour-com-hk/en/product';
const productImages = {};

const files = fs.readdirSync(productsDir);
files.forEach(filename => {
  if (filename === 'index.html') return;
  const filePath = path.join(productsDir, filename, 'index.html');
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const imgMatches = content.match(/src="(\/en\/wp-content\/uploads\/[^"]+)"/g) || [];
    const mainImgs = imgMatches.filter(m => !m.includes('150x150') && !m.includes('100x100') && !m.includes('300x300'));
    if (mainImgs.length > 0) {
      const match = mainImgs[0].match(/src="([^"]+)"/);
      if (match) {
        productImages[filename] = match[1].replace('/en/wp-content/uploads/', '/');
      }
    }
  }
});

const productsJson = JSON.parse(fs.readFileSync('src/content/products.json', 'utf8'));
productsJson.products.forEach(product => {
  if (productImages[product.slug]) {
    product.images = [productImages[product.slug]];
  }
});

fs.writeFileSync('src/content/products.json', JSON.stringify(productsJson, null, 2));

Object.keys(productImages).forEach(slug => console.log(`${slug}: ${productImages[slug]}`));
console.log(`\nUpdated ${Object.keys(productImages).length} products`);