import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Rating } from "react-native-ratings";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { Icon } from "react-native-paper";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import NIText from "../ProductCard/NIText/NIText";

export default function DepartmentCard({ department }) {
    return (
        <TouchableOpacity
            style={{

                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: '#bebebe',
                borderRadius: 2,
                overflow: 'hidden',
                // paddingHorizontal: 15, 
                marginLeft: 15, // Adds spacing between cards
                marginBottom: 15,
                width: Dimensions.get('screen').width / 2 - 22, // Slightly smaller for better fit in grid 
                // shadowColor: "#000", 
                // shadowOpacity: 0.1, 
                // shadowRadius: 5, 
                // elevation: 5 
            }}
            activeOpacity={0.8} // Slight click effect
            onPress={() => {
                navigationAdapter.navigate(NAVIGATION_ROUTES.FILTERED_PRODUCTS_SCREEN, { department })
            }}
        >
            <Image
                source={{ uri: department.image }}
                style={{ width: "100%", height: undefined, aspectRatio: 1, resizeMode: "cover" }}
            />
            <View style={{width:  '100%',  position: 'absolute', top: '50%', }}>
                <NIText type='regular' style={{ textAlign: 'center', fontSize: 20, width: '100%', height: 30}}>{department.name}</NIText>
            </View>

        </TouchableOpacity>
    );
}
