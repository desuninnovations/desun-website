
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import { getAdminProducts, generateSlug } from '../utils/productUtils';

const ProductSubcategory = () => {
  const { category, subcategory } = useParams();
  
  const subcategoryData = {
    // Indoor subcategories
    'ceiling-lights': {
      name: 'Ceiling Lights',
      description: 'Modern and efficient ceiling lighting solutions',
      variants: [
        {
          name: 'LED Pendant Light',
          image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
          price: '$299'
        },
        {
          name: 'Crystal Chandelier',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          price: '$599'
        },
        {
          name: 'Modern Track Light',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
          price: '$199'
        }
      ]
    },
    'wall-lights': {
      name: 'Wall Lights',
      description: 'Elegant wall-mounted lighting fixtures',
      variants: [
        {
          name: 'Modern Sconce',
          image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
          price: '$149'
        },
        {
          name: 'Industrial Wall Light',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
          price: '$179'
        },
        {
          name: 'Decorative Accent Light',
          image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
          price: '$129'
        }
      ]
    },
    'floor-lamps': {
      name: 'Floor Lamps',
      description: 'Stylish floor standing lighting solutions',
      variants: [
        {
          name: 'Minimalist Floor Lamp',
          image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop',
          price: '$249'
        },
        {
          name: 'Arc Floor Lamp',
          image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop',
          price: '$349'
        },
        {
          name: 'Tripod Floor Lamp',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          price: '$199'
        }
      ]
    },
    // Outdoor subcategories
    'garden-lights': {
      name: 'Garden Lights',
      description: 'Beautiful garden illumination solutions',
      variants: [
        {
          name: 'Solar Garden Spotlights',
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
          price: '$89'
        },
        {
          name: 'LED Garden Path Light',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
          price: '$129'
        },
        {
          name: 'Garden Accent Light',
          image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
          price: '$69'
        }
      ]
    },
    'security-lights': {
      name: 'Security Lights',
      description: 'High-security outdoor lighting solutions',
      variants: [
        {
          name: 'Motion Sensor Floodlight',
          image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop',
          price: '$199'
        },
        {
          name: 'LED Security Spotlight',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
          price: '$149'
        },
        {
          name: 'Smart Security Light',
          image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
          price: '$299'
        }
      ]
    },
    'pathway-lights': {
      name: 'Pathway Lights',
      description: 'Safe pathway illumination solutions',
      variants: [
        {
          name: 'Solar Pathway Stakes',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
          price: '$49'
        },
        {
          name: 'LED Path Bollards',
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
          price: '$179'
        },
        {
          name: 'Decorative Path Light',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          price: '$119'
        }
      ]
    },
    // Poles subcategories
    'street-poles': {
      name: 'Street Poles',
      description: 'Municipal street lighting poles',
      variants: [
        {
          name: 'Standard Street Pole',
          image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop',
          price: '$899'
        },
        {
          name: 'LED Street Pole',
          image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop',
          price: '$1299'
        },
        {
          name: 'Smart Street Pole',
          image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop',
          price: '$1899'
        }
      ]
    },
    'decorative-poles': {
      name: 'Decorative Poles',
      description: 'Ornamental lighting poles',
      variants: [
        {
          name: 'Victorian Style Pole',
          image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop',
          price: '$1199'
        },
        {
          name: 'Modern Decorative Pole',
          image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop',
          price: '$999'
        },
        {
          name: 'Classic Garden Pole',
          image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop',
          price: '$799'
        }
      ]
    },
    'utility-poles': {
      name: 'Utility Poles',
      description: 'Heavy-duty utility poles',
      variants: [
        {
          name: 'Commercial Utility Pole',
          image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop',
          price: '$1599'
        },
        {
          name: 'Industrial Pole',
          image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop',
          price: '$2199'
        },
        {
          name: 'Heavy-Duty Pole',
          image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop',
          price: '$2899'
        }
      ]
    }
  };

  // Get admin products for this category and subcategory
  const adminProducts = getAdminProducts();
  const adminVariants = adminProducts
    .filter(product => 
      product.category === category && 
      generateSlug(product.subcategory) === subcategory
    )
    .map(product => ({
      name: product.name,
      image: product.image,
      price: product.price
    }));

  const currentSubcategory = subcategoryData[subcategory as keyof typeof subcategoryData];
  
  // Create a dynamic subcategory if not found in static data
  let subcategoryInfo;
  if (currentSubcategory) {
    subcategoryInfo = currentSubcategory;
  } else {
    // Find the first admin product to get subcategory info
    const firstAdminProduct = adminProducts.find(product => 
      product.category === category && 
      generateSlug(product.subcategory) === subcategory
    );
    
    if (firstAdminProduct) {
      subcategoryInfo = {
        name: firstAdminProduct.subcategory,
        description: `Custom ${firstAdminProduct.subcategory.toLowerCase()} solutions`,
        variants: []
      };
    }
  }

  if (!subcategoryInfo && adminVariants.length === 0) {
    return <div>Subcategory not found</div>;
  }

  // Combine static and admin variants
  const allVariants = [
    ...(subcategoryInfo?.variants || []),
    ...adminVariants
  ];

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
              <li className="text-gray-800 font-medium">{subcategoryInfo?.name}</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            {subcategoryInfo?.name}
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {subcategoryInfo?.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allVariants.map((variant, index) => (
              <Link
                key={index}
                to={`/products/${category}/${subcategory}/${generateSlug(variant.name)}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale group"
              >
                <img
                  src={variant.image}
                  alt={variant.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {variant.name}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    {variant.price}
                  </p>
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductSubcategory;
