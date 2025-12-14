
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useProducts } from '@/hooks/use-products';
import { type Product } from '@/lib/types';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from './image-upload';

const formSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  image: z.string().optional(), // Allow any string (URL or data URL)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="sm:col-span-2 lg:col-span-3">
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Pringles Original" {...field} className="w-full" />
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
                  <Input type="number" placeholder="945" {...field} className="w-full" />
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Eatables">Eatables</SelectItem>
                    <SelectItem value="Snacks">Snacks</SelectItem>
                    <SelectItem value="Biscuits">Biscuits</SelectItem>
                    <SelectItem value="Drinkable">Drinkable</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Personal Care">Personal Care</SelectItem>
                    <SelectItem value="Household">Household</SelectItem>
                    <SelectItem value="Baby Care">Baby Care</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Input placeholder="product image" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={form.watch("name") || "Product image"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="isNew"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 sm:p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm sm:text-base">New Product</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="soldOut"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3 sm:p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm sm:text-base">Sold Out</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button type="submit" className="w-full">
            {productToEdit ? 'Update Product' : 'Add Product'}
          </Button>
          {productToEdit && onFinishEditing && (
            <Button variant="outline" className="w-full" onClick={onFinishEditing}>Cancel</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
