
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProducts } from '@/hooks/use-products';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ProductForm } from './product-form';
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  const { deleteProduct } = useProducts();
  const { toast } = useToast();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete.id);
      toast({
        title: 'Product Deleted',
        description: `${productToDelete.name} has been removed.`,
        variant: 'destructive',
      });
      setProductToDelete(null);
    }
  };

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>Rs. {product.price.toLocaleString()}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  <Dialog open={!!productToEdit && productToEdit.id === product.id} onOpenChange={(isOpen) => !isOpen && setProductToEdit(null)}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setProductToEdit(product)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>
                        <ProductForm productToEdit={productToEdit} onFinishEditing={() => setProductToEdit(null)} />
                    </DialogContent>
                  </Dialog>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setProductToDelete(product)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog
        open={!!productToDelete}
        onOpenChange={() => setProductToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product "{productToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
