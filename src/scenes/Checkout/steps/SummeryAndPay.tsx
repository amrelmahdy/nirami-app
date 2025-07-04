import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, TextInput, FlatList } from "react-native";
import { ScrollView, Text } from "react-native-gesture-handler";
import { Icon, List, RadioButton } from "react-native-paper";
import NIText from "../../../components/NIText/NIText";
import NIButton from "../../../components/NIButton/NIButton";
import { FONT_FAMILIES, Images } from "../../../assets";
import { t } from "i18next";
import { getIconUrl } from "../../../assets/icons";
import { useGetCart } from "../../../hooks/cart.hooks";
import { Image } from "react-native-reanimated/lib/typescript/Animated";
import CartItem from "../../../components/CartItem/CartItem";
import AddressCard from "../../../components/AddressCard/AddressCard";



type SummeryAndPayProps = {
    onNext?: () => void;
};

function SummeryAndPay({ onNext }: SummeryAndPayProps) {


    const [paymentMethod, setPaymentMethod] = useState<string>('credit_card'); // Default selected payment method

    const { data: cartData, isLoading: cartDataIsLoading, isError: cartDataIstError, refetch } = useGetCart();

    return (
        <ScrollView >

            <View style={{ flex: 1, paddingHorizontal: 0, width: '100%', justifyContent: 'space-between', backgroundColor: '#FFF' }}>

                <View style={{ marginHorizontal: 0 }}>


                    <View style={{ marginHorizontal: 15 }}>
                        {
                            cartData &&
                                !cartDataIsLoading &&
                                !cartDataIstError &&
                                cartData.items
                                ?
                                <FlatList
                                    // numColumns={1} // Set one column per row
                                    // contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    // style={{ width: '100%' }}
                                    // style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom: 50 }}
                                    // style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom: 50 }}
                                    // style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom:       50 }}                       
                                    // ListEmptyComponent={() => <View>
                                    //     <Image source={getIconUrl(Images, 'ic_fam_icons_bag_outline')} style={{ alignSelf: 'center' }} />
                                    //     <NIText type='light' style={{ height: 40, fontSize: 22, textAlign: 'center', marginVertical: 20 }}>لا توجد منتجات في عربة التسوق</NIText>
                                    //     <NIButton type='primary' onPress={() => NavigationAdapter.goBack()}>العودة للتسوق</NIButton>
                                    //     {/* <TouchableOpacity onPress={() => NavigationAdapter.goBack()} style={{ alignItems: 'center', marginTop: 20 }}>



                                    //         <NIButton type='light' style={{ fontSize: 16, textAlign: 'center', marginTop: 10, color: '#007bff' }}>العودة للتسوق</NIText>                  
                                    //     </TouchableOpacity> */}
                                    // </View>}

                                    refreshing={cartDataIsLoading}
                                    onRefresh={refetch}
                                    keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                                    data={cartData.items}
                                    contentContainerStyle={{ paddingTop: 20 }}
                                    renderItem={({ item, index }) => <CartItem item={item}


                                    />} /> : <></>
                        }
                    </View>

                    <View style={{ marginBottom: 20, backgroundColor: "#f8f8f8", paddingVertical: 15 }}>
                        <NIText style={{ fontSize: 15, marginBottom: 10, marginHorizontal: 15 }}>كود الخصم</NIText>
                        <View style={styles.wrapper}>
                            <TextInput
                                // value={value}
                                // onChangeText={onChangeText}
                                //placeholder={""}
                                placeholderTextColor="#bebebe"
                                style={styles.input}
                            />



                            <NIButton style={styles.button}>تطبيق</NIButton>
                        </View>
                    </View>

                    <View style={{ marginBottom: 15, marginHorizontal: 15 }}>
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
                    </View>


                    <View>
                        <View style={{ marginHorizontal: 15, }}>
                            <NIText type='light' style={{ fontSize: 23, height: 25, marginTop: 20 }}>عنوان التوصيل</NIText>
                        </View>

                        <AddressCard />
                    </View>


                    {/* ''
    | ''
    | ''
    | 'tabby'
    | 'tamara' */}


                    <View>
                        <View style={{ marginHorizontal: 15, }}>
                            <NIText type='light' style={{ fontSize: 23, height: 25, marginTop: 20 }}>حدد طريقة الدفع</NIText>
                        </View>

                        <View style={{}}>

                            <RadioButton.Group onValueChange={setPaymentMethod} value={paymentMethod}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', height: 60 }}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                                        <View style={{ borderWidth: 1, borderColor: '#b7b7b7', borderRadius: 5, paddingHorizontal: 5, marginRight: 10 }}>
                                            <Icon source={getIconUrl(Images, 'ic_logos_mastercard')} size={25} />
                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: '#b7b7b7', borderRadius: 5, paddingHorizontal: 5, marginRight: 10 }}>
                                            <Icon source={getIconUrl(Images, 'ic_visa')} size={25} />
                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: '#b7b7b7', borderRadius: 5, paddingHorizontal: 5, marginRight: 10 }}>
                                            <Icon source={getIconUrl(Images, 'ic_kisspng_logo_american_express')} size={25} />
                                        </View>
                                        <View style={{ borderWidth: 1, borderColor: '#b7b7b7', borderRadius: 5, paddingHorizontal: 5, marginRight: 10 }}>
                                            <Icon source={getIconUrl(Images, 'ic_mada')} size={25} />
                                        </View>
                                    </View>

                                    <View style={{}}>
                                        <RadioButton.Item
                                            style={{ marginRight: -10 }}
                                            value="credit_card"
                                            label='البطاقة الائتمانية'
                                            labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                                            status='checked'
                                            //color='#F3E2CD'
                                            //uncheckedColor='#F3E2CD'
                                            // onPress={() => { }}
                                            mode='android'
                                            rippleColor="transparent"

                                        />
                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                                        <Icon source={getIconUrl(Images, 'ic_logos_apple_pay')} size={50} />
                                    </View>
                                    <RadioButton.Item
                                        style={{ marginRight: -10 }}
                                        value="apple_pay"
                                        label='ابل باي'
                                        labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                                        status='checked'
                                        // color='#F6C5DD'
                                        // uncheckedColor='#F6C5DD'
                                        onPress={() => { }}
                                        mode='android'
                                        rippleColor="transparent"

                                    />
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                                        <Icon source={getIconUrl(Images, 'ic_cash_on_delivery')} size={30} />
                                    </View>

                                    <RadioButton.Item
                                        style={{ marginRight: -10 }}
                                        value="cash_on_delivery"
                                        label='الدفع عند الاستلام'
                                        labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                                        status='checked'

                                        // color='#693B13'
                                        // uncheckedColor='#F3E2CD'
                                        mode='android'
                                        rippleColor="transparent"

                                    />
                                </View>






                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                                        <Icon source={getIconUrl(Images, 'ic_tabby')} size={50} />
                                    </View>
                                    <RadioButton.Item
                                        style={{ marginRight: -10 }}
                                        value="tabby"
                                        label='تابي'
                                        labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                                        status='checked'
                                        // color='#F6C5DD'
                                        // uncheckedColor='#F6C5DD'
                                        onPress={() => { }}
                                        mode='android'
                                        rippleColor="transparent"

                                    />
                                </View>



                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <View style={{ flexDirection: 'row', marginHorizontal: 15, alignItems: 'center' }}>
                                        <Icon source={getIconUrl(Images, 'ic_tamara')} size={70} />
                                    </View>
                                    <RadioButton.Item
                                        style={{ marginRight: -10 }}
                                        value="tamara"
                                        label='تمارا'
                                        labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                                        status='checked'
                                        // color='#EEEAEA'
                                        // uncheckedColor='#EEEAEA'
                                        onPress={() => { }}
                                        mode='android'
                                        rippleColor="transparent"

                                    />
                                </View>
                            </RadioButton.Group>
                        </View>
                    </View>
                </View>

                <View style={{ padding: 15, backgroundColor: '#FFF' }}>
                    <NIButton style={{ marginBottom: 10 }} onPress={onNext}>دفع</NIButton>

                </View>
            </View>
        </ScrollView>
    );
}

