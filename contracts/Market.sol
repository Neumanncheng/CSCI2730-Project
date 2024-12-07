// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract market {
    uint private productCount = 0;
    Product[] private products;
    address payable private owner;

    struct Product {
        uint id;
        string name;
        string description; // Corrected spelling
        uint timestamp;
        uint price; // Consider using uint256
        address payable seller;
        bool purchased;
    }

    event ProductUploaded(
        uint id,
        string name,
        string description,
        uint timestamp,
        uint price,
        address payable seller
    );

    event ProductPurchased(
        uint id,
        string name,
        string description,
        uint timestamp,
        uint price,
        address payable seller
    );

    constructor() {
        owner = payable(msg.sender);
    }

    // Upload product
    function uploadProduct(
        string memory _name,
        uint _price,
        string memory _description // Corrected spelling
    ) public {
        require(bytes(_name).length > 0, "Invalid name");
        require(_price > 0, "Price must be greater than 0");

        productCount++;
        products.push(
            Product(
                productCount,
                _name,
                _description,
                block.timestamp,
                _price,
                payable(msg.sender),
                false
            )
        );

        emit ProductUploaded(
            productCount,
            _name,
            _description,
            block.timestamp,
            _price,
            payable(msg.sender)
        );
    }

    // Buy product
    function buyProduct(uint productId) public payable {
        Product storage _product = products[productId - 1];
        address payable _seller = _product.seller;

        require(!_product.purchased, "Product already sold");
        require(_seller != msg.sender, "Cannot buy your own product");
        require(msg.value >= _product.price, "Insufficient funds");

        _product.purchased = true;
        _seller.transfer(_product.price);

        emit ProductPurchased(
            _product.id,
            _product.name,
            _product.description, // Corrected spelling
            block.timestamp,
            _product.price,
            _product.seller
        );
    }

    function getProducts() public view returns (Product[] memory) {
        return products;
    }
}
