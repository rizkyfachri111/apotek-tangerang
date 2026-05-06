// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * Web3 Pharmacy Smart Contract
 * Handles medicine purchases with USDT payment
 * 
 * NOTE: This is a simplified version for development
 * For production, needs proper access controls and security audits
 */
contract Web3Pharmacy {
    // USDT interface for payment
    interface IUSDT {
        function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
        function approve(address spender, uint256 amount) external returns (bool);
    }
    
    struct Medicine {
        string id;
        string name;
        string description;
        uint256 priceUSDT; // Price in USDT (6 decimals)
        bool requiresPrescription;
        uint256 stock;
    }
    
    struct Order {
        uint256 id;
        address buyer;
        string productId;
        uint256 priceUSDT;
        string prescriptionCID; // IPFS hash for prescription image
        OrderStatus status;
        uint256 timestamp;
    }
    
    enum OrderStatus { Pending, Paid, Shipped, Delivered, Cancelled }
    
    mapping(string => Medicine) public medicines;
    mapping(uint256 => Order) public orders;
    mapping(address => uint256[]) public userOrders;
    
    uint256 public nextOrderId = 1;
    address public usdtAddress;
    address public owner;
    
    event MedicineAdded(string indexed id, string name, uint256 price);
    event OrderCreated(uint256 indexed orderId, address buyer, string productId);
    event OrderPaid(uint256 indexed orderId);
    event OrderStatusUpdated(uint256 indexed orderId, OrderStatus status);
    
    constructor(address _usdtAddress) {
        usdtAddress = _usdtAddress;
        owner = msg.sender;
    }
    
    /**
     * @dev Add new medicine (owner only)
     */
    function addMedicine(
        string memory _id,
        string memory _name,
        string memory _description,
        uint256 _priceUSDT,
        bool _requiresPrescription,
        uint256 _stock
    ) public {
        require(msg.sender == owner, "Only owner can add medicine");
        
        medicines[_id] = Medicine({
            id: _id,
            name: _name,
            description: _description,
            priceUSDT: _priceUSDT,
            requiresPrescription: _requiresPrescription,
            stock: _stock
        });
        
        emit MedicineAdded(_id, _name, _priceUSDT);
    }
    
    /**
     * @dev Create new order
     */
    function createOrder(
        string memory _productId,
        string memory _prescriptionCID
    ) public returns (uint256) {
        Medicine storage medicine = medicines[_productId];
        require(bytes(medicine.id).length > 0, "Medicine not found");
        require(medicine.stock > 0, "Out of stock");
        
        if (medicine.requiresPrescription) {
            require(bytes(_prescriptionCID).length > 0, "Prescription required");
        }
        
        uint256 orderId = nextOrderId++;
        
        orders[orderId] = Order({
            id: orderId,
            buyer: msg.sender,
            productId: _productId,
            priceUSDT: medicine.priceUSDT,
            prescriptionCID: _prescriptionCID,
            status: OrderStatus.Pending,
            timestamp: block.timestamp
        });
        
        userOrders[msg.sender].push(orderId);
        
        emit OrderCreated(orderId, msg.sender, _productId);
        return orderId;
    }
    
    /**
     * @dev Pay for order with USDT
     */
    function payOrder(uint256 _orderId) public {
        Order storage order = orders[_orderId];
        require(order.buyer == msg.sender, "Not your order");
        require(order.status == OrderStatus.Pending, "Order not pending");
        
        IUSDT(usdtAddress).transferFrom(
            msg.sender,
            address(this),
            order.priceUSDT * 10**6 // USDT has 6 decimals
        );
        
        order.status = OrderStatus.Paid;
        emit OrderPaid(_orderId);
    }
    
    /**
     * @dev Update order status (owner only)
     */
    function updateOrderStatus(uint256 _orderId, OrderStatus _status) public {
        require(msg.sender == owner, "Only owner can update status");
        orders[_orderId].status = _status;
        emit OrderStatusUpdated(_orderId, _status);
    }
    
    /**
     * @dev Get user orders
     */
    function getUserOrders(address _user) public view returns (uint256[] memory) {
        return userOrders[_user];
    }
    
    /**
     * @dev Get order details
     */
    function getOrder(uint256 _orderId) public view returns (Order memory) {
        return orders[_orderId];
    }
    
    /**
     * @dev Get medicine details
     */
    function getMedicine(string memory _id) public view returns (Medicine memory) {
        return medicines[_id];
    }
}