import React, { useEffect, useRef } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import NavigationAdapter from '../../navigation/NavigationAdapter'
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { TextInput, Icon, Divider, ActivityIndicator } from "react-native-paper";
import NiScreen from "../../components/NIScreen/NiScreen";
import NIText from "../../components/NIText/NIText";
import NIButton from "../../components/NIButton/NIButton";
import { useGetOrdres } from "../../hooks/orders.hooks";


function OrdersScreen() {
    const { data: orders, isLoading: ordersIsLoading, isError: ordersIstError, refetch } = useGetOrdres();
    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <NiScreen title="الطلبات" style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {ordersIsLoading && <ActivityIndicator />}
                {
                    orders && !ordersIsLoading && !ordersIstError && orders?.length
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
                                    <NIText type='light' style={{ height: 40, fontSize: 22, textAlign: 'center', marginVertical: 20 }}>لم تقم بالطلب بعد </NIText>
                                    <NIButton type='primary' onPress={() => NavigationAdapter.goBack()}>العودة للتسوق</NIButton>
                                    {/* <TouchableOpacity onPress={() => NavigationAdapter.goBack()} style={{ alignItems: 'center', marginTop: 20 }}>
                                       
                                       
                                       
                                        <NIButton type='light' style={{ fontSize: 16, textAlign: 'center', marginTop: 10, color: '#007bff' }}>العودة للتسوق</NIText>                  
                                    </TouchableOpacity> */}
                                </View>}

                                refreshing={ordersIsLoading}
                                onRefresh={refetch}
                                keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                                data={orders}
                                contentContainerStyle={{ paddingTop: 20 }}
                                renderItem={({ item, index }) => <View>
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 5, paddingBottom: 20, }}>
                                            <NIText>رقم الطلب</NIText>
                                            <NIText>{item.orderNumber}</NIText>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 5, paddingBottom: 20, }}>
                                            <NIText>تاريخ الطلب</NIText>
                                            <NIText>{item.createdAt}</NIText>
                                        </View>
                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 5, paddingBottom: 20, }}>
                                            <NIText>السعر الاجمالي</NIText>
                                            <NIText>{item.finalPrice}</NIText>
                                        </View>

                                        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 5, paddingBottom: 20, }}>
                                            <NIText>الحالة</NIText>
                                            <NIText>{item.status}</NIText>
                                        </View>
                                    </View>


                                    <View style={{ paddingHorizontal: 20, paddingBottom: 0, borderRadius: 10, marginBottom: 0 }}>
                                        <NIButton
                                            onPress={() => NavigationAdapter.navigate(NAVIGATION_ROUTES.ORDER_DETAILS, { orderId: item.id })}
                                            style={{ marginBottom: 20 }}>عرض تفاصيل الطلب</NIButton>
                                        <NIButton
                                            onPress={() => NavigationAdapter.navigate(NAVIGATION_ROUTES.TRACK_ORDER, { orderId: item.id })}
                                            style={{ marginBottom: 20 }}

                                            type='secondary'>تتبع الطلب</NIButton>
                                    </View>


                                    <Divider style={{ marginVertical: 10 }} />
                                </View>} />

                        </> : <View>
                            <Image source={getIconUrl(Images, 'ic_fam_icons_bag_outline')} style={{ alignSelf: 'center' }} />
                            <NIText type='light' style={{ height: 40, fontSize: 22, textAlign: 'center', marginVertical: 20 }}>لم تقم بالطلب بعد </NIText>
                            <NIButton type='primary' onPress={() => NavigationAdapter.goBack()}>العودة للتسوق</NIButton>
                            {/* <TouchableOpacity onPress={() => NavigationAdapter.goBack()} style={{ alignItems: 'center', marginTop: 20 }}>
                                       
                                       
                                       
                                        <NIButton type='light' style={{ fontSize: 16, textAlign: 'center', marginTop: 10, color: '#007bff' }}>العودة للتسوق</NIText>                  
                                    </TouchableOpacity> */}
                        </View>
                }
            </View>
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


export default OrdersScreen