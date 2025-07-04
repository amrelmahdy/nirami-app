import React, { useRef, useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Icon } from "react-native-paper";
import NIText from "../NIText/NIText";




const Tab = createMaterialTopTabNavigator();


type ChangeAddressProps = {
    onNext?: () => void;
};

function AddressCard({ onNext }: ChangeAddressProps) {

    return (
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', borderWidth: 1, borderColor: '#efefef', marginHorizontal: 15, borderRadius: 10, marginVertical: 10, overflow: 'hidden' }}>
            <View style={{ padding: 15, backgroundColor: '#FFF' }}>

                <NIText type='light' style={{ fontSize: 15 }}>Miss Ghaida Alsharef</NIText>
                <NIText type='light' style={{ fontSize: 15 }}>+966540521583</NIText>
                <NIText type='light' style={{ fontSize: 15 }}>الشافعي</NIText>
            </View>
            <View style={{ padding: 15 }}>
                <TouchableOpacity >
                    <NIText style={{ fontSize: 15, color: '#79777f' }}>تعديل العنوان</NIText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default AddressCard;

