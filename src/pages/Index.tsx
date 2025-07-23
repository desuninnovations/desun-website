
import React from 'react';
import Navigation from '../components/Navigation';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';

const Index = () => {
  const portfolioItems = [
    {
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=300&fit=crop",
      title: "Smart Solutions",
      description: "Cutting-edge technology solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop",
      title: "Digital Innovation",
      description: "Revolutionary digital products"
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      title: "Modern Design",
      description: "Sleek and functional designs"
    }
  ];

  const whatsNewItems = [
    {
      image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&h=200&fit=crop",
      title: "Nature Integration"
    },
    {
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=200&fit=crop",
      title: "Ambient Solutions"
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop",
      title: "Outdoor Excellence"
    },
    {
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=300&h=200&fit=crop",
      title: "Modern Architecture"
    },
    {
      image: "https://images.unsplash.com/photo-1493397212122-2b85dda8106b?w=300&h=200&fit=crop",
      title: "Contemporary Design"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Carousel Section */}
      <Carousel />
      
      {/* Product Portfolio Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Product Portfolio
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover-scale">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What's New Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            What's New
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whatsNewItems.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 hover-scale">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800 text-center">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
