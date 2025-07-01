import React, { useEffect, useRef } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView, Text } from "react-native-gesture-handler";
import NavigationAdapter from '../../navigation/NavigationAdapter'
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { getIconUrl } from "../../assets/icons";
import { FONT_FAMILIES, Images } from "../../assets";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { TextInput, Icon } from "react-native-paper";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import NiScreen from "../../components/NIScreen/NiScreen";
import cartData from './../../stubs/cart.json'
import CartItem from "../../components/CartItem/CartItem";
import NIText from "../../components/NIText/NIText";
import NIButton from "../../components/NIButton/NIButton";
import { useGetCart } from "../../hooks/cart.hooks";
import navigationAdapter from "../../navigation/NavigationAdapter";



function CartScreen() {
    const { data: cartData, isLoading: cartDataIsLoading, isError: cartDataIstError, refetch } = useGetCart();

    // const insets = useSafeAreaInsets();

    // const carouselRef = useRef(null);
    // const data = [...new Array(6).keys()];
    // const width = Dimensions.get("window").width;
    // const progress = useSharedValue<number>(0);




    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <NiScreen title="عربة التسوق">
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                {
                    cartData &&
                        !cartDataIsLoading &&
                        !cartDataIstError &&
                        cartData.items
                        ? <>
                            <FlatList
                                // numColumns={1} // Set one column per row
                                // contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                // style={{ width: '100%' }}
                                // style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom: 50 }}
                                // style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom: 50 }}
                                // style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom:       50 }}                       
                                ListEmptyComponent={() => <View>
                                    <Image source={getIconUrl(Images, 'ic_fam_icons_bag_outline')} style={{ alignSelf: 'center' }} />
                                    <NIText type='light' style={{ height: 40, fontSize: 22, textAlign: 'center', marginVertical: 20 }}>لا توجد منتجات في عربة التسوق</NIText>
                                    <NIButton type='primary' onPress={() => NavigationAdapter.goBack()}>العودة للتسوق</NIButton>
                                    {/* <TouchableOpacity onPress={() => NavigationAdapter.goBack()} style={{ alignItems: 'center', marginTop: 20 }}>
                                       
                                       
                                       
                                        <NIButton type='light' style={{ fontSize: 16, textAlign: 'center', marginTop: 10, color: '#007bff' }}>العودة للتسوق</NIText>                  
                                    </TouchableOpacity> */}
                                </View>}

                                refreshing={cartDataIsLoading}
                                onRefresh={refetch}
                                keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                                data={cartData.items}
                                contentContainerStyle={{ paddingTop: 20 }}
                                renderItem={({ item, index }) => <CartItem item={item}


                                />} />
                            {cartData &&
                                !cartDataIsLoading &&
                                !cartDataIstError &&
                                cartData.items && cartData.items.length && <View style={{ marginBottom: 15 }}>
                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <NIText type='light' style={{ fontSize: 20, height: 25 }}>الملخص</NIText>
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                            <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={16} />
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'right', }}>175</Text>
                                        </View> */}
                                    </View>
                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <NIText type='light' style={{ fontSize: 16 }}>المجموع الفرعي</NIText>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                            <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={16} />
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'right', }}>{cartData.totalPrice}</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <NIText type='light' style={{ fontSize: 16 }}>التوصيل العادي</NIText>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                            <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={16} />
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'right', }}>25</Text>
                                        </View>
                                    </View>

                                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                        <NIText type='light' style={{ fontSize: 16 }}>المجموع ( شامل ضريبة القيمة المضافة )</NIText>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                            <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={16} />
                                            <Text style={{ fontSize: 16, fontWeight: "bold", color: "#000", textAlign: 'right', }}>175</Text>
                                        </View>
                                    </View>
                                    <NIButton onPress={() => {
                                        navigationAdapter.navigate(NAVIGATION_ROUTES.ChECKOUT)
                                    }}>عملية الدفع</NIButton>
                                </View>}
                        </> : <></>
                }
            </View>
        </NiScreen>

        // <>
        //     {/* <SafeAreaView style={{ borderBottomWidth: 1, borderColor: '#bfbfbf', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 15  }}> */}
        //     {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: insets.top, paddingBottom: 20,borderBottomWidth: 1, borderColor: '#bfbfbf',  paddingHorizontal: 15 }}>
        //             <View></View>
        //             <Text style={{ fontFamily: FONT_FAMILIES.ALMARAI_BOLD }}>المفضلة</Text>
        //             <View>
        //                 <TouchableOpacity onPress={() => NavigationAdapter.goBack()}>
        //                     <Icon source={getIconUrl(Images, 'ic_weui_arrow_outlined')} size={24} />
        //                 </TouchableOpacity>
        //             </View>
        //         </View> */}

        //     <PageHeader headerLabel="المفضلة" />
        //     {/* </SafeAreaView> */}
        //     <ScrollView style={{}}>

        //         <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom: 50 }}>
        //             <FlatList
        //                 numColumns={2}  // Set two columns per row
        //                 keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
        //                 data={products}
        //                 //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

        //                 renderItem={({ item, index }) => <ProductCard product={item} />} />
        //         </View>
        //     </ScrollView>
        // </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    }
})


export default CartScreen