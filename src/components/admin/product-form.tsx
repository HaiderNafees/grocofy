
'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useProducts } from '@/hooks/use-products';
import { type Product } from '@/lib/types';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().url('Must be a valid URL').or(z.literal('')),
  imageHint: z.string().optional(),
  isNew: z.boolean().optional(),
  soldOut: z.boolean().optional(),
});

type ProductFormData = z.infer<typeof formSchema>;

interface ProductFormProps {
  productToEdit?: Product | null;
  onFinishEditing?: () => void;
}

export function ProductForm({ productToEdit, onFinishEditing }: ProductFormProps) {
  const { addProduct, updateProduct } = useProducts();
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      category: '',
      image: '',
      imageHint: '',
      isNew: false,
      soldOut: false,
    },
  });

  useEffect(() => {
    if (productToEdit) {
      form.reset(productToEdit);
    } else {
      form.reset({
        name: '',
        price: 0,
        category: '',
        image: '',
        imageHint: '',
        isNew: false,
        soldOut: false,
      });
    }
  }, [productToEdit, form]);

  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    const finalData = {
      ...data,
      image: data.image || `https://picsum.photos/seed/${data.name.replace(/\s+/g, '-')}/600/600`,
      imageHint: data.imageHint || data.name.toLowerCase().split(' ').slice(0,2).join(' '),
    }

    if (productToEdit) {
      updateProduct({ ...productToEdit, ...finalData });
       toast({ title: "Product Updated", description: `${data.name} has been updated.` });
    } else {
      const newId = data.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
      addProduct({ ...finalData, id: newId });
       toast({ title: "Product Added", description: `${data.name} has been added.` });
    }
    form.reset();
    if(onFinishEditing) onFinishEditing();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Pringles Original" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="945" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Snacks" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://picsum.photos/seed/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageHint"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image Hint (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="product image" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center space-x-4">
            <FormField
            control={form.control}
            name="isNew"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                    <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel>New Product</FormLabel>
                </div>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="soldOut"
            render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                    <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    />
                </FormControl>
                <div className="space-y-1 leading-none">
                    <FormLabel>Sold Out</FormLabel>
                </div>
                </FormItem>
            )}
            />
        </div>
        <Button type="submit" className="w-full">
          {productToEdit ? 'Update Product' : 'Add Product'}
        </Button>
        {productToEdit && onFinishEditing && (
            <Button variant="outline" className="w-full" onClick={onFinishEditing}>Cancel</Button>
        )}
      </form>
    </Form>
  );
}
