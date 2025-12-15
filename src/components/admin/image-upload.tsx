"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  placeholder?: string;
}

export function ImageUpload({ value, onChange, placeholder = "Product image" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value || "");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create a preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        
        // For now, we'll use the data URL as the image URL
        // In a real application, you would upload to a service like Cloudinary, AWS S3, etc.
        onChange(result);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image uploaded",
        description: "Image has been uploaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setPreview(url);
    onChange(url);
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4 w-full overflow-x-auto">
      <div className="min-w-0">
        <Card className="border-dashed border-2 border-gray-300 hover:border-gray-400 transition-colors w-full">
          <CardContent className="p-3 sm:p-4 md:p-6 w-full min-w-0">
            {preview ? (
              <div className="space-y-4 w-full">
                <div className="relative w-full max-w-full">
                  <div className="aspect-square w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-hidden rounded-lg bg-gray-50">
                    <img
                      src={preview}
                      alt={placeholder}
                      className="w-full h-full object-contain"
                      onError={() => {
                        toast({
                          title: "Invalid image URL",
                          description: "The image URL is not valid.",
                          variant: "destructive",
                        });
                        setPreview("");
                      }}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 shadow-lg"
                    onClick={handleRemove}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 sm:space-y-4 w-full">
                <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                </div>
                <div className="space-y-1 sm:space-y-2 px-2">
                  <h3 className="text-xs sm:text-sm font-medium">Upload product image</h3>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="text-xs sm:text-sm px-3 py-2 h-auto"
                >
                  <Upload className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  <span className="truncate">
                    {isUploading ? "Uploading..." : "Choose file"}
                  </span>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-2 w-full">
        <label className="text-sm font-medium block">Or enter image URL</label>
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Input
            placeholder="https://picsum.photos/seed/product/600/600"
            value={value || ""}
            onChange={(e) => handleUrlChange(e.target.value)}
            className="text-sm flex-1 min-w-0"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="w-full sm:w-auto px-3 py-2 h-auto flex-shrink-0"
          >
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
