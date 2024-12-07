import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const Buy = ({ contract }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await contract.getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products. Check console for details.");
      } finally {
        setLoading(false);
      }
    };

    if (contract) {
      loadProducts();
    }
  }, [contract]);

  const buyProduct = async (productId, price) => {
    try {
      const transaction = await contract.buyProduct(productId, { value: price });
      await transaction.wait();
      alert("Product purchased successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error purchasing product:", error);
      alert("Transaction failed. Check console for details.");
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <p>Loading products...</p>
      ) : (
        products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <p className="font-bold mb-4">Price: {ethers.utils.formatEther(product.price)} ETH</p>
              <Button onClick={() => buyProduct(product.id, product.price)}>Buy</Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default Buy;