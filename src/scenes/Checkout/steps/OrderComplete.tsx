import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import NIText from "../../../components/NIText/NIText";
import NIButton from "../../../components/NIButton/NIButton";

function CheckoutScreen() {


    return (
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
            <NIText>Affresses</NIText>
            <NIButton onPress={() => {
                //navigationAdapter.navigate(NAVIGATION_ROUTES.ChECKOUT)
            }}>عملية الدفع</NIButton>
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

export default CheckoutScreen;
