import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';

const CATEGORIES = [
    { id: '1', name: 'All', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081559.png' }, // Placeholder for 'All' grid icon
    { id: '2', name: 'Electronics', icon: 'https://cdn-icons-png.flaticon.com/512/3659/3659899.png' }, // Headphones
    { id: '3', name: 'Beauty', icon: 'https://cdn-icons-png.flaticon.com/512/3163/3163158.png' }, // Lipstick
    { id: '4', name: 'Decor', icon: 'https://cdn-icons-png.flaticon.com/512/4394/4394547.png' }, // Lamp
    { id: '5', name: 'Kids', icon: 'https://cdn-icons-png.flaticon.com/512/3081/3081329.png' }, // Baby bottle
    { id: '6', name: 'Gifts', icon: 'https://cdn-icons-png.flaticon.com/512/4213/4213958.png' }, // Gift
];

const CategoryRail = () => {
    return (
        <View className="bg-white py-4 px-2">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 20, paddingHorizontal: 10 }}>
                {CATEGORIES.map((cat, index) => (
                    <TouchableOpacity key={cat.id} className="items-center justify-center">
                        <View className={`w-14 h-14 rounded-2xl items-center justify-center mb-1 ${index === 0 ? 'bg-slate-800' : 'bg-slate-50'}`}>
                            <Image
                                source={{ uri: cat.icon }}
                                className="w-8 h-8"
                                style={{ tintColor: index === 0 ? '#fbbf24' : 'black' }} // Golden tint for 'All' active state
                            />
                        </View>
                        <Text className="text-[10px] font-semibold text-slate-700 text-center">{cat.name}</Text>
                        {index === 0 && <View className="h-0.5 w-6 bg-slate-800 mt-1 rounded-full" />}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default CategoryRail;
