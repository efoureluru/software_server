import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Star, MapPin, Clock, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const RESTAURANTS = {
    '1': { name: 'Darbar Mandi', location: 'Food Court, 1st Floor', rating: 4.8, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=80'] },
    '2': { name: 'Wow! Momo', location: 'Food Court, 1st Floor', rating: 4.5, image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=800&q=80', 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80'] },
    '3': { name: 'The Food Jail', location: 'GF, Near Entrance', rating: 4.7, image: 'https://images.unsplash.com/photo-1603894584214-5da0a4-d13deed9?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1603894584214-5da0a4-d13deed9?auto=format&fit=crop&w=800&q=80'] },
    '4': { name: 'Ethree Tiffins', location: 'Food Court, 2nd Floor', rating: 4.6, image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=800&q=80'] },
    '5': { name: 'Dumont E3', location: 'Kiosk 3, Ground Floor', rating: 4.9, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80'] },
    '6': { name: "Pub'Gs", location: 'Food Court, 1st Floor', rating: 4.4, image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80'] },
    '7': { name: 'Burger King', location: 'Food Court, 1st Floor', rating: 4.3, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'] },
    '8': { name: 'Pizza Hut', location: 'Food Court, 1st Floor', rating: 4.2, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80'] },
    '9': { name: 'Tandoori Tales', location: 'Food Court, 2nd Floor', rating: 4.6, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'] },
    '10': { name: 'Chai Point', location: 'Kiosk 1, Ground Floor', rating: 4.5, image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80'] },
    '11': { name: 'Waffle House', location: 'Kiosk 2, Ground Floor', rating: 4.7, image: 'https://images.unsplash.com/photo-1568051243851-f9b13614619c?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1568051243851-f9b13614619c?auto=format&fit=crop&w=800&q=80'] },
    '12': { name: 'Sushi Bar', location: 'Restaurant Block', rating: 4.8, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80'] },
    '13': { name: 'Taco Bell', location: 'Food Court, 1st Floor', rating: 4.1, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80'] },
    '14': { name: 'Kebab Corner', location: 'Food Court, 2nd Floor', rating: 4.6, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'] },
    '15': { name: 'Biryani Blues', location: 'Restaurant Block', rating: 4.5, image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80'] },
    '16': { name: 'Idli Factory', location: 'Food Court, 1st Floor', rating: 4.4, image: 'https://images.unsplash.com/photo-1589301760574-d816248d1561?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1589301760574-d816248d1561?auto=format&fit=crop&w=800&q=80'] },
    '17': { name: 'Gelato Italiano', location: 'Kiosk 4, Ground Floor', rating: 4.8, image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=800&q=80'] },
    '18': { name: 'Pasta Street', location: 'Restaurant Block', rating: 4.3, image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80'] },
    '19': { name: 'Smoothie King', location: 'Kiosk 5, Ground Floor', rating: 4.6, image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80'] },
    '20': { name: 'Sizzler Ranch', location: 'Restaurant Block', rating: 4.5, image: 'https://images.unsplash.com/photo-1544025162-d7669d26d405?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1544025162-d7669d26d405?auto=format&fit=crop&w=800&q=80'] },
};

const Menu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const restaurant = RESTAURANTS[id] || { name: 'Restaurant', image: null, gallery: [] };
    const menuSectionRef = useRef(null);

    const scrollToMenu = () => {
        menuSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden bg-black">
                {/* Background Image / Gallery First Image */}
                <div className="absolute inset-0">
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Header Nav */}
                <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-all border border-white/20"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-md transition-all border border-white/20">
                        <Share2 size={24} />
                    </button>
                </div>

                {/* Restaurant Info */}
                <div className="absolute bottom-0 left-0 p-8 lg:p-16 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">{restaurant.name}</h1>
                        <div className="flex flex-wrap items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                <Star size={18} className="fill-yellow-400 text-yellow-400" />
                                <span className="font-bold">{restaurant.rating}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={20} />
                                <span>{restaurant.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={20} />
                                <span>Open 11 AM - 11 PM</span>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                onClick={scrollToMenu}
                                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center gap-2"
                            >
                                View Menu <ChevronDown size={20} />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Gallery Preview Strip */}
            <div className="py-8 bg-white border-b border-gray-100">
                <div className="container mx-auto px-6">
                    <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4">Gallery</h3>
                    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                        {(restaurant.gallery && restaurant.gallery.length > 0 ? restaurant.gallery : [restaurant.image]).map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Gallery ${idx}`}
                                className="h-32 w-48 object-cover rounded-xl shadow-sm hover:scale-105 transition-transform cursor-pointer"
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Section */}
            <div ref={menuSectionRef} className="container mx-auto px-6 py-12 lg:py-24">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Menu</h2>
                        <p className="text-gray-500">Explore our delicious offerings. Prices are subject to change.</p>
                    </div>

                    {/* Menu Card View */}
                    <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl p-4 lg:p-8 border border-gray-100">
                        {restaurant.image ? (
                            <img
                                src={restaurant.image}
                                alt={`${restaurant.name} Menu`}
                                className="w-full h-auto object-contain rounded-xl"
                            />
                        ) : (
                            <div className="h-64 flex items-center justify-center text-gray-400">Menu not available</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Menu;
