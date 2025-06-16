import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Rating } from "react-native-ratings";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { Icon } from "react-native-paper";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import NIText from "../NIText/NIText";
import { Product } from "../../hooks/products.hooks";
import i18next from "i18next";


type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <TouchableOpacity
            style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: '#bebebe',
                borderRadius: 2,
                overflow: 'hidden',
                direction: 'rtl', // Ensures text and icons are aligned correctly for RTL languages
                // paddingHorizontal: 15, 
                marginRight: 15, // Adds spacing between cards
                marginBottom: 15,
                width: Dimensions.get('screen').width / 2 - 22, // Slightly smaller for better fit in grid 

            }}
            activeOpacity={0.8} // Slight click effect
            onPress={() => {
                navigationAdapter.navigate(NAVIGATION_ROUTES.PRODUCT_DETAILS, { product })
            }}
        >
            {/* Icons Positioned Over the Card */}
            <View style={{ position: "absolute", top: 5, left: 5, flexDirection: "row", gap: 8, zIndex: 10 }}>
                <TouchableOpacity style={{ padding: 0, borderRadius: 50, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    <Icon source={getIconUrl(Images, 'ic_mdi_light_heart')} size={22} />
                </TouchableOpacity>
            </View>

            <View style={{ position: "absolute", bottom: 5, left: 5, flexDirection: "row", gap: 8, zIndex: 10 }}>
                <TouchableOpacity style={{ padding: 0, borderRadius: 50, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    <Icon source={getIconUrl(Images, 'ic_cart')} size={22} />
                </TouchableOpacity>
            </View>

            {/* Product Image */}
            <Image
                source={{ uri: product.productCardImage }}
                style={{ width: "100%", height: undefined, aspectRatio: 1, resizeMode: "cover" }}
            />

            {/* Product Info */}
            <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                <NIText style={{ fontSize: 12, color: "#000", textAlign: 'left', fontWeight: 'bold' }}>{product?.brand?.name?.ar}</NIText>
                <NIText style={{ fontSize: 16, marginVertical: 4, textAlign: 'left', color: '#a2a2a3', marginBottom: 10 }}>{
                    product?.name[i18next.language as 'ar' | 'en']
                }</NIText>
                <View style={{}}>
                    <Rating
                        type='custom'
                        imageSize={18}
                        //showRating
                        onFinishRating={() => { }}
                        style={{ paddingVertical: 0, width: '100%', direction: 'rtl', alignItems: 'flex-start', marginBottom: 20 }}
                        readonly
                        ratingColor='#000000'
                        startingValue={product.averageRating}
                        tintColor="#FFF"
                        ratingBackgroundColor="#bebebe"
                        ratingTextColor="red"
                    />
                </View>
                {
                   product.isOnSale && <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12, fontFamily: 'Almarai-Light', marginLeft: 5, color: '#828282', textAlign: 'left' }}>السعر قبل الخصم</Text>
                        <Text style={{ fontSize: 12, fontWeight: "bold", color: "#828282", textAlign: 'left' }}>150</Text>
                        <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                    </View>
                }
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000", textAlign: 'left', }}>{product.price}</Text>
                    <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                </View>
            </View>
        </TouchableOpacity>
    );
}
