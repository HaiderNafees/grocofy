'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { ordersAPI } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export function OrdersSection() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await ordersAPI.getAll();
      setOrders(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  );

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      await ordersAPI.update(orderId, { status: newStatus });
      await fetchOrders(); // Refresh orders
      toast({
        title: 'Success',
        description: `Order status updated to ${newStatus}`,
      });
    } catch (error) {
      console.error('Error updating order status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update order status',
        variant: 'destructive',
      });
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Orders Management</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Filter by status:</span>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{order.customerEmail}</TableCell>
                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>
                      <Badge className={statusColors[order.status]}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Order Details - {order.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-2">Customer Information</h4>
                                    <p className="text-sm"><strong>Name:</strong> {selectedOrder.customerName}</p>
                                    <p className="text-sm"><strong>Email:</strong> {selectedOrder.customerEmail}</p>
                                    <p className="text-sm"><strong>Phone:</strong> {selectedOrder.customerPhone}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Shipping Address</h4>
                                    <p className="text-sm">{selectedOrder.shippingAddress.street}</p>
                                    <p className="text-sm">
                                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                                    </p>
                                    <p className="text-sm">{selectedOrder.shippingAddress.country}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-semibold mb-2">Order Items</h4>
                                  <div className="space-y-2">
                                    {selectedOrder.items.map((item, index) => (
                                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                                        <div>
                                          <p className="font-medium">{item.name}</p>
                                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold">Total Amount:</span>
                                      <span className="font-bold text-lg">${selectedOrder.totalAmount.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Update Status</h4>
                                  <div className="flex gap-2">
                                    <Select
                                      value={selectedOrder.status}
                                      onValueChange={(value) => {
                                        updateOrderStatus(selectedOrder.id, value as Order['status']);
                                        setSelectedOrder(prev => prev ? { ...prev, status: value as Order['status'] } : null);
                                      }}
                                    >
                                      <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="processing">Processing</SelectItem>
                                        <SelectItem value="shipped">Shipped</SelectItem>
                                        <SelectItem value="delivered">Delivered</SelectItem>
                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        
                        <Select
                          value={order.status}
                          onValueChange={(value) => updateOrderStatus(order.id, value as Order['status'])}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
