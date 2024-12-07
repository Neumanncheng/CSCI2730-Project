import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

const Sell = ({ contract }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const uploadProduct = async () => {
    if (!name || !description || !price) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const transaction = await contract.uploadProduct(
        name,
        ethers.utils.parseEther(price),
        description
      );
      await transaction.wait();
      alert("Product listed successfully!");
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error("Error listing product:", error);
      alert("Transaction failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Product</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Product Description</Label>
            <Input
              id="description"
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="price">Price in ETH</Label>
            <Input
              id="price"
              type="number"
              placeholder="Price in ETH"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <Button onClick={uploadProduct} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Product'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Sell;