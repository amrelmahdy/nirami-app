import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Rating } from "react-native-ratings";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { Icon } from "react-native-paper";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";

export default function ProductCard({ product }) {
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
                navigationAdapter.navigate(NAVIGATION_ROUTES.PRODUCT_DETAILS, { product })
            }}
        >
            {/* Icons Positioned Over the Card */}
            <View style={{ position: "absolute", top: 5, left: 5, flexDirection: "row", gap: 8, zIndex: 10 }}>
                <TouchableOpacity style={{  padding: 0, borderRadius: 50, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    <Icon source={getIconUrl(Images, 'ic_mdi_light_heart')} size={22} />
                </TouchableOpacity>
            </View>

            <View style={{ position: "absolute", bottom: 5, left: 5, flexDirection: "row", gap: 8, zIndex: 10 }}>
                <TouchableOpacity style={{ padding: 0, borderRadius: 50, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    <Icon source={getIconUrl(Images, 'ic_cart')}  size={22} />
                </TouchableOpacity>
            </View>

            {/* Product Image */}
            <Image
                source={{ uri: product.image }}
                style={{ width: "100%", height: undefined, aspectRatio: 1, resizeMode: "cover" }}
            />

            {/* Product Info */}
            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 12, color: "#000", textAlign: 'right', fontWeight: 'bold' }}>{product.category}</Text>
                <Text style={{ fontSize: 16, marginVertical: 4, textAlign: 'right', fontFamily: 'Almarai-Light', color: '#a2a2a3', marginBottom: 10 }}>{product.name}</Text>
                <View style={{}}>
                    <Rating
                        type='custom'
                        imageSize={24}
                        //showRating
                        onFinishRating={() => { }}
                        style={{ paddingVertical: 0, width: '100%', direction: 'rtl', alignItems: 'flex-start', marginBottom: 20 }}
                        readonly
                        ratingColor='#000000'
                        startingValue={product.ratings}
                        tintColor="#FFF"
                        ratingBackgroundColor="#bebebe"
                        ratingTextColor="red"
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                    <Text style={{ fontSize: 12, fontWeight: "bold", color: "#828282", }}>150</Text>
                    <Text style={{ fontSize: 12,fontFamily: 'Almarai-Light', marginLeft: 5, color: '#828282' }}>السعر قبل الخصم</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                    <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000", textAlign: 'right', }}>{product.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
