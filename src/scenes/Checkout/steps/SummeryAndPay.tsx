import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import { Text } from "react-native-gesture-handler";
import { List } from "react-native-paper";
import NIText from "../../../components/NIText/NIText";
import NIButton from "../../../components/NIButton/NIButton";
import { FONT_FAMILIES, Images } from "../../../assets";
import { t } from "i18next";
import { getIconUrl } from "../../../assets/icons";



type SummeryAndPayProps = {
    onNext?: () => void;
};

function SummeryAndPay({ onNext }: SummeryAndPayProps) {


    return (
        <View style={{ flex: 1, paddingHorizontal: 0, width: '100%', justifyContent: 'space-between', backgroundColor: '#FFF' }}>
            {/* <NIText>Affresses</NIText> */}

            <View style={{ marginHorizontal: 15 }}>
                <NIText style={{ fontSize: 15, marginBottom: 10 }}>كود الخصم</NIText>
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


    wrapper: {
        position: 'relative',
        height: 55,
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
