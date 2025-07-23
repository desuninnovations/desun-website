import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AdminAuth from '../components/AdminAuth';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Upload, LogOut, Plus } from 'lucide-react';
import { getExistingSubcategories, formatSubcategoryName } from '../utils/subcategoryUtils';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  subcategory: z.string().min(1, 'Subcategory is required'),
  variant: z.string().min(1, 'Variant is required'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(1, 'Description is required'),
  specifications: z.string().min(1, 'Specifications are required'),
  features: z.string().min(1, 'Features are required'),
});

type ProductFormData = z.infer<typeof productSchema>;

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [showNewSubcategoryInput, setShowNewSubcategoryInput] = useState(false);
  const [newSubcategory, setNewSubcategory] = useState('');
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      subcategory: '',
      variant: '',
      price: '',
      description: '',
      specifications: '',
      features: '',
    },
  });

  useEffect(() => {
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    setIsAuthenticated(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubcategorySelect = (value: string) => {
    if (value === 'add-new') {
      setShowNewSubcategoryInput(true);
      form.setValue('subcategory', '');
    } else {
      setShowNewSubcategoryInput(false);
      setNewSubcategory('');
      form.setValue('subcategory', value);
    }
  };

  const handleNewSubcategorySubmit = () => {
    if (newSubcategory.trim()) {
      const formattedSubcategory = newSubcategory.toLowerCase().replace(/\s+/g, '-');
      form.setValue('subcategory', formattedSubcategory);
      setShowNewSubcategoryInput(false);
      setNewSubcategory('');
      toast({
        title: "New subcategory added",
        description: `"${newSubcategory}" has been set as the subcategory`,
      });
    }
  };

  const onSubmit = (data: ProductFormData) => {
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Please select an image for the product",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically upload the image and save product data
    // For now, we'll just show a success message and store in localStorage
    const newProduct = {
      ...data,
      id: Date.now().toString(),
      image: imagePreview,
      specifications: data.specifications.split('\n').filter(s => s.trim()),
      features: data.features.split('\n').filter(f => f.trim()),
    };

    // Get existing products from localStorage
    const existingProducts = JSON.parse(localStorage.getItem('adminProducts') || '[]');
    const updatedProducts = [...existingProducts, newProduct];
    localStorage.setItem('adminProducts', JSON.stringify(updatedProducts));

    toast({
      title: "Success",
      description: "Product added successfully!",
    });

    // Reset form
    form.reset();
    setImageFile(null);
    setImagePreview('');
    setShowNewSubcategoryInput(false);
    setNewSubcategory('');
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Admin - Add New Product
            </h1>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut size={16} />
              Logout
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
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
                          <Input placeholder="$299" {...field} />
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
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="indoor">Indoor</SelectItem>
                            <SelectItem value="outdoor">Outdoor</SelectItem>
                            <SelectItem value="poles">Poles</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subcategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subcategory</FormLabel>
                        {!showNewSubcategoryInput ? (
                          <Select onValueChange={handleSubcategorySelect} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subcategory" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {getExistingSubcategories().map((subcategory) => (
                                <SelectItem key={subcategory} value={subcategory}>
                                  {formatSubcategoryName(subcategory)}
                                </SelectItem>
                              ))}
                              <SelectItem value="add-new" className="border-t">
                                <div className="flex items-center gap-2">
                                  <Plus size={16} />
                                  Add New Subcategory
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="flex gap-2">
                            <Input
                              placeholder="Enter new subcategory"
                              value={newSubcategory}
                              onChange={(e) => setNewSubcategory(e.target.value)}
                            />
                            <Button type="button" onClick={handleNewSubcategorySubmit}>
                              Add
                            </Button>
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                setShowNewSubcategoryInput(false);
                                setNewSubcategory('');
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="variant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variant</FormLabel>
                        <FormControl>
                          <Input placeholder="led-pendant-light" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Image
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-10 h-10 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">PNG, JPG or JPEG</p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter product description"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specifications (one per line)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Power: 20W LED&#10;Color Temperature: 3000K-6500K&#10;Dimensions: 12&quot; x 8&quot;"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Features (one per line)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Dimmable LED technology&#10;Adjustable hanging height&#10;Energy efficient"
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Add Product
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
