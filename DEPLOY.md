# Web3 Pharmacy - Deploy Manual

## Cara Deploy ke Internet (Gratis, 2 menit)

### Option 1: Netlify Drop (PALING CEPAT)
1. Buka di HP atau PC: **https://app.netlify.com/drop**
2. Klik "Drag & drop your site output"
3. **Drag semua file** dari folder `web3-pharmacy` ke browser
4. Tunggu 30 detik - dapat URL seperti: `https://web3-pharmacy-xyz.netlify.app`

### Option 2: GitHub Pages
1. Buka: **https://github.com/new**
2. Buat repo baru: `web3-pharmacy` (public)
3. Upload semua file dari folder `/home/ubuntu/web3-pharmacy`
4. Settings → Pages → Source: `Deploy from branch: main`
5. URL: `https://[username].github.io/web3-pharmacy`

### Option 3: Vercel
1. Buka: **https://vercel.com/new**
2. Import project atau drag folder
3. Deploy otomatis

## Struktur File yang Perlu Diupload:
```
web3-pharmacy/
├── index.html          (beranda modern)
├── products.html       (daftar obat)
├── orders.html         (riwayat pesanan)
├── css/style.css       (styling modern)
├── js/main.js          (web3 wallet)
├── js/products.js      (produk grid)
├── js/orders.js        (order history)
├── contracts/Pharmacy.sol (smart contract)
├── data/products.json  (data obat)
└── README.md
```

## Setelah Deploy:
- Buka URL dari HP
- Klik "Hubungkan Wallet" 
- Pilih produk → Beli dengan USDT (simulasi)