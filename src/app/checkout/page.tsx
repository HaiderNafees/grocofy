"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const dynamic = 'force-dynamic';

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("payfast");
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState("ship");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const shippingCost = shippingMethod === "standard" ? 160 : 380;
  const subtotal = totalPrice;
  const total = subtotal + shippingCost;

  if (!isClient) {
    return (
      <div className="container py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-8 w-32"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some products to your cart before checking out.</p>
        <Button asChild>
          <a href="/">Continue Shopping</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Checkout Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
            </CardContent>
          </Card>

          {/* Delivery Method */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Details</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ship" id="ship" />
                  <Label htmlFor="ship">Ship</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Pick up</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Shipping Address */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="country">Country/Region</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pakistan">Pakistan</SelectItem>
                    <SelectItem value="usa">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main Street" />
              </div>
              
              <div>
                <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                <Input id="apartment" placeholder="Apt 4B" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Karachi" />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input id="postalCode" placeholder="75000" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="+92 300 1234567" />
              </div>
            </CardContent>
          </Card>

          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard</Label>
                  </div>
                  <span className="font-medium">Rs. {shippingCost}.00</span>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express">Express</Label>
                  </div>
                  <span className="font-medium">Rs. 380.00</span>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="payfast" id="payfast" />
                  <Label htmlFor="payfast">PAYFAST via Debit/Credit/Wallet/Bank Account</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="bank" id="bank" />
                  <Label htmlFor="bank">Bank Deposit</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Billing Address */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="sameAsShipping" 
                  checked={billingSameAsShipping}
                  onCheckedChange={(checked) => setBillingSameAsShipping(checked as boolean)}
                />
                <Label htmlFor="sameAsShipping">Same as shipping address</Label>
              </div>
              
              {!billingSameAsShipping && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingFirstName">First Name</Label>
                      <Input id="billingFirstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="billingLastName">Last Name</Label>
                      <Input id="billingLastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="billingAddress">Address</Label>
                    <Input id="billingAddress" placeholder="123 Main Street" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="billingCity">City</Label>
                      <Input id="billingCity" placeholder="Karachi" />
                    </div>
                    <div>
                      <Label htmlFor="billingPostalCode">Postal Code</Label>
                      <Input id="billingPostalCode" placeholder="75000" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pay Now Button */}
          <Button size="lg" className="w-full">
            Pay now
          </Button>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Gift Card */}
              <div>
                <Label htmlFor="giftCard">Gift card or discount code</Label>
                <div className="flex space-x-2 mt-2">
                  <Input id="giftCard" placeholder="Enter code" />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Separator />

              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal.toLocaleString()}.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Rs. {shippingCost}.00</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Rs. {total.toLocaleString()}.00</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
