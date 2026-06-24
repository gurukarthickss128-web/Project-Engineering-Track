import React from 'react';
import { useOrders } from '../hooks/useOrders';
import OrderCard from '../components/OrderCard';

import {
  SkeletonCard,
  ErrorMessage,
  EmptyState
} from "../components/states";

const Orders = () => {
  const {
    data: orders,
    isLoading,
    error,
    refetch
  } = useOrders();

  // Loading State
  if (isLoading) {
    return (
      <div className="p-8">
        <SkeletonCard count={4} />
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <ErrorMessage
        message="We couldn't load your orders. Try again."
        onRetry={refetch}
      />
    );
  }

  // Empty State
  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        title="No Orders Yet"
        message="You haven't received any orders yet."
        actionLabel="Refresh"
        onAction={refetch}
      />
    );
  }

  // Data State
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Recent Orders
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;