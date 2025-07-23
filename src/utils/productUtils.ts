
export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  variant: string;
  price: string;
  description: string;
  specifications: string[];
  features: string[];
  image: string;
}

export const getAdminProducts = (): AdminProduct[] => {
  try {
    const products = localStorage.getItem('adminProducts');
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error('Error reading admin products:', error);
    return [];
  }
};

export const generateSlug = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

export const findProductBySlug = (category: string, subcategory: string, variant: string): AdminProduct | null => {
  const adminProducts = getAdminProducts();
  const variantSlug = generateSlug(variant);
  
  return adminProducts.find(product => 
    product.category === category &&
    generateSlug(product.subcategory) === subcategory &&
    generateSlug(product.variant) === variantSlug
  ) || null;
};
