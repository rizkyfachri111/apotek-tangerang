// Web3 Pharmacy - Main JavaScript
// Development version - uses testnet

const Web3Pharmacy = {
    // Configuration
    config: {
        contractAddress: null, // Will be set after deployment
        usdtAddress: "0x...", // USDT contract on testnet
        rpcUrl: "https://rpc.ankr.com/eth_sepolia", // Sepolia testnet
        ipfsGateway: "https://ipfs.io/ipfs/",
        chainId: 11155111 // Sepolia
    },

    // State
    state: {
        web3: null,
        contract: null,
        userWallet: null,
        userBalance: 0
    },

    // Initialize Web3
    async init() {
        if (typeof window.ethereum !== 'undefined') {
            this.state.web3 = new Web3(window.ethereum);
            await this.checkConnection();
        } else {
            this.showNotification('MetaMask tidak terdeteksi. Install dulu!', 'warning');
        }
    },

    // Connect Wallet
    async connectWallet() {
        try {
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
            });
            
            this.state.userWallet = accounts[0];
            document.getElementById('connectWallet').classList.add('d-none');
            document.getElementById('walletAddress').classList.remove('d-none');
            document.getElementById('walletAddress').textContent = 
                this.state.userWallet.substring(0, 6) + '...' + this.state.userWallet.substring(38);
            
            // Switch to correct network
            await this.switchNetwork();
            
            // Get USDT balance
            await this.updateBalance();
            
            this.showNotification('Wallet terhubung! ' + this.state.userWallet.substring(0, 6) + '...', 'success');
        } catch (error) {
            console.error('Wallet connection error:', error);
            this.showNotification('Gagal hubungkan wallet: ' + error.message, 'error');
        }
    },

    // Switch Network
    async switchNetwork() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xaa36a7' }], // Sepolia
            });
        } catch (switchError) {
            // Network not added, add it
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: '0xaa36a7',
                    chainName: 'Sepolia Testnet',
                    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                    rpcUrls: ['https://rpc.ankr.com/eth_sepolia'],
                    blockExplorerUrls: ['https://sepolia.etherscan.io/']
                }],
            });
        }
    },

    // Check existing connection
    async checkConnection() {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
            this.state.userWallet = accounts[0];
            document.getElementById('connectWallet').classList.add('d-none');
            document.getElementById('walletAddress').classList.remove('d-none');
            document.getElementById('walletAddress').textContent = 
                this.state.userWallet.substring(0, 6) + '...' + this.state.userWallet.substring(38);
        }
    },

    // Update USDT Balance
    async updateBalance() {
        // Placeholder - would integrate with USDT contract
        console.log('Balance update placeholder');
    },

    // Fetch products from IPFS
    async fetchProducts() {
        // Placeholder - would fetch from IPFS
        return [];
    },

    // Show notification
    showNotification(message, type = 'info') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.zIndex = '9999';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alertDiv);
        
        setTimeout(() => alertDiv.remove(), 5000);
    },

    // Purchase medicine
    async purchaseMedicine(productId, priceUSDT) {
        // Placeholder - would call smart contract
        console.log('Purchase:', productId, priceUSDT);
        this.showNotification('Fitur pembelian akan diintegrasikan dengan smart contract', 'info');
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Setup wallet button
    const connectBtn = document.getElementById('connectWallet');
    if (connectBtn) {
        connectBtn.addEventListener('click', () => Web3Pharmacy.connectWallet());
    }
    
    // Initialize Web3
    Web3Pharmacy.init();
});