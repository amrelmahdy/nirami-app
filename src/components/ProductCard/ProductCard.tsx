import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, Alert } from "react-native";
import { Rating } from "react-native-ratings";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { Icon } from "react-native-paper";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import NIText from "../NIText/NIText";
import { Product, useAddProductToFav } from "../../hooks/products.hooks";
import i18next, { t } from "i18next";
import { useRoute } from "@react-navigation/native";
import { useAddProductToCart } from "../../hooks/cart.hooks";
import Toast from "react-native-toast-message";


type ProductCardProps = {
    product: Product,
    onPress?: () => void
}

const ProductCard = ({ product, onPress }: ProductCardProps) => {


    const route = useRoute();



    const useAddProductToFavourites = useAddProductToFav();

    const addToCart = useAddProductToCart();


    const handleOnAddProductToFavourites = () => {
        useAddProductToFavourites.mutate(product.id || product._id, {
            onSuccess: (res) => {
                console.log("Product added to favourites successfully", res);
                Toast.show({
                    type: 'success',
                    text1: t("تم تعديل قائمة المفضلة"),
                });
            },
            onError: (error) => {
                //Alert.alert("Error", error.message || "Failed to add product to favourites.");
            }
        });
    }


    const renderTopIcon = () => {
        if (route.name === NAVIGATION_ROUTES.FAV_LIST) {
            return (
                <Icon source={getIconUrl(Images, 'ic_close')} size={30} />
            );
        } else {
            if (product.isFavourited) {
                return <Icon source={getIconUrl(Images, 'ic_mdi_filled_heart')} size={30} />;
            } else {
                return <Icon source={getIconUrl(Images, 'ic_mdi_light_heart')} size={22} />;
            }
        }

    }

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
                if (onPress) {
                    onPress();
                    return;
                }
                //Alert.alert("Product Details", `You clicked on ${product.name[i18next.language as 'ar' | 'en']}`);
                navigationAdapter.navigate(NAVIGATION_ROUTES.PRODUCT_DETAILS, { product })
            }}
        >
            {/* Icons Positioned Over the Card */}
            <View style={{ position: "absolute", top: 0, left: 0, flexDirection: "row", gap: 8, zIndex: 10 }}>
                <TouchableOpacity
                    onPress={handleOnAddProductToFavourites}
                    style={{ padding: 0, borderRadius: 50, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>

                    {
                        renderTopIcon()

                    }
                </TouchableOpacity>
            </View>

            <View style={{ position: "absolute", bottom: 5, left: 5, flexDirection: "row", gap: 8, zIndex: 10 }}>
                <TouchableOpacity
                    onPress={() => {
                        addToCart.mutate(product.id || product._id, {
                            onSuccess: () => {
                                // Optionally, you can show a success message or update the UI
                                console.log('Product added to cart successfully');
                            },
                            onError: (error) => {
                                Alert.alert("Error", error.message || "Failed to add product to cart.");
                            }
                        });
                    }}
                    style={{ padding: 0, borderRadius: 50, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 }}>
                    {product?.inCart ? <Icon source={getIconUrl(Images, 'ic_mdi_cart')} size={22} /> :

                        <Icon source={getIconUrl(Images, 'ic_fam_icons_bag_outline')} size={22} />
                    }
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
                <NIText
                    style={{
                        fontSize: 16,
                        marginVertical: 4,
                        textAlign: 'left',
                        color: '#a2a2a3',
                        marginBottom: 10
                    }}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {product?.name[i18next.language as 'ar' | 'en']}
                </NIText>
                <View style={{}}>
                    <Rating
                        type='custom'
                        imageSize={18}
                        //showRating
                        onFinishRating={() => { }}
                        style={{ paddingVertical: 0, width: '100%', direction: 'rtl', alignItems: 'flex-start', marginBottom: 10 }}
                        readonly
                        ratingColor='#000000'
                        startingValue={product.averageRating}
                        tintColor="#FFF"
                        ratingBackgroundColor="#bebebe"
                        ratingTextColor="red"
                    />
                </View>
                <View style={{ flexDirection: 'row', opacity: product.isOnSale ? 1 : 0, marginBottom: 5 }}>
                    <Text style={{ fontSize: 12, fontFamily: 'Almarai-Light', marginLeft: 5, color: '#828282', textAlign: 'left' }}>السعر قبل الخصم</Text>
                    <Text style={{ fontSize: 12, fontWeight: "bold", color: "#828282", textAlign: 'left' }}>{product.price}</Text>
                    <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000", textAlign: 'left', }}>{product.isOnSale ? product.salesPrice : product.price}</Text>
                    <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                </View>
            </View>
        </TouchableOpacity>
    );
}


export default React.memo(ProductCard);