import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
// import { Link, useRouter } from 'expo-router'; // Kept if needed later, otherwise unused now
import useStore from '../../store/useStore';
import { ACTIVITIES } from './play';
import RideCard from '../../components/RideCard';
import HomeHeader from '../../components/HomeHeader';
import CategoryRail from '../../components/CategoryRail';
import FloatingCart from '../../components/FloatingCart';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Home = () => {
    return (
        <View className="flex-1 bg-[#F4F6FB]">
            <View className="bg-yellow-400">
                {/* SafeArea background fix */}
            </View>

            <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* Header Section (Sticky) */}
                <HomeHeader />

                {/* Content Body */}
                <View className="pb-8">

                    {/* Categories */}
                    <CategoryRail />

                    {/* Bestsellers Section (Horizontal Scroll Mockup) */}
                    <View className="mt-4 px-4">
                        <Text className="text-lg font-extrabold text-slate-900 mb-3">Bestsellers</Text>
                        {/* We use the first 2 items as mock bestsellers for now */}
                        <View className="flex-row gap-3">
                            {ACTIVITIES.slice(0, 3).map((ride, index) => (
                                <RideCard key={`best-${ride.id}`} ride={ride} index={index} />
                            ))}
                        </View>
                    </View>

                    {/* All Rides Section (Grid 3 Columns) */}
                    <View className="mt-4 px-3">
                        <View className="flex-row items-center justify-between mb-4 px-1">
                            <Text className="text-lg font-extrabold text-slate-900">Grocery & Kitchen</Text>
                            <Text className="text-[#27a844] font-bold text-xs">see all</Text>
                        </View>

                        <View className="flex-row flex-wrap justify-between">
                            {ACTIVITIES.map((ride, index) => (
                                <RideCard key={ride.id} ride={ride} index={index} />
                            ))}
                            {/* Spacer to keep last row alignment if not full */}
                            {[...Array(3)].map((_, i) => <View key={`spacer-${i}`} className="w-[32%]" />)}
                        </View>
                    </View>

                    {/* Footer Note */}
                    <View className="mt-12 items-center mb-8">
                        <Text className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Paradise Resort • Est 2024</Text>
                    </View>
                </View>
            </ScrollView>

            <FloatingCart />
        </View>
    );
};

export default Home;
