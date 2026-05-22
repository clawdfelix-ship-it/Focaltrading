import os, re, json

products_dir = "../honour-com-hk/en/product"
product_images = {}

for filename in os.listdir(products_dir):
    if filename == 'index.html':
        continue
    product_path = os.path.join(products_dir, filename, 'index.html')
    if os.path.exists(product_path):
        with open(product_path, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        img_matches = re.findall(r'src="(/en/wp-content/uploads/[^"]+)"', content)
        if img_matches:
            main_imgs = [m for m in img_matches if '150x150' not in m and '100x100' not in m and '300x300' not in m]
            if main_imgs:
                product_images[filename] = main_imgs[0].replace('/en/wp-content/uploads/', '/')

with open('src/content/products.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for product in data['products']:
    slug = product['slug']
    if slug in product_images:
        product['images'] = [product_images[slug]]

with open('src/content/products.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

for slug, path in product_images.items():
    print(f"{slug}: {path}")
print(f"\nUpdated {len(product_images)} products")