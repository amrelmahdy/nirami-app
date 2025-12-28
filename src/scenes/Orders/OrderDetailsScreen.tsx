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
import { TextInput, Icon, Divider, ActivityIndicator } from "react-native-paper";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import NiScreen from "../../components/NIScreen/NiScreen";
import cartData from './../../stubs/cart.json'
import CartItem from "../../components/CartItem/CartItem";
import NIText from "../../components/NIText/NIText";
import NIButton from "../../components/NIButton/NIButton";
import { useGetCart } from "../../hooks/cart.hooks";
import navigationAdapter from "../../navigation/NavigationAdapter";
import { useGetOrderDetails, useGetOrdres } from "../../hooks/orders.hooks";



function OrderDetailsScreen({ route }) {

    const { orderId } = route.params as { orderId: string }; // Get the orderId from route params

    const { data: order, isLoading: orderIsLoading, isError: orderIstError, refetch } = useGetOrderDetails(orderId);

    // const insets = useSafeAreaInsets();

    // const carouselRef = useRef(null);
    // const data = [...new Array(6).keys()];
    // const width = Dimensions.get("window").width;
    // const progress = useSharedValue<number>(0);


    if(orderIsLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#3f2848" />
        </View>
    }



    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <NiScreen title="تفاصيل الطلب" style={{ flex: 1 }}>
            <ScrollView
                style={{ flex: 1 }}>

                {/* {orderIsLoading && <ActivityIndicator />} */}

                {order &&
                    !orderIsLoading &&
                    !orderIstError &&
                    order.items
                    && <>
                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <NIText style={{ fontSize: 18, fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>الطلبات الخاصة بك</NIText>
                        </View>
                        <View style={{ marginHorizontal: 15 }}>


                            <FlatList
                                // numColumns={1} // Set one column per row
                                // contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                refreshing={orderIsLoading}
                                onRefresh={refetch}
                                keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                                data={order?.items}
                                contentContainerStyle={{ paddingTop: 20 }}
                                renderItem={({ item, index }) => <CartItem item={item}


                                />} />

                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <NIText style={{ fontSize: 18, fontFamily: FONT_FAMILIES.ALMARAI_LIGHT, height: 25, marginBottom: 20 }}>بيانات الدفع</NIText>
                        </View>

                        <View style={{ marginBottom: 15, marginHorizontal: 15 }}>

                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                <NIText type='light' style={{ fontSize: 16 }}>طريقة الدفع</NIText>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                    <NIText style={{ fontSize: 16, color: "#000", fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>{order?.paymentMethod}</NIText>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                <NIText type='light' style={{ fontSize: 16 }}>السعر</NIText>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                    <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={16} />
                                    <NIText style={{ fontSize: 16, color: "#000", fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>{order?.totalPrice}</NIText>
                                </View>
                            </View>

                            {order?.discount && <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                <NIText type='light' style={{ fontSize: 16 }}>الخصم</NIText>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                    <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={16} />
                                    <NIText style={{ fontSize: 16, fontWeight: "bold", color: "#000", fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>{order?.discount?.value}</NIText>
                                </View>
                            </View>}

                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                <NIText type='light' style={{ fontSize: 16 }}>التوصيل</NIText>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                    <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={16} />
                                    <NIText style={{ fontSize: 16, color: "#000", fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>{order?.shippingCost}</NIText>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                <NIText type='light' style={{ fontSize: 16 }}>المجموع الإجمالي</NIText>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                    <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={16} />
                                    <NIText style={{ fontSize: 16, color: "#000", fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>{order?.finalPrice}</NIText>
                                </View>
                            </View>

                            <Divider style={{ marginVertical: 10 }} />

                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                <NIText type='light' style={{ fontSize: 16 }}>رقم الطلب</NIText>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                    <NIText style={{ fontSize: 16, color: "#000", fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>{order?.orderNumber}</NIText>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                <NIText type='light' style={{ fontSize: 16 }}>تاريخ الطلب</NIText>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                    <NIText style={{ fontSize: 16, color: "#000", fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>{order?.createdAt}</NIText>
                                </View>
                            </View>


                            <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 }}>
                                <NIText type='light' style={{ fontSize: 16 }}>الحالة</NIText>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                                    <NIText style={{ fontSize: 16, color: "#000", fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>{order?.status}</NIText>
                                </View>
                            </View>
                            <Divider style={{ marginVertical: 10 }} />
                        </View>
                    </>
                }
            </ScrollView>
        </NiScreen>
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


export default OrderDetailsScreen