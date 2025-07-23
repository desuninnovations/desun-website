
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import { getAdminProducts, generateSlug } from '../utils/productUtils';

const ProductCategory = () => {
  const { category } = useParams();
  
  const categoryData = {
    indoor: {
      name: 'Indoor',
      description: 'Premium indoor solutions for residential and commercial spaces',
      subcategories: [
        {
          name: 'Ceiling Lights',
          image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
          description: 'Modern ceiling lighting solutions'
        },
        {
          name: 'Wall Lights',
          image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
          description: 'Elegant wall-mounted lighting'
        },
        {
          name: 'Floor Lamps',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
          description: 'Stylish floor standing lamps'
        }
      ]
    },
    outdoor: {
      name: 'Outdoor',
      description: 'Weather-resistant solutions for outdoor environments',
      subcategories: [
        {
          name: 'Garden Lights',
          image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=300&fit=crop',
          description: 'Beautiful garden illumination'
        },
        {
          name: 'Security Lights',
          image: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=300&fit=crop',
          description: 'High-security outdoor lighting'
        },
        {
          name: 'Pathway Lights',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
          description: 'Safe pathway illumination'
        }
      ]
    },
    poles: {
      name: 'Poles',
      description: 'Durable pole-mounted solutions for various applications',
      subcategories: [
        {
          name: 'Street Poles',
          image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop',
          description: 'Municipal street lighting poles'
        },
        {
          name: 'Decorative Poles',
          image: 'https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=400&h=300&fit=crop',
          description: 'Ornamental lighting poles'
        },
        {
          name: 'Utility Poles',
          image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop',
          description: 'Heavy-duty utility poles'
        }
      ]
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData];

  if (!currentCategory) {
    return <div>Category not found</div>;
  }

  // Get admin products for this category and merge with static subcategories
  const adminProducts = getAdminProducts();
  const adminSubcategories = adminProducts
    .filter(product => product.category === category)
    .reduce((acc, product) => {
      const subcategoryName = product.subcategory;
      if (!acc.find(sub => sub.name === subcategoryName)) {
        acc.push({
          name: subcategoryName,
          image: product.image,
          description: `Custom ${subcategoryName.toLowerCase()}`
        });
      }
      return acc;
    }, [] as Array<{ name: string; image: string; description: string }>);

  // Combine static and admin subcategories
  const allSubcategories = [...currentCategory.subcategories];
  adminSubcategories.forEach(adminSub => {
    if (!allSubcategories.find(sub => sub.name === adminSub.name)) {
      allSubcategories.push(adminSub);
    }
  });

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
              <li className="text-gray-800 font-medium">{currentCategory.name}</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            {currentCategory.name} Products
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            {currentCategory.description}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allSubcategories.map((subcategory, index) => (
              <Link
                key={index}
                to={`/products/${category}/${generateSlug(subcategory.name)}`}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale group"
              >
                <img
                  src={subcategory.image}
                  alt={subcategory.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {subcategory.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {subcategory.description}
                  </p>
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    View Variants
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

export default ProductCategory;
