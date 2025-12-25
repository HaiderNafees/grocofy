'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BannerForm } from './banner-form';
import { type Banner } from '@/lib/types';
import { Edit, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { productsAPI } from '@/lib/api';

interface BannerListProps {
  banners: Banner[];
  onBannerUpdate: () => void;
}

export function BannerList({ banners, onBannerUpdate }: BannerListProps) {
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleEdit = (banner: Banner) => {
    setEditingBanner(banner);
    setIsEditDialogOpen(true);
  };

  const handleDelete = async (bannerId: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const { error } = await supabase
        .from('banners')
        .delete()
        .eq('id', bannerId);

      if (error) throw error;

      toast({
        title: "Banner Deleted",
        description: "Banner has been deleted successfully."
      });

      onBannerUpdate();
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast({
        title: "Error",
        description: "Failed to delete banner. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditComplete = () => {
    setEditingBanner(null);
    setIsEditDialogOpen(false);
  };

  const getPositionBadgeColor = (position: string) => {
    switch (position) {
      case 'hero': return 'bg-blue-100 text-blue-800';
      case 'promo': return 'bg-green-100 text-green-800';
      case 'grid': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Sort Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {banners.map((banner) => (
              <TableRow key={banner.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{banner.title}</div>
                    {banner.subtitle && (
                      <div className="text-sm text-gray-500">{banner.subtitle}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getPositionBadgeColor(banner.position)}>
                    {banner.position.charAt(0).toUpperCase() + banner.position.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{banner.sortOrder}</TableCell>
                <TableCell>
                  <Badge variant={banner.isActive ? "default" : "secondary"}>
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="w-12 h-12 object-cover rounded border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/logo.png';
                      }}
                    />
                    <div className="text-xs text-gray-500 max-w-[100px] truncate">
                      {banner.image}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(banner.image, '_blank')}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(banner)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(banner.id)}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Banner</DialogTitle>
          </DialogHeader>
          {editingBanner && (
            <BannerForm
              bannerToEdit={editingBanner}
              onFinishEditing={handleEditComplete}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
