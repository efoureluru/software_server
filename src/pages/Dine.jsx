import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['All', 'North Indian', 'Arabian', 'Chinese', 'South Indian', 'Dessert', 'Continental', 'Fast Food', 'Japanese', 'Beverages'];

const STALLS = [
    { id: '1', name: 'Darbar Mandi', cuisine: 'Arabian', rating: 4.8, time: '20-30 min', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80', description: 'Authentic Arabian Mandi and Grilled dishes', open: true },
    { id: '2', name: 'Wow! Momo', cuisine: 'Chinese', rating: 4.5, time: '15-25 min', image: 'https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=400&q=80', description: 'Dumplings, Noodles and more', open: true },
    { id: '3', name: 'The Food Jail', cuisine: 'North Indian', rating: 4.7, time: '25-40 min', image: 'https://images.unsplash.com/photo-1603894584214-5da0a4-d13deed9?auto=format&fit=crop&w=400&q=80', description: 'Rich North Indian Curries and Breads', open: true },
    { id: '4', name: 'Ethree Tiffins', cuisine: 'South Indian', rating: 4.6, time: '10-20 min', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?auto=format&fit=crop&w=400&q=80', description: 'Crispy Dosas and South Indian delicacies', open: true },
    { id: '5', name: 'Dumont E3', cuisine: 'Dessert', rating: 4.9, time: '5-10 min', image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=400&q=80', description: 'Ice Creams, Sundaes and Shakes', open: true },
    { id: '6', name: "Pub'Gs", cuisine: 'Continental', rating: 4.4, time: '20-30 min', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80', description: 'Crispy fried fish and snacks', open: false },
    { id: '7', name: 'Burger King', cuisine: 'Fast Food', rating: 4.3, time: '10-15 min', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80', description: 'Flame-grilled burgers and fries', open: true },
    { id: '8', name: 'Pizza Hut', cuisine: 'Fast Food', rating: 4.2, time: '20-30 min', image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80', description: 'Pizzas, pasta and wings', open: true },
    { id: '9', name: 'Tandoori Tales', cuisine: 'North Indian', rating: 4.6, time: '25-35 min', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80', description: 'Spicy Tandoori starters and curries', open: true },
    { id: '10', name: 'Chai Point', cuisine: 'Beverages', rating: 4.5, time: '5-10 min', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80', description: 'Fresh chai and snacks', open: true },
    { id: '11', name: 'Waffle House', cuisine: 'Desserts', rating: 4.7, time: '10-15 min', image: 'https://images.unsplash.com/photo-1568051243851-f9b13614619c?auto=format&fit=crop&w=400&q=80', description: 'Belgian Waffles and pancakes', open: true },
    { id: '12', name: 'Sushi Bar', cuisine: 'Japanese', rating: 4.8, time: '30-40 min', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=400&q=80', description: 'Fresh Sushi and Sashimi', open: true },
    { id: '13', name: 'Taco Bell', cuisine: 'Fast Food', rating: 4.1, time: '10-20 min', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=400&q=80', description: 'Mexican-inspired fast food', open: true },
    { id: '14', name: 'Kebab Corner', cuisine: 'Arabian', rating: 4.6, time: '15-25 min', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', description: 'Juicy Kebabs and Shawarmas', open: true },
    { id: '15', name: 'Biryani Blues', cuisine: 'North Indian', rating: 4.5, time: '30-45 min', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=400&q=80', description: 'Authentic Hyderabadi Biryani', open: true },
    { id: '16', name: 'Idli Factory', cuisine: 'South Indian', rating: 4.4, time: '10-15 min', image: 'https://images.unsplash.com/photo-1589301760574-d816248d1561?auto=format&fit=crop&w=400&q=80', description: 'Soft Idlis and Vadas', open: true },
    { id: '17', name: 'Gelato Italiano', cuisine: 'Desserts', rating: 4.8, time: '5-10 min', image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=400&q=80', description: 'Premium Italian Gelato', open: true },
    { id: '18', name: 'Pasta Street', cuisine: 'Continental', rating: 4.3, time: '20-30 min', image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=400&q=80', description: 'Authentic Italian Pastas', open: true },
    { id: '19', name: 'Smoothie King', cuisine: 'Beverages', rating: 4.6, time: '5-10 min', image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=400&q=80', description: 'Healthy fruit smoothies', open: true },
    { id: '20', name: 'Sizzler Ranch', cuisine: 'Continental', rating: 4.5, time: '30-40 min', image: 'https://images.unsplash.com/photo-1544025162-d7669d26d405?auto=format&fit=crop&w=400&q=80', description: 'Hot and spicy sizzlers', open: true },
];

const Dine = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const filteredStalls = STALLS.filter(stall => {
        const matchesCategory = activeCategory === 'All' || stall.cuisine === activeCategory;
        const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stall.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="bg-creamy-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6">
                {/* Header Area */}
                <div className="bg-white p-8 rounded-3xl shadow-sm mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8 border border-gray-100">
                    <div>
                        <h1 className="text-4xl font-heading font-bold text-charcoal-grey mb-2 uppercase">Culinary Court</h1>
                        <p className="text-gray-500">Discover Vijayawada's first open-air multi-vendor experience.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 flex-grow md:max-w-xl">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search restaurants..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-sunset-orange transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}

                            />
                        </div>
                        <button className="flex items-center gap-2 bg-charcoal-grey text-white px-6 py-3 rounded-xl font-bold">
                            <Filter size={18} /> Filter
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex gap-4 overflow-x-auto pb-4 mb-12 no-scrollbar">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-8 py-3 rounded-full whitespace-nowrap transition-all font-bold ${(activeCategory === cat)
                                ? 'bg-riverside-teal text-white shadow-lg'
                                : 'bg-white text-gray-400 border border-gray-100 hover:border-riverside-teal'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Restaurant Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {filteredStalls.map((stall) => (
                            <motion.div
                                key={stall.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                onClick={() => navigate(`/menu/${stall.id}`)}
                                className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img src={stall.image} alt={stall.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />

                                    {!stall.open && (
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                                            <span className="bg-red-500 text-white px-4 py-1 rounded-full font-bold uppercase text-sm">Closed</span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                                        <Clock size={14} className="text-gray-500" />
                                        <span className="text-gray-700 text-xs font-bold">{stall.time}</span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-riverside-teal font-bold uppercase text-[10px] tracking-widest">{stall.cuisine}</span>
                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                            <Star size={12} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-gray-700 text-xs font-bold">{stall.rating}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-2 group-hover:translate-x-1 transition-transform">
                                        <div>
                                            <h3 className="text-2xl font-bold text-charcoal-grey">{stall.name}</h3>
                                            <p className="text-gray-400 text-sm mt-1 line-clamp-1">{stall.description}</p>
                                        </div>
                                        <div className="bg-gray-50 p-3 rounded-full group-hover:bg-riverside-teal group-hover:text-white transition-colors">
                                            <ChevronRight size={20} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Dine;
