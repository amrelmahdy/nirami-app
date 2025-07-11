import React, { useEffect, useRef } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView, Text } from "react-native-gesture-handler";
import NavigationAdapter from '../../navigation/NavigationAdapter'
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { TextInput, Icon } from "react-native-paper";
import ProductCard from "../../components/ProductCard/ProductCard";
import NIScreen from "../../components/NIScreen/NiScreen";
import { t } from "i18next";
import brandsData from './../../stubs/brands.json'
import BrandCard from "../../components/BrandCard/BrandCard";
import { useGetBrands } from "./brands.hooks";






function BrandsScreen() {

    const { data: brandsList, isError: isBrandsError, isLoading: isBrandsLoading, refetch } = useGetBrands()



    console.log("brands", brandsList)

    const carouselRef = useRef(null);
    const data = [...new Array(6).keys()];
    const width = Dimensions.get("window").width;
    const progress = useSharedValue<number>(0);


    const onPressPagination = (index: number) => {
        carouselRef.current?.scrollTo({
            /**
             * Calculate the difference between the current index and the target index
             * to ensure that the carousel scrolls to the nearest index
             */
            count: index - progress.value,
            animated: true,
        });
    };




    return (
        <NIScreen title={t("brands")} headerProps={{ style: { marginBottom: 0 } }}>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                <FlatList
                    onRefresh={refetch}
                    refreshing={isBrandsLoading}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                    data={brandsList}
                    contentContainerStyle={{ paddingTop: 20 }}  // Add padding around the grid

                    renderItem={({ item, index }) => <BrandCard brand={item} />} />
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


export default BrandsScreen