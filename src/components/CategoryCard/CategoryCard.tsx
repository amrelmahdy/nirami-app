import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Rating } from "react-native-ratings";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { Icon } from "react-native-paper";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import NIText from "../NIText/NIText";


export type Category = {
    name: {
        en: string;
        ar: string;
    };
    image?: string;
    createdAt?: string;
    updatedAt?: string;
    id?: string;
};
export type CategoryCardProps = {
    category: Category
};


export default function CategoryCard({ category }: CategoryCardProps) {

    const [aspectRatio, setAspectRatio] = useState(1); // default square

    useEffect(() => {
        if (category.image) {
            Image.getSize(category.image, (width, height) => {
                setAspectRatio(width / height);
            }, (error) => {
                console.warn("Failed to get image size", error);
            });
        }
    }, [category.image]);

    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: '#bebebe',
                borderRadius: 2,
                width: Dimensions.get('screen').width / 2 - 20, // slightly smaller for better fit
            }}
            activeOpacity={0.8}
            onPress={() => {
                navigationAdapter.navigate(NAVIGATION_ROUTES.FILTERED_PRODUCTS, { category })
            }}
        >
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#000', opacity: 0.1, zIndex: 1 }} />

            <Image
                source={{ uri: category.image }}
                style={{
                    width: '100%',
                    aspectRatio,
                    resizeMode: 'cover',
                }}
            />

            <View style={{ width: '100%', position: 'absolute', top: '50%', zIndex: 2 }}>
                <NIText type='regular' style={{ textAlign: 'center', fontSize: 20, width: '100%', height: 30, color: '#FFF' }}>{category.name.ar}</NIText>
            </View>

        </TouchableOpacity>
    );
}