const circleSize = 20;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
        // marginTop: 20,
        direction: "rtl",
    },
    stepContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        justifyContent: "center",
    },
    stepWrapper: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    circleWrapper: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: "#c3c3c3",
        justifyContent: "center",
        alignItems: "center",

    },
    activeCircle: {
        backgroundColor: "#000",
    },
    label: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },
    activeLabel: {
        color: "white",
    },
    line: {
        height: 2,
        backgroundColor: "#c3c3c3",
        zIndex: 0,
    },
    activeLine: {
        backgroundColor: "#000",
    },
    stepLabel: {
        position: "absolute",
        top: circleSize + 6,
        fontSize: 12,
        color: "#333",
        textAlign: "center",
    },
    contentContainer: {
        marginTop: 30,
        alignItems: "center",
    },
    card: {
        fontSize: 16,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },


    wrapper: {
        position: 'relative',
        height: 55,
        marginHorizontal: 15,
        // borderRadius: 10,
        // backgroundColor: '#fff',
        justifyContent: 'center',
    },
    input: {
        height: '100%',
        // borderRadius: 10,
        paddingRight: 12,
        paddingLeft: 60, // space for button
        backgroundColor: '#fff',
        color: '#000',
        // textAlign: I18nManager.isRTL ? 'right' : 'left',
        textAlign: 'right',
        borderWidth: 1,
        borderColor: '#b7b7b7',
        borderRadius: 5,

    },
    button: {
        position: 'absolute',
        // left: I18nManager.isRTL ? undefined : 10,
        // right: I18nManager.isRTL ? 10 : undefined,
        right: undefined,
        left: 10,
        borderRadius: 5,
        height: '60%',
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#452347',
    },
    buttonText: {
        fontSize: 14,
        color: '#FFF',
    },
});

export default SummeryAndPay;
