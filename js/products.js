// Products Page JavaScript
// Fetches product data and renders the grid

const ProductsPage = {
    products: [],
    
    // Sample product data (would come from IPFS in production)
    sampleProducts: [
        {
            id: 'paracetamol-500',
            name: 'Paracetamol 500mg',
            category: 'otc',
            price_usdt: 2.50,
            stock: 100,
            requires_prescription: false,
            description: 'Untuk mengurangi demam dan nyeri',
            image: 'https://placehold.co/300x200/4CAF50/FFFFFF?text=PARACETAMOL'
        },
        {
            id: 'obat-lambung',
            name: 'Obat Lambung 300mg',
            category: 'prescription',
            price_usdt: 15.00,
            stock: 50,
            requires_prescription: true,
            description: 'Untuk masalah lambung - butuh resep dokter',
            image: 'https://placehold.co/300x200/FF9800/FFFFFF?text=OBAT+LAMBUNG'
        },
        {
            id: 'vitamin-c',
            name: 'Vitamin C 1000mg',
            category: 'vitamin',
            price_usdt: 8.50,
            stock: 200,
            requires_prescription: false,
            description: 'Suplemen vitamin C untuk daya tahan tubuh',
            image: 'https://placehold.co/300x200/2196F3/FFFFFF?text=VITAMIN+C'
        },
        {
            id: 'antibiotik-a',
            name: 'Antibiotik A 250mg',
            category: 'prescription',
            price_usdt: 25.00,
            stock: 30,
            requires_prescription: true,
            description: 'Antibiotik untuk infeksi bacterial - WAJIB RESEP DOKTER',
            image: 'https://placehold.co/300x200/F44336/FFFFFF?text=ANTIBIOTIK'
        },
        {
            id: 'salep-luka',
            name: 'Salep Luka 15gr',
            category: 'otc',
            price_usdt: 12.00,
            stock: 75,
            requires_prescription: false,
            description: 'Untuk mempercepat penyembuhan luka',
            image: 'https://placehold.co/300x200/9C27B0/FFFFFF?text=SALEP+Luka'
        },
        {
            id: 'obat-diabetes',
            name: 'Obat Diabetes 500mg',
            category: 'prescription',
            price_usdt: 35.00,
            stock: 25,
            requires_prescription: true,
            description: 'Untuk mengontrol kadar gula darah - WAJIB RESEP DOKTER',
            image: 'https://placehold.co/300x200/FF5722/FFFFFF?text=DIABETES'
        }
    ],

    // Load products
    async loadProducts() {
        try {
            // In production, fetch from IPFS:
            // const response = await fetch(`${Web3Pharmacy.config.ipfsGateway}${IPFS_HASH}`);
            // this.products = await response.json();
            
            // For development, use sample data
            this.products = this.sampleProducts;
            this.renderProducts();
        } catch (error) {
            console.error('Error loading products:', error);
            document.getElementById('productGrid').innerHTML = 
                '<div class="col-12 text-center py-5"><p class="text-danger">Gagal memuat produk</p></div>';
        }
    },

    // Render product grid
    renderProducts() {
        const grid = document.getElementById('productGrid');
        const category = document.getElementById('categoryFilter').value;
        const search = document.getElementById('searchProduct').value.toLowerCase();

        let filtered = this.products.filter(p => {
            const matchesCategory = category === 'all' || p.category === category;
            const matchesSearch = p.name.toLowerCase().includes(search);
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center py-5"><p>Tidak ada produk ditemukan</p></div>';
            return;
        }

        grid.innerHTML = filtered.map(product => `
            <div class="col-md-4 mb-4">
                <div class="card product-card">
                    <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text text-muted small">${product.description}</p>
                        <div class="mt-auto">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="fw-bold text-primary">${product.price_usdt} USDT</span>
                                ${product.requires_prescription 
                                    ? '<span class="badge bg-warning">Butuh Resep</span>'
                                    : '<span class="badge bg-success">Bisa Langsung</span>'
                                }
                            </div>
                            <button class="btn btn-primary w-100" onclick="ProductsPage.buyProduct('${product.id}')">
                                <i class="bi bi-cart-plus"></i> Beli
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    },

    // Buy product - Show purchase options modal
    buyProduct(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        if (product.requires_prescription) {
            // Show prescription modal
            const modal = new bootstrap.Modal(document.getElementById('prescriptionModal'));
            modal.show();
            return;
        }

        // Create purchase options modal
        const modalHtml = `
            <div class="modal fade" id="buyOptionsModal" tabindex="-1">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content border-0 shadow">
                        <div class="modal-header border-0 pb-0">
                            <h5 class="modal-title fw-bold">
                                <i class="bi bi-cart-check text-primary me-2"></i>
                                Beli ${product.name}
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p class="text-muted mb-3">Pilih cara pembelian:</p>
                            <div class="d-grid gap-2">
                                <a href="https://shopee.co.id/search?keyword=${encodeURIComponent(product.name)}" 
                                   target="_blank" class="btn btn-primary">
                                    <i class="bi bi-bag me-2"></i>Beli di Shopee
                                </a>
                                <a href="https://vt.tiktok.com/link" target="_blank" class="btn btn-dark">
                                    <i class="bi bi-tiktok me-2"></i>Beli di TikTok Shop
                                </a>
                                <a href="https://wa.me/6281234567890?text=Halo%20Web3%20Pharmacy%2C%20saya%20ingin%20membeli%20${encodeURIComponent(product.name)}" 
                                   target="_blank" class="btn btn-success">
                                    <i class="bi bi-whatsapp me-2"></i>Beli via WhatsApp
                                </a>
                                <!-- Ganti 6281234567890 dengan nomor WA Anda -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('buyOptionsModal');
        if (existingModal) existingModal.remove();
        
        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('buyOptionsModal'));
        modal.show();
    },

    // Initialize
    init() {
        document.getElementById('searchProduct').addEventListener('input', () => this.renderProducts());
        document.getElementById('categoryFilter').addEventListener('change', () => this.renderProducts());
    }
};

// Load on page ready
document.addEventListener('DOMContentLoaded', () => {
    ProductsPage.init();
    ProductsPage.loadProducts();
});