import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { Icon, List } from "react-native-paper";
import NIText from "../../../components/NIText/NIText";
import NIButton from "../../../components/NIButton/NIButton";
import { getIconUrl } from "../../../assets/icons";
import { FONT_FAMILIES, Images } from "../../../assets";
import navigationAdapter from "../../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../../navigation/NavigationRoutes";


type ChangeAddressProps = {
    onNext?: () => void;
};

const OrderComplete = ({ onNext, orderId }: ChangeAddressProps) => {


    return (
        <View style={{ flex: 1, paddingHorizontal: 15, width: '100%' }}>
            <NIText style={{ fontSize: 20, marginBottom: 20 }}>شكرا لك لطلبك من نيرامي</NIText>
            <View style={{ flexDirection: 'row-reverse' }}>
                <Icon source={getIconUrl(Images, 'ic_check')} size={40} />

                <View>
                    <NIText style={{ fontSize: 20, marginBottom: 5 }}> تم تاكيد الطلب</NIText>
                    <NIText style={{ fontSize: 14, marginBottom: 15, fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>  رقم الطلب 22477655</NIText>

                </View>
            </View>


            <NIButton onPress={() => {
                navigationAdapter.navigate(NAVIGATION_ROUTES.ORDER_DETAILS, { orderId  });
            }}>الذهاب لتفاصيل الطلب</NIButton>
        </View>
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
});

export default OrderComplete;
