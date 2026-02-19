import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter, Play as PlayIcon, Info } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import clsx from 'clsx';
import useStore from '../../store/useStore';

export const ACTIVITIES = [
    {
        id: 1,
        title: 'Balloon Shooting',
        price: 100,
        ageGroup: 'All Ages',
        category: 'Rides',
        image: { uri: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80' },
        desc: 'Aim and fire to win prizes.'
    },
    {
        id: 2,
        title: 'Bouncy',
        price: 100,
        ageGroup: 'Kids',
        category: 'Rides',
        image: { uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80' },
        desc: 'Safe inflatable fun for kids.'
    },
    {
        id: 3,
        title: 'Bull Ride',
        price: 100,
        ageGroup: '10+',
        category: 'Rides',
        image: { uri: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=600&q=80' },
        desc: 'Test your strength and balance.'
    },
    {
        id: 4,
        title: 'Bumping Cars',
        price: 150,
        ageGroup: '7+',
        category: 'Rides',
        image: { uri: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80' },
        desc: 'Classic favorite for fun.'
    },
];

const Play = () => {
    const { addToCart } = useStore();
    const [filter, setFilter] = useState('All');

    const filteredActivities = filter === 'All'
        ? ACTIVITIES
        : ACTIVITIES.filter(a => a.ageGroup.includes(filter) || a.category === filter);

    return (
        <View className="flex-1 bg-surface-app">
            <Stack.Screen options={{ headerShown: false }} />

            <SafeAreaView className="flex-1" edges={['top']}>
                <View className="px-6 pt-4 pb-2 bg-surface-app z-10">
                    <Text className="text-slate-900 text-3xl font-bold tracking-tight mb-4">Activities</Text>

                    {/* Filters */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6" contentContainerStyle={{ gap: 10 }}>
                        {['All', 'Sports', 'Action', 'Gaming', 'Rides'].map((cat) => (
                            <TouchableOpacity
                                key={cat}
                                onPress={() => setFilter(cat)}
                                className={clsx(
                                    "px-4 py-2 rounded-full border",
                                    filter === cat ? "bg-slate-900 border-slate-900" : "bg-white border-slate-200"
                                )}
                            >
                                <Text className={clsx("font-semibold text-sm", filter === cat ? "text-white" : "text-slate-600")}>
                                    {cat}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
                    {filteredActivities.map((activity, index) => (
                        <Animated.View
                            entering={FadeInUp.delay(index * 100).springify()}
                            key={activity.id}
                            className="bg-white rounded-xl mb-6 shadow-sm border border-slate-100 overflow-hidden"
                        >
                            <View className="h-48 w-full relative">
                                <Image source={activity.image} className="w-full h-full" resizeMode="cover" />
                                <View className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                                    <Text className="text-xs font-bold text-slate-800 uppercase tracking-widest">{activity.category}</Text>
                                </View>
                            </View>

                            <View className="p-5">
                                <View className="flex-row justify-between items-start mb-2">
                                    <Text className="text-xl font-bold text-slate-900 flex-1 mr-2">{activity.title}</Text>
                                    <Text className="text-lg font-semibold text-indigo-600">
                                        {typeof activity.price === 'number' ? `₹${activity.price}` : activity.price}
                                    </Text>
                                </View>

                                <Text className="text-slate-500 text-sm leading-relaxed mb-4">{activity.desc}</Text>

                                <View className="flex-row items-center justify-between border-t border-slate-100 pt-4">
                                    <View className="flex-row items-center gap-2">
                                        <Info size={14} color="#64748B" />
                                        <Text className="text-slate-500 text-xs font-medium">{activity.ageGroup}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => addToCart({ ...activity, name: activity.title, stall: 'Gaming', price: typeof activity.price === 'number' ? activity.price : 0 })}
                                        className="bg-slate-900 px-5 py-2 rounded-lg active:opacity-90"
                                    >
                                        <Text className="text-white font-bold text-sm">Book</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

export default Play;
