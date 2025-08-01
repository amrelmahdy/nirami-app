import React, { useEffect, useRef } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView, Text } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { TextInput, Icon } from "react-native-paper";
import { t } from "i18next";
import NIScreen from "../../components/NIScreen/NiScreen";
import NIButton from "../../components/NIButton/NIButton";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import AddressCard from "../../components/AddressCard/AddressCard";
import { useGetAddresses } from "../../hooks/addresses.hooks";
import NIText from "../../components/NIText/NIText";







function AddressesScreen() {




    const { data: addresses, isError: isAddressesError, isLoading: isAddressesLoading } = useGetAddresses()






    return (
        <NIScreen title={t("addresses")} headerProps={{ style: { marginBottom: 0 } }}>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                {
                    addresses && addresses.length > 0 ?
                        <FlatList
                            //numColumns={2}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            style={{ width: '100%' }}
                            data={addresses}
                            contentContainerStyle={{}}
                            renderItem={({ item, index }) => <AddressCard address={item} />}
                        />
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                            <NIText style={{ color: '#888', fontSize: 16 }}>لا توجد عناوين بعد</NIText>
                        </View>
                }
                <View style={{ marginBottom: 20 }}>
                    <NIButton type='primary' onPress={() => navigationAdapter.navigate(NAVIGATION_ROUTES.ADD_ADDRESS)}>إضافة عنوان جديد</NIButton>
                </View>
            </View>

        </NIScreen>
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


export default AddressesScreen