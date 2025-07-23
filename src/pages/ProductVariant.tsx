
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { findProductBySlug } from '../utils/productUtils';

const ProductVariant = () => {
  const { category, subcategory, variant } = useParams();
  
  const variantData = {
    'led-pendant-light': {
      name: 'LED Pendant Light',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&h=600&fit=crop',
      description: 'This modern LED pendant light combines contemporary design with energy-efficient technology. Perfect for dining rooms, kitchens, and living spaces. Features adjustable height and dimmable LED technology for optimal ambiance control.',
      specifications: [
        'Power: 20W LED',
        'Color Temperature: 3000K-6500K',
        'Dimensions: 12" x 8"',
        'Material: Aluminum and Glass',
        'Finish: Brushed Silver',
        'Warranty: 5 years'
      ],
      features: [
        'Dimmable LED technology',
        'Adjustable hanging height',
        'Energy efficient',
        'Modern minimalist design',
        'Easy installation',
        'Remote control included'
      ]
    },
    'crystal-chandelier': {
      name: 'Crystal Chandelier',
      price: '$599',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      description: 'Elegant crystal chandelier that adds luxury and sophistication to any space. Hand-cut crystals create beautiful light patterns and reflections. Perfect centerpiece for formal dining rooms and grand entrances.',
      specifications: [
        'Power: 8 x 40W Bulbs',
        'Dimensions: 24" x 30"',
        'Material: Premium Crystal and Brass',
        'Finish: Antique Brass',
        'Chain Length: 6 feet',
        'Warranty: 3 years'
      ],
      features: [
        'Hand-cut crystal prisms',
        'Adjustable chain length',
        'Compatible with dimmer switches',
        'Classic elegant design',
        'Professional installation recommended',
        'Easy bulb replacement'
      ]
    }
  };

  // First check if it's a static variant
  let currentVariant = variantData[variant as keyof typeof variantData];
  
  // If not found in static data, check admin products
  if (!currentVariant && category && subcategory && variant) {
    const adminProduct = findProductBySlug(category, subcategory, variant);
    if (adminProduct) {
      currentVariant = {
        name: adminProduct.name,
        price: adminProduct.price,
        image: adminProduct.image,
        description: adminProduct.description,
        specifications: adminProduct.specifications,
        features: adminProduct.features
      };
    }
  }

  if (!currentVariant) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/products" className="hover:text-blue-600 transition-colors">Products</Link>
              </li>
              <li>/</li>
              <li>
                <Link to={`/products/${category}`} className="hover:text-blue-600 transition-colors capitalize">
                  {category}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to={`/products/${category}/${subcategory}`} className="hover:text-blue-600 transition-colors">
                  {subcategory?.replace('-', ' ')}
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-800 font-medium">{currentVariant.name}</li>
            </ol>
          </nav>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="p-8">
                <img
                  src={currentVariant.image}
                  alt={currentVariant.name}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              </div>
              
              {/* Product Details */}
              <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {currentVariant.name}
                </h1>
                <p className="text-3xl font-bold text-blue-600 mb-6">
                  {currentVariant.price}
                </p>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {currentVariant.description}
                </p>
                
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-8">
                  Add to Cart
                </button>
                
                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                  <ul className="space-y-2">
                    {currentVariant.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Specifications */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h3>
                  <ul className="space-y-2">
                    {currentVariant.specifications.map((spec, index) => (
                      <li key={index} className="text-gray-600 border-b border-gray-200 py-1">
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductVariant;
