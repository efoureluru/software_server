import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { ArrowLeft, Share2, MapPin, Star, Clock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

// 20 Restaurants Data (Mock)
const RESTAURANT_DATA: Record<string, any> = {
    '1': {
        name: 'Royal Mandi', location: 'Food Court, 1st Floor', rating: 4.8, image: require('../../assets/images/dine-mandi.jpg'),
        gallery: [require('../../assets/images/dine-mandi.jpg'), require('../../assets/images/dine-mandi.jpg'), require('../../assets/images/dine-mandi.jpg')]
    },
    '2': {
        name: 'Beijing Bites', location: 'Food Court, 1st Floor', rating: 4.5, image: require('../../assets/images/dine-momo.jpg'),
        gallery: [require('../../assets/images/dine-momo.jpg'), require('../../assets/images/dine-momo.jpg')]
    },
    '3': {
        name: 'Punjab Grill', location: 'GF, Near Entrance', rating: 4.7, image: require('../../assets/images/dine-butter-chicken.png'),
        gallery: [require('../../assets/images/dine-butter-chicken.png'), require('../../assets/images/dine-butter-chicken.png')]
    },
    '4': {
        name: 'Dosa Plaza', location: 'Food Court, 2nd Floor', rating: 4.6, image: require('../../assets/images/dine-dosa.jpg'),
        gallery: [require('../../assets/images/dine-dosa.jpg'), require('../../assets/images/dine-dosa.jpg')]
    },
    '5': {
        name: 'Polar Bear', location: 'Kiosk 3, Ground Floor', rating: 4.9, image: require('../../assets/images/dine-kulfi.jpg'),
        gallery: [require('../../assets/images/dine-kulfi.jpg'), require('../../assets/images/dine-kulfi.jpg')]
    },
    '6': {
        name: 'Fish & Chips', location: 'Food Court, 1st Floor', rating: 4.4, image: require('../../assets/images/dine-fish.jpg'),
        gallery: [require('../../assets/images/dine-fish.jpg'), require('../../assets/images/dine-fish.jpg')]
    },
    '7': { name: 'Burger King', location: 'Food Court, 1st Floor', rating: 4.3, image: require('../../assets/images/dine-mandi.jpg'), gallery: [require('../../assets/images/dine-mandi.jpg')] },
    '8': { name: 'Pizza Hut', location: 'Food Court, 1st Floor', rating: 4.2, image: require('../../assets/images/dine-momo.jpg'), gallery: [require('../../assets/images/dine-momo.jpg')] },
    '9': { name: 'Tandoori Tales', location: 'Food Court, 2nd Floor', rating: 4.6, image: require('../../assets/images/dine-butter-chicken.png'), gallery: [require('../../assets/images/dine-butter-chicken.png')] },
    '10': { name: 'Chai Point', location: 'Kiosk 1, Ground Floor', rating: 4.5, image: require('../../assets/images/dine-dosa.jpg'), gallery: [require('../../assets/images/dine-dosa.jpg')] },
    '11': { name: 'Waffle House', location: 'Kiosk 2, Ground Floor', rating: 4.7, image: require('../../assets/images/dine-kulfi.jpg'), gallery: [require('../../assets/images/dine-kulfi.jpg')] },
    '12': { name: 'Sushi Bar', location: 'Restaurant Block', rating: 4.8, image: require('../../assets/images/dine-fish.jpg'), gallery: [require('../../assets/images/dine-fish.jpg')] },
    '13': { name: 'Taco Bell', location: 'Food Court, 1st Floor', rating: 4.1, image: require('../../assets/images/dine-mandi.jpg'), gallery: [require('../../assets/images/dine-mandi.jpg')] },
    '14': { name: 'Kebab Corner', location: 'Food Court, 2nd Floor', rating: 4.6, image: require('../../assets/images/dine-momo.jpg'), gallery: [require('../../assets/images/dine-momo.jpg')] },
    '15': { name: 'Biryani Blues', location: 'Restaurant Block', rating: 4.5, image: require('../../assets/images/dine-butter-chicken.png'), gallery: [require('../../assets/images/dine-butter-chicken.png')] },
    '16': { name: 'Idli Factory', location: 'Food Court, 1st Floor', rating: 4.4, image: require('../../assets/images/dine-dosa.jpg'), gallery: [require('../../assets/images/dine-dosa.jpg')] },
    '17': { name: 'Gelato Italiano', location: 'Kiosk 4, Ground Floor', rating: 4.8, image: require('../../assets/images/dine-kulfi.jpg'), gallery: [require('../../assets/images/dine-kulfi.jpg')] },
    '18': { name: 'Pasta Street', location: 'Restaurant Block', rating: 4.3, image: require('../../assets/images/dine-fish.jpg'), gallery: [require('../../assets/images/dine-fish.jpg')] },
    '19': { name: 'Smoothie King', location: 'Kiosk 5, Ground Floor', rating: 4.6, image: require('../../assets/images/dine-mandi.jpg'), gallery: [require('../../assets/images/dine-mandi.jpg')] },
    '20': { name: 'Sizzler Ranch', location: 'Restaurant Block', rating: 4.5, image: require('../../assets/images/dine-momo.jpg'), gallery: [require('../../assets/images/dine-momo.jpg')] },
};

export default function MenuPage() {
    const { id, name } = useLocalSearchParams();
    const router = useRouter();
    const restaurantId = typeof id === 'string' ? id : '1';
    const restaurant = RESTAURANT_DATA[restaurantId] || {
        name: name || 'Restaurant',
        image: null,
        gallery: []
    };

    return (
        <View className="flex-1 bg-slate-50">
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="light-content" />

            {/* Header / Gallery Section */}
            <View className="relative h-72">
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    className="h-full w-full"
                >
                    {(restaurant.gallery && restaurant.gallery.length > 0 ? restaurant.gallery : [restaurant.image]).map((img: any, index: number) => (
                        <Image
                            key={index}
                            source={img}
                            style={{ width: width, height: '100%' }}
                            resizeMode="cover"
                        />
                    ))}
                </ScrollView>

                {/* Gradient Overlay */}
                <View className="absolute inset-0 bg-black/20" />
                <View className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />

                {/* Navigation Buttons */}
                <View className="absolute top-0 left-0 right-0 pt-12 px-4 flex-row justify-between items-center z-10">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
                    >
                        <ArrowLeft size={20} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-10 h-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md"
                    >
                        <Share2 size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Info Overlay at Bottom */}
                <View className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <Text className="text-white text-3xl font-bold mb-1">{restaurant.name}</Text>
                    <View className="flex-row items-center gap-4">
                        <View className="flex-row items-center gap-1">
                            <Star size={16} fill="#F59E0B" color="#F59E0B" />
                            <Text className="text-white font-bold">{restaurant.rating}</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <MapPin size={16} color="#E2E8F0" />
                            <Text className="text-slate-200 text-sm">{restaurant.location}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Menu Section */}
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>

                <View className="px-6 py-6">
                    <Text className="text-slate-900 text-xl font-bold mb-4">Restaurant Menu</Text>
                    <Text className="text-slate-500 mb-6">Explore our delicious offerings. Prices are subject to change.</Text>

                    {/* Menu Card Placeholder */}
                    <View className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-6">
                        {restaurant.image ? (
                            <Image
                                source={restaurant.image}
                                style={{ width: '100%', height: width * 1.2 }} // Aspect ratio for Menu Card
                                resizeMode="cover"
                                className="rounded-xl"
                            />
                        ) : (
                            <View className="h-96 items-center justify-center bg-slate-50 rounded-xl">
                                <Text className="text-slate-400">Menu image not available</Text>
                            </View>
                        )}
                    </View>

                    {/* Additional Info or "Hard Copy" Scans */}
                    <View className="bg-indigo-50 p-4 rounded-xl flex-row items-start gap-3">
                        <Clock size={20} color="#4F46E5" className="mt-0.5" />
                        <View>
                            <Text className="text-indigo-900 font-bold mb-1">Opening Hours</Text>
                            <Text className="text-indigo-700">Mon-Sun: 11:00 AM - 11:00 PM</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    );
}
