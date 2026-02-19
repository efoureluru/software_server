import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, Pressable, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Search, Filter, Plus, ShoppingBag, Star, Clock, ChevronRight } from 'lucide-react-native';
import useStore from '../../store/useStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import clsx from 'clsx';
import { Stack, useRouter } from 'expo-router';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// 20 Restaurants Data
const STALLS = [
    { id: 1, name: 'Royal Mandi', cuisine: 'Arabian', rating: 4.8, time: '20-30 min', image: require('../../assets/images/dine-mandi.jpg'), description: 'Authentic Arabian Mandi and Grilled dishes', open: true },
    { id: 2, name: 'Beijing Bites', cuisine: 'Chinese', rating: 4.5, time: '15-25 min', image: require('../../assets/images/dine-momo.jpg'), description: 'Dumplings, Noodles and more', open: true },
    { id: 3, name: 'Punjab Grill', cuisine: 'North Indian', rating: 4.7, time: '25-40 min', image: require('../../assets/images/dine-butter-chicken.png'), description: 'Rich North Indian Curries and Breads', open: true },
    { id: 4, name: 'Dosa Plaza', cuisine: 'South Indian', rating: 4.6, time: '10-20 min', image: require('../../assets/images/dine-dosa.jpg'), description: 'Crispy Dosas and South Indian delicacies', open: true },
    { id: 5, name: 'Polar Bear', cuisine: 'Desserts', rating: 4.9, time: '5-10 min', image: require('../../assets/images/dine-kulfi.jpg'), description: 'Ice Creams, Sundaes and Shakes', open: true },
    { id: 6, name: 'Fish & Chips', cuisine: 'Continental', rating: 4.4, time: '20-30 min', image: require('../../assets/images/dine-fish.jpg'), description: 'Crispy fried fish and snacks', open: false },
    { id: 7, name: 'Burger King', cuisine: 'Fast Food', rating: 4.3, time: '10-15 min', image: require('../../assets/images/dine-mandi.jpg'), description: 'Flame-grilled burgers and fries', open: true },
    { id: 8, name: 'Pizza Hut', cuisine: 'Fast Food', rating: 4.2, time: '20-30 min', image: require('../../assets/images/dine-momo.jpg'), description: 'Pizzas, pasta and wings', open: true },
    { id: 9, name: 'Tandoori Tales', cuisine: 'North Indian', rating: 4.6, time: '25-35 min', image: require('../../assets/images/dine-butter-chicken.png'), description: 'Spicy Tandoori starters and curries', open: true },
    { id: 10, name: 'Chai Point', cuisine: 'Beverages', rating: 4.5, time: '5-10 min', image: require('../../assets/images/dine-dosa.jpg'), description: 'Fresh chai and snacks', open: true },
    { id: 11, name: 'Waffle House', cuisine: 'Desserts', rating: 4.7, time: '10-15 min', image: require('../../assets/images/dine-kulfi.jpg'), description: 'Belgian Waffles and pancakes', open: true },
    { id: 12, name: 'Sushi Bar', cuisine: 'Japanese', rating: 4.8, time: '30-40 min', image: require('../../assets/images/dine-fish.jpg'), description: 'Fresh Sushi and Sashimi', open: true },
    { id: 13, name: 'Taco Bell', cuisine: 'Fast Food', rating: 4.1, time: '10-20 min', image: require('../../assets/images/dine-mandi.jpg'), description: 'Mexican-inspired fast food', open: true },
    { id: 14, name: 'Kebab Corner', cuisine: 'Arabian', rating: 4.6, time: '15-25 min', image: require('../../assets/images/dine-momo.jpg'), description: 'Juicy Kebabs and Shawarmas', open: true },
    { id: 15, name: 'Biryani Blues', cuisine: 'North Indian', rating: 4.5, time: '30-45 min', image: require('../../assets/images/dine-butter-chicken.png'), description: 'Authentic Hyderabadi Biryani', open: true },
    { id: 16, name: 'Idli Factory', cuisine: 'South Indian', rating: 4.4, time: '10-15 min', image: require('../../assets/images/dine-dosa.jpg'), description: 'Soft Idlis and Vadas', open: true },
    { id: 17, name: 'Gelato Italiano', cuisine: 'Desserts', rating: 4.8, time: '5-10 min', image: require('../../assets/images/dine-kulfi.jpg'), description: 'Premium Italian Gelato', open: true },
    { id: 18, name: 'Pasta Street', cuisine: 'Continental', rating: 4.3, time: '20-30 min', image: require('../../assets/images/dine-fish.jpg'), description: 'Authentic Italian Pastas', open: true },
    { id: 19, name: 'Smoothie King', cuisine: 'Beverages', rating: 4.6, time: '5-10 min', image: require('../../assets/images/dine-mandi.jpg'), description: 'Healthy fruit smoothies', open: true },
    { id: 20, name: 'Sizzler Ranch', cuisine: 'Continental', rating: 4.5, time: '30-40 min', image: require('../../assets/images/dine-momo.jpg'), description: 'Hot and spicy sizzlers', open: true },
];

const CATEGORIES = ['All', 'Arabian', 'Chinese', 'North Indian', 'South Indian', 'Desserts', 'Continental', 'Fast Food', 'Japanese', 'Beverages'];

const Dine = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const filteredStalls = STALLS.filter(stall => {
        const matchesCategory = activeCategory === 'All' || stall.cuisine === activeCategory;
        const matchesSearch = stall.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            stall.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <View className="flex-1 bg-surface-app">
            <Stack.Screen options={{ headerShown: false }} />

            <SafeAreaView className="flex-1" edges={['top']}>
                <View className="px-6 pt-4 pb-2 bg-surface-app z-10">
                    <Text className="text-slate-900 text-3xl font-bold tracking-tight mb-4">Dining</Text>

                    {/* Search Bar */}
                    <View className="flex-row items-center gap-3 mb-6">
                        <View className="flex-1 relative">
                            <View className="absolute left-3 top-3 z-10">
                                <Search size={18} color="#94A3B8" />
                            </View>
                            <TextInput
                                placeholder="Search restaurants..."
                                placeholderTextColor="#94A3B8"
                                className="bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-slate-900 text-base"
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>
                        <TouchableOpacity className="bg-white p-3 rounded-lg border border-slate-200">
                            <Filter size={18} color="#64748B" />
                        </TouchableOpacity>
                    </View>

                    {/* Filter Tabs */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2" contentContainerStyle={{ paddingRight: 24, gap: 12 }}>
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                onPress={() => setActiveCategory(cat)}
                                className={clsx(
                                    "px-4 py-2 rounded-full border",
                                    activeCategory === cat ? "bg-slate-900 border-slate-900" : "bg-white border-slate-200"
                                )}
                            >
                                <Text className={clsx("font-semibold text-sm", activeCategory === cat ? "text-white" : "text-slate-600")}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100, paddingTop: 16 }} showsVerticalScrollIndicator={false}>
                    {filteredStalls.map((stall, index) => (
                        <TouchableOpacity
                            key={stall.id}
                            onPress={() => router.push({ pathname: '/menu/[id]', params: { id: stall.id, name: stall.name } })}
                            activeOpacity={0.9}
                        >
                            <Animated.View
                                entering={FadeInUp.delay(index * 50).springify()}
                                className="bg-white rounded-xl mb-6 shadow-sm border border-slate-100 overflow-hidden"
                            >
                                <View className="h-48 w-full relative">
                                    <Image source={stall.image} className="w-full h-full" resizeMode="cover" />
                                    {!stall.open && (
                                        <View className="absolute inset-0 bg-white/50 items-center justify-center backdrop-blur-sm">
                                            <View className="bg-slate-900 px-3 py-1 rounded-full">
                                                <Text className="text-white text-xs font-bold uppercase tracking-widest">Closed</Text>
                                            </View>
                                        </View>
                                    )}
                                    <View className="absolute bottom-3 right-3 bg-white px-2 py-1 rounded-lg flex-row items-center gap-1 shadow-sm">
                                        <Clock size={12} color="#64748B" />
                                        <Text className="text-slate-700 text-xs font-bold">{stall.time}</Text>
                                    </View>
                                </View>

                                <View className="p-4">
                                    <View className="flex-row justify-between items-start mb-1">
                                        <Text className="text-indigo-600 text-xs font-bold uppercase tracking-wider">{stall.cuisine}</Text>
                                        <View className="flex-row items-center gap-1">
                                            <Star size={12} fill="#F59E0B" color="#F59E0B" />
                                            <Text className="text-slate-700 text-xs font-bold">{stall.rating}</Text>
                                        </View>
                                    </View>

                                    <View className="flex-row justify-between items-center mt-1">
                                        <View>
                                            <Text className="text-xl font-bold text-slate-900">{stall.name}</Text>
                                            <Text className="text-slate-500 text-sm mt-1">{stall.description}</Text>
                                        </View>
                                        <View className="bg-slate-50 p-2 rounded-full">
                                            <ChevronRight size={20} color="#94A3B8" />
                                        </View>
                                    </View>
                                </View>
                            </Animated.View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default Dine;
