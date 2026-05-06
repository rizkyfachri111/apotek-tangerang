# Web3 Pharmacy

Toko obat berbasis blockchain dengan pembayaran USDT.

## Fitur

- **Web3 Integration**: MetaMask wallet connection
- **Pembayaran USDT**: Stablecoin untuk transaksi
- **IPFS Storage**: Data produk terdesentralisasi
- **Smart Contract**: Order management di blockchain

## Struktur Project

```
web3-pharmacy/
├── index.html          # Halaman utama
├── products.html       # Daftar produk
├── orders.html         # Riwayat pesanan
├── css/
│   └── style.css       # Styling
├── js/
│   ├── main.js         # Web3 integration
│   ├── products.js     # Product page logic
│   └── orders.js       # Order history
├── contracts/
│   └── Pharmacy.sol    # Smart contract
└── data/
    └── products.json   # Sample product data
```

## Development Setup

1. **Install dependencies:**
```bash
npm install -g live-server
```

2. **Run local server:**
```bash
live-server --port=3000
```

3. **Akses:** `http://localhost:3000`

## Smart Contract Deployment

Contract menggunakan Sepolia testnet. Deploy dengan Hardhat:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

## Wallet Setup

1. Install MetaMask extension
2. Add Sepolia testnet
3. Get test ETH dari faucet: https://sepoliafaucet.com
4. Get test USDT dari faucet

## TODO

- [ ] Smart contract deployment
- [ ] IPFS integration
- [ ] Real USDT contract address
- [ ] Prescription upload ke IPFS
- [ ] Email notifications

## Disclaimer

⚠️ **PROTOTIPE DEVELOPMENT** - Tidak untuk transaksi riil. Obat keras memerlukan verifikasi dokter yang sesuai regulasi BPOM Indonesia.