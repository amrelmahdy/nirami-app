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







function AddressesScreen() {

    //const { data: brandsList, isError: isBrandsError, isLoading: isBrandsLoading } = useGetBrands()




    return (
        <NIScreen title={t("Addresses Screen")} headerProps={{ style: { marginBottom: 0 } }}>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                {/* <FlatList
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                    data={brandsList}
                    contentContainerStyle={{ paddingTop: 20 }}  // Add padding around the grid

                    renderItem={({ item, index }) => <BrandCard brand={item} />} /> */}

                <NIButton type='primary' onPress={() => navigationAdapter.navigate(NAVIGATION_ROUTES.ADD_ADDRESS)}>إضافة عنوان جديد</NIButton>

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