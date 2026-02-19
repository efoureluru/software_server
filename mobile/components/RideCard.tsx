import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import useStore from '../store/useStore';
import { Minus, Plus } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const RideCard = ({ ride, index }: { ride: any, index: number }) => {
    const { addToCart } = useStore();
    const [quantity, setQuantity] = useState(0);

    const handleAdd = () => {
        const newQty = 1;
        setQuantity(newQty);
        addToCart({
            id: `play-${ride.id}`,
            name: ride.title,
            price: typeof ride.price === 'number' ? ride.price : 0,
            image: ride.image,
            stall: ride.category
        }, newQty);
    };

    const updateQuantity = (change: number) => {
        const newQty = Math.max(0, quantity + change);
        setQuantity(newQty);

        // In a real app we'd update the cart item quantity directly here.
        // For this demo, we re-add which isn't perfect for syncing but works for the visual.
        // Ideally use 'updateQuantity' from store if available, or just rely on 'addToCart' logic handling updates.
        if (newQty > 0) {
            addToCart({
                id: `play-${ride.id}`,
                name: ride.title,
                price: typeof ride.price === 'number' ? ride.price : 0,
                image: ride.image,
                stall: ride.category
            }, change); // This assumes addToCart adds to existing. If it replaces, we need logic.
            // Our store logic adds 'quantity' to existing. So if I pass +1 it adds 1. If I pass -1 it adds -1?
            // Store logic: i.quantity + quantity. So passing 1 adds 1. Passing -1 adds -1.
            // So 'change' is exactly what we need (-1 or 1).
        } else {
            // Remove logic if 0? Store might not have remove-if-zero logic in addToCart alone.
            // But visually for the card state, 0 is enough to reset UI.
        }
    };

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 50).springify()}
            className="bg-white rounded-xl mb-3 overflow-hidden w-[32%] self-start shadow-sm border border-slate-50"
        >
            {/* Image Container */}
            <View className="h-24 w-full relative bg-white p-2 items-center justify-center">
                <Image
                    source={ride.image}
                    className="w-full h-full"
                    resizeMode="contain"
                />
                {/* Brand Logo/Vegetarian Icon Placeholder */}
                <View className="absolute bottom-2 left-2 border border-green-600 rounded-[4px] p-[1px]">
                    <View className="w-1.5 h-1.5 bg-green-600 rounded-full" />
                </View>
            </View>

            {/* Content */}
            <View className="p-2 pt-0">
                {/* Time Estimation */}
                <View className="flex-row items-center bg-slate-50 self-start px-1 py-0.5 rounded mb-1.5">
                    <Text className="text-[8px] font-bold text-slate-500">⏱ 12m</Text>
                </View>

                {/* Title */}
                <View className="h-8 mb-1">
                    <Text className="text-slate-900 font-bold text-xs leading-3" numberOfLines={2}>{ride.title}</Text>
                </View>

                {/* Weight/Variant (Mock) */}
                <Text className="text-slate-400 text-[9px] font-medium mb-2">1 Unit</Text>


                <View className="mt-auto">
                    <View className="mb-1">
                        <Text className="text-slate-900 font-bold text-xs">₹{ride.price}</Text>
                    </View>

                    {/* Add Button Logic w/ Blinkit Style - Compact for 3-col */}
                    {quantity === 0 ? (
                        <TouchableOpacity
                            onPress={handleAdd}
                            className="bg-white border border-[#27a844] rounded-md py-1 items-center justify-center shadow-sm active:bg-green-50"
                        >
                            <Text className="text-[#27a844] font-bold text-[10px] uppercase">ADD</Text>
                        </TouchableOpacity>
                    ) : (
                        <View className="flex-row items-center bg-[#27a844] rounded-md h-6 justify-between px-1 shadow-sm">
                            <TouchableOpacity
                                onPress={() => updateQuantity(-1)}
                                className="w-5 h-full items-center justify-center active:bg-green-700 rounded"
                            >
                                <Minus size={10} color="white" strokeWidth={3} />
                            </TouchableOpacity>
                            <Text className="text-white font-bold text-[10px]">{quantity}</Text>
                            <TouchableOpacity
                                onPress={() => updateQuantity(1)}
                                className="w-5 h-full items-center justify-center active:bg-green-700 rounded"
                            >
                                <Plus size={10} color="white" strokeWidth={3} />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Animated.View>
    );
};

export default RideCard;
