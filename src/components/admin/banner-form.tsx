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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { type Banner } from '@/lib/types';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ImageUpload } from './image-upload';

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  image: z.string().optional(),
  imageHint: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
  position: z.enum(['hero', 'promo', 'grid']),
  isActive: z.boolean().optional(),
  sortOrder: z.coerce.number().min(0, 'Sort order must be a positive number'),
});

type BannerFormData = z.infer<typeof formSchema>;

interface BannerFormProps {
  bannerToEdit?: Banner | null;
  onFinishEditing?: () => void;
}

export function BannerForm({ bannerToEdit, onFinishEditing }: BannerFormProps) {
  const { toast } = useToast();

  const form = useForm<BannerFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      subtitle: '',
      image: '',
      imageHint: '',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      backgroundColor: '#F5EBE0',
      textColor: '#000000',
      position: 'promo',
      isActive: true,
      sortOrder: 1,
    },
  });

  useEffect(() => {
    if (bannerToEdit) {
      form.reset(bannerToEdit);
    } else {
      form.reset({
        title: '',
        subtitle: '',
        image: '',
        imageHint: '',
        buttonText: 'Shop Now',
        buttonLink: '/products',
        backgroundColor: '#F5EBE0',
        textColor: '#000000',
        position: 'promo',
        isActive: true,
        sortOrder: 1,
      });
    }
  }, [bannerToEdit, form]);

  const onSubmit: SubmitHandler<BannerFormData> = async (data) => {
    try {
      const finalData: Banner = {
        ...data,
        id: data.id || `banner-${Date.now()}`,
        image: data.image || '/coffee.jpg',
        imageHint: data.imageHint || data.title.toLowerCase().replace(/\s+/g, '-'),
        buttonText: data.buttonText || 'Shop Now',
        buttonLink: data.buttonLink || '/products',
        backgroundColor: data.backgroundColor || '#F5EBE0',
        textColor: data.textColor || '#000000',
        isActive: data.isActive ?? true,
        sortOrder: data.sortOrder || 1,
      };

      if (bannerToEdit) {
        const { error } = await supabase
          .from('banners')
          .update(finalData)
          .eq('id', finalData.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('banners')
          .insert([finalData]);
        
        if (error) throw error;
      }

      toast({ 
        title: bannerToEdit ? "Banner Updated" : "Banner Added", 
        description: `${data.title} has been ${bannerToEdit ? 'updated' : 'added'}.` 
      });

      form.reset();
      if (onFinishEditing) onFinishEditing();
      
      // Refresh the page to show changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving banner:', error);
      toast({
        title: "Error",
        description: "Failed to save banner. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Banner Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter banner title" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Subtitle (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter subtitle" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Banner Position</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="hero">Hero Banner</SelectItem>
                      <SelectItem value="promo">Promo Banner</SelectItem>
                      <SelectItem value="grid">Grid Banner</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="sortOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Sort Order</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="1" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Banner Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    placeholder={form.watch("title") || "Banner image"}
                  />
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
                <FormLabel className="text-sm font-medium">Image Hint (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="banner image hint" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Button Text</FormLabel>
                  <FormControl>
                    <Input placeholder="Shop Now" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="buttonLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Button Link</FormLabel>
                  <FormControl>
                    <Input placeholder="/products" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="backgroundColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Background Color</FormLabel>
                  <FormControl>
                    <Input placeholder="#F5EBE0" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="textColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Text Color</FormLabel>
                  <FormControl>
                    <Input placeholder="#000000" {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-medium cursor-pointer">
                  Active Banner
                </FormLabel>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            type="submit" 
            className="flex-1 sm:flex-none"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? 'Saving...' : (bannerToEdit ? 'Update Banner' : 'Add Banner')}
          </Button>
          {onFinishEditing && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onFinishEditing}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
