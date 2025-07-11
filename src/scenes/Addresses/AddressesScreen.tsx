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







function AddressesScreen() {




    const { data: addresses, isError: isAddressesError, isLoading: isAddressesLoading } = useGetAddresses()






    return (
        <NIScreen title={t("العناوين")} headerProps={{ style: { marginBottom: 0 } }}>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>

                {/* <AddressCard /> */}
                <FlatList
                    //numColumns={2} // Display 2 items per row
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ width: '100%' }}
                    data={addresses}
                    contentContainerStyle={{}}  // Add padding around the grid
                    renderItem={({ item, index }) => <AddressCard address={item} />} />

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