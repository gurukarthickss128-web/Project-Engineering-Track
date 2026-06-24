import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

import {
  SkeletonCard,
  ErrorMessage,
  EmptyState
} from "../components/states";

const Products = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch
  } = useProducts();

  // Loading State
  if (isLoading) {
    return (
      <div className="p-8">
        <SkeletonCard count={6} />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <ErrorMessage
        message="Inventory failed to load. Retry."
        onRetry={refetch}
      />
    );
  }

  // Empty State
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No Products Found"
        message="Add your first product to get started."
        actionLabel="Add Product"
        onAction={() => window.location.reload()}
      />
    );
  }

  // Data State
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
          Product Inventory
        </h1>

        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors">
            Filter
          </button>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            Add Product
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;