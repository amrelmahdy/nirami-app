import React, { useRef, useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
    Alert
} from "react-native";
import { Icon } from "react-native-paper";
import NIText from "../NIText/NIText";
import NIButton from "../NIButton/NIButton";
import { Address, useDeleteAddress } from "../../hooks/addresses.hooks";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { t } from "i18next";




const Tab = createMaterialTopTabNavigator();


type ChangeAddressProps = {
    address: Address;
    hideDelete?: boolean,
    setIsDeletingAddress?: (isDeleting: boolean) => void;
};

function AddressCard({ address, hideDelete, setIsDeletingAddress }: ChangeAddressProps) {

    const deleteAddress = useDeleteAddress();

    const handleDelete = () => {
        Alert.alert(
            t("confirm_delete"),
            t("confirm_delete_message"),
            [
                { text: t("cancel"), style: "cancel" },
                {
                    text: t("delete"),
                    style: "destructive",
                    onPress: async () => {
                        setIsDeletingAddress?.(true);
                        await deleteAddress.mutateAsync(address.id || address._id || '', {
                            onSuccess: () => {
                                console.log("Address deleted successfully");
                            },
                            onError: (error) => {
                                console.error("Error deleting address:", error);
                            }
                        }).finally(() => {
                            setIsDeletingAddress?.(false);
                        });
                    }
                }
            ]
        );
    };

    return (
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', borderWidth: 1, borderColor: address.isDefault ? '#333' : '#efefef', marginHorizontal: 15, borderRadius: 10, marginVertical: 10, overflow: 'hidden' }}>
            <View style={{ padding: 15, backgroundColor: '#FFF' }}>

                <NIText type='light' style={{ fontSize: 15 }}>{address.name}</NIText>
                <NIText type='light' style={{ fontSize: 15 }}>+966540521583</NIText>
                <NIText type='light' style={{ fontSize: 15 }}>{address.deliveryAddress}</NIText>
                {/* <NIText type='light' style={{ fontSize: 15 }}>{address.location.displayName}</NIText> */}
            </View>
            <View style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => {
                    navigationAdapter.navigate(NAVIGATION_ROUTES.ADD_ADDRESS, {
                        address
                    })
                }}>
                    <NIText style={{ fontSize: 15, color: '#79777f' }}>تعديل</NIText>
                </TouchableOpacity>
                {!hideDelete && <TouchableOpacity onPress={handleDelete}>
                    <NIText style={{ fontSize: 15, color: '#79777f' }}>حذف</NIText>
                </TouchableOpacity>}
            </View>
            {/* <View style={{ padding: 15 }}>
                <TouchableOpacity >
                    <NIText style={{ fontSize: 15, color: '#79777f' }}>تعديل العنوان</NIText>
                </TouchableOpacity>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({

});

export default AddressCard;

