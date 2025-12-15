'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Edit2, Save, X, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Load addresses from localStorage
    if (user) {
      const savedAddresses = localStorage.getItem(`addresses_${user.email}`);
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      } else {
        // Add default address if none exist
        const defaultAddress: Address = {
          id: '1',
          type: 'home',
          street: '123 Main Street',
          city: 'Karachi',
          province: 'Sindh',
          postalCode: '75000',
          country: 'Pakistan',
          phone: '+92 300 1234567',
          isDefault: true
        };
        setAddresses([defaultAddress]);
      }
      setIsLoading(false);
    }
  }, [user]);

  const saveAddresses = (updatedAddresses: Address[]) => {
    if (user) {
      localStorage.setItem(`addresses_${user.email}`, JSON.stringify(updatedAddresses));
      setAddresses(updatedAddresses);
    }
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsAddingNew(false);
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsAddingNew(false);
  };

  const handleSave = (id: string, formData: Partial<Address>) => {
    const updatedAddresses = addresses.map(addr => 
      addr.id === id ? { ...addr, ...formData } : addr
    );
    saveAddresses(updatedAddresses);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    saveAddresses(updatedAddresses);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingId(null);
  };

  const handleSaveNew = (formData: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...formData,
      id: Date.now().toString(),
    };
    saveAddresses([...addresses, newAddress]);
    setIsAddingNew(false);
  };

  const setDefaultAddress = (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    saveAddresses(updatedAddresses);
  };

  if (loading || !user || isLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center gap-4 mb-10">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-1/4" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="flex items-center gap-4 mb-10">
        <Link href="/account" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-4xl font-serif">My addresses</h1>
      </div>

      <div className="space-y-6">
        {addresses.map((address) => (
          <Card key={address.id} className="relative">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg capitalize flex items-center gap-2">
                    {address.type}
                    {address.isDefault && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </CardTitle>
                </div>
                <div className="flex gap-2">
                  {editingId === address.id ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => {
                          const form = document.getElementById(`form-${address.id}`) as HTMLFormElement;
                          if (form) {
                            const formData = new FormData(form);
                            handleSave(address.id, {
                              type: formData.get('type') as Address['type'],
                              street: formData.get('street') as string,
                              city: formData.get('city') as string,
                              province: formData.get('province') as string,
                              postalCode: formData.get('postalCode') as string,
                              country: formData.get('country') as string,
                              phone: formData.get('phone') as string,
                            });
                          }
                        }}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(address.id)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(address.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {editingId === address.id ? (
                <form id={`form-${address.id}`} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`type-${address.id}`}>Address Type</Label>
                      <select
                        id={`type-${address.id}`}
                        name="type"
                        defaultValue={address.type}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor={`phone-${address.id}`}>Phone</Label>
                      <Input
                        id={`phone-${address.id}`}
                        name="phone"
                        defaultValue={address.phone}
                        placeholder="+92 300 1234567"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`street-${address.id}`}>Street Address</Label>
                    <Input
                      id={`street-${address.id}`}
                      name="street"
                      defaultValue={address.street}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`city-${address.id}`}>City</Label>
                      <Input
                        id={`city-${address.id}`}
                        name="city"
                        defaultValue={address.city}
                        placeholder="Karachi"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`province-${address.id}`}>Province</Label>
                      <Input
                        id={`province-${address.id}`}
                        name="province"
                        defaultValue={address.province}
                        placeholder="Sindh"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`postal-${address.id}`}>Postal Code</Label>
                      <Input
                        id={`postal-${address.id}`}
                        name="postalCode"
                        defaultValue={address.postalCode}
                        placeholder="75000"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`country-${address.id}`}>Country</Label>
                    <Input
                      id={`country-${address.id}`}
                      name="country"
                      defaultValue={address.country}
                      placeholder="Pakistan"
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm">{address.street}</p>
                  <p className="text-sm">{address.city}, {address.province} {address.postalCode}</p>
                  <p className="text-sm">{address.country}</p>
                  <p className="text-sm">{address.phone}</p>
                  {!address.isDefault && (
                    <Button
                      variant="link"
                      className="p-0 h-auto text-sm"
                      onClick={() => setDefaultAddress(address.id)}
                    >
                      Set as default address
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {isAddingNew && (
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">Add New Address</CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      const form = document.getElementById('new-address-form') as HTMLFormElement;
                      if (form) {
                        const formData = new FormData(form);
                        handleSaveNew({
                          type: formData.get('type') as Address['type'],
                          street: formData.get('street') as string,
                          city: formData.get('city') as string,
                          province: formData.get('province') as string,
                          postalCode: formData.get('postalCode') as string,
                          country: formData.get('country') as string,
                          phone: formData.get('phone') as string,
                          isDefault: false,
                        });
                      }
                    }}
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form id="new-address-form" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new-type">Address Type</Label>
                    <select
                      id="new-type"
                      name="type"
                      defaultValue="home"
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="new-phone">Phone</Label>
                    <Input
                      id="new-phone"
                      name="phone"
                      placeholder="+92 300 1234567"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-street">Street Address</Label>
                  <Input
                    id="new-street"
                    name="street"
                    placeholder="123 Main Street"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="new-city">City</Label>
                    <Input
                      id="new-city"
                      name="city"
                      placeholder="Karachi"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-province">Province</Label>
                    <Input
                      id="new-province"
                      name="province"
                      placeholder="Sindh"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-postal">Postal Code</Label>
                    <Input
                      id="new-postal"
                      name="postalCode"
                      placeholder="75000"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="new-country">Country</Label>
                  <Input
                    id="new-country"
                    name="country"
                    placeholder="Pakistan"
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {!isAddingNew && (
          <Button onClick={handleAddNew} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
        )}
      </div>
    </div>
  );
}
