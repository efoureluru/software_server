import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import useStore from '../store/useStore';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { ShoppingBag, ChevronRight } from 'lucide-react-native';

const FloatingCart = () => {
    const { cart } = useStore();

    // Calculate total items and price
    const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    if (totalItems === 0) return null;

    return (
        <Animated.View
            entering={FadeInDown.springify().damping(15)}
            exiting={FadeOutDown}
            className="absolute bottom-4 left-4 right-4"
        >
            <TouchableOpacity
                activeOpacity={0.9}
                className="bg-[#27a844] rounded-xl p-4 shadow-lg flex-row items-center justify-between"
            >
                {/* Left: Item Count & Total */}
                <View className="flex-1">
                    <Text className="text-white font-extrabold text-xs uppercase tracking-wider mb-0.5">
                        {totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'}
                    </Text>
                    <View className="flex-row items-baseline">
                        <Text className="text-white font-bold text-lg mr-1">₹{totalPrice}</Text>
                        <Text className="text-green-100 text-xs font-medium line-through">₹{totalPrice + 45}</Text>
                    </View>
                </View>

                {/* Right: View Cart Action */}
                <View className="flex-row items-center">
                    <Text className="text-white font-bold text-base mr-2">View Cart</Text>
                    <View className="bg-white/20 p-1 rounded">
                        <ChevronRight size={16} color="white" strokeWidth={3} />
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default FloatingCart;
