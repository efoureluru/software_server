import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, User, Search, Mic } from 'lucide-react-native';

const HomeHeader = () => {
    return (
        <View className="overflow-hidden">
            <LinearGradient
                colors={['#F8CB46', '#F8CB46', 'rgba(248, 203, 70, 0.8)', 'transparent']}
                className="pt-12 pb-4 px-4"
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ minHeight: 140 }}
            >
                {/* Top Row: Brand/Location & Profile */}
                <View className="flex-row items-center justify-between mb-4">
                    <View>
                        <Text className="text-black font-extrabold text-2xl tracking-tight">Blinkit in</Text>
                        <View className="flex-row items-center">
                            <Text className="text-black font-extrabold text-3xl mr-2">11 minutes</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-black font-semibold text-sm">HOME - Veterinary Colony, Vijayawada</Text>
                            <MapPin size={12} color="black" className="ml-1" />
                        </View>
                    </View>
                    <TouchableOpacity className="bg-white/90 p-2 rounded-full shadow-sm">
                        <User size={24} color="black" />
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View className="flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-slate-100">
                    <Search size={20} color="#64748B" className="mr-3" />
                    <TextInput
                        placeholder='Search "disposables"'
                        className="flex-1 text-base font-medium text-slate-800"
                        placeholderTextColor="#94A3B8"
                    />
                    <View className="h-5 w-[1px] bg-slate-200 mx-3" />
                    <Mic size={20} color="#64748B" />
                </View>
            </LinearGradient>
        </View>
    );
};

export default HomeHeader;
