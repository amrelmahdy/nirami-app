import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Rating } from "react-native-ratings";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { Icon } from "react-native-paper";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";


type Brand = {
    id: string,
    name: string,
    image: string,
}


type FilterByBarProps = {
    brand: Brand
}

const BrandCard: React.FC<FilterByBarProps> = ({ brand }) => {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: '#bebebe',
                borderRadius: 2,
                overflow: 'hidden',
                // paddingHorizontal: 15, 
                marginRight: 15, // Adds spacing between cards
                marginBottom: 15,
                width: Dimensions.get('screen').width / 2 - 23, // Slightly smaller for better fit in grid 
                // shadowColor: "#000", 
                // shadowOpacity: 0.1, 
                // shadowRadius: 5, 
                // elevation: 5 
            }}
            activeOpacity={0.8} // Slight click effect
            onPress={() => {
                navigationAdapter.navigate(NAVIGATION_ROUTES.FILTERED_PRODUCTS_BY_BRAND, { brand })
            }}
        >

            <Image
                source={{ uri: brand.image }}
                style={{   aspectRatio: 1, resizeMode: "contain" }}
            />


        </TouchableOpacity>
    );
}

export default BrandCard