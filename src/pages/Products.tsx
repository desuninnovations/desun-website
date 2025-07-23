
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Products = () => {
  const categories = [
    {
      name: 'Indoor',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
      description: 'Premium indoor lighting and electrical solutions',
      link: '/products/indoor'
    },
    {
      name: 'Outdoor',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop',
      description: 'Weather-resistant outdoor installations and systems',
      link: '/products/outdoor'
    },
    {
      name: 'Poles',
      image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=300&fit=crop',
      description: 'Durable pole-mounted solutions for various applications',
      link: '/products/poles'
    }
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
              <li className="text-gray-800 font-medium">Products</li>
            </ol>
          </nav>

          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Our Products
          </h1>
          <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Explore our comprehensive range of products designed for different environments and applications.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={category.link}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale group"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    View Products
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

export default Products;
