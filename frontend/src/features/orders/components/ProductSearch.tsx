import React, { useState } from 'react';
import { Product } from '../types/products';

interface ProductSearchProps {
  onAddToCart: (product: Product) => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {/* Aquí iría la lista de productos filtrados */}
    </div>
  );
};

export default ProductSearch; 