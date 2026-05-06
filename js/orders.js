// Orders Page JavaScript
// Displays user's order history from blockchain

const OrdersPage = {
    orders: [],
    
    // Sample order data (would come from smart contract in production)
    sampleOrders: [
        {
            id: 'ORDER-001',
            product_name: 'Paracetamol 500mg',
            price_usdt: 2.50,
            status: 'delivered',
            date: '2026-01-15',
            tx_hash: '0xabc123...'
        },
        {
            id: 'ORDER-002',
            product_name: 'Vitamin C 1000mg',
            price_usdt: 8.50,
            status: 'shipped',
            date: '2026-01-10',
            tx_hash: '0xdef456...'
        },
        {
            id: 'ORDER-003',
            product_name: 'Obat Lambung 300mg',
            price_usdt: 15.00,
            status: 'paid',
            date: '2026-01-05',
            tx_hash: '0xghi789...'
        }
    ],

    // Load orders from blockchain
    async loadOrders() {
        try {
            // In production: fetch from smart contract
            // this.orders = await this.contract.methods.getOrdersByUser(wallet).call();
            
            // For development, use sample data
            this.orders = this.sampleOrders;
            this.renderOrders();
        } catch (error) {
            console.error('Error loading orders:', error);
        }
    },

    // Render orders table
    renderOrders() {
        const tbody = document.getElementById('ordersBody');
        
        if (this.orders.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4">Belum ada pesanan</td></tr>';
            return;
        }

        tbody.innerHTML = this.orders.map(order => `
            <tr class="status-${order.status}">
                <td>${order.id}</td>
                <td>${order.product_name}</td>
                <td>${order.price_usdt} USDT</td>
                <td>
                    <span class="badge bg-${this.getStatusColor(order.status)}">
                        ${this.getStatusText(order.status)}
                    </span>
                </td>
                <td>
                    <a href="https://sepolia.etherscan.io/tx/${order.tx_hash}" target="_blank">
                        ${order.tx_hash.substring(0, 10)}...
                    </a>
                </td>
            </tr>
        `).join('');
    },

    // Get status color
    getStatusColor(status) {
        const colors = {
            pending: 'secondary',
            paid: 'warning',
            shipped: 'info',
            delivered: 'success',
            cancelled: 'danger'
        };
        return colors[status] || 'secondary';
    },

    // Get status text
    getStatusText(status) {
        const texts = {
            pending: 'Menunggu Pembayaran',
            paid: 'Sudah Dibayar',
            shipped: 'Dikirim',
            delivered: 'Diterima',
            cancelled: 'Dibatalkan'
        };
        return texts[status] || status;
    },

    // Initialize
    init() {
        this.loadOrders();
    }
};

document.addEventListener('DOMContentLoaded', () => OrdersPage.init());