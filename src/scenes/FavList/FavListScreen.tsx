import React, { useEffect, useRef } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView, Text } from "react-native-gesture-handler";
import NavigationAdapter from '../../navigation/NavigationAdapter'
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { getIconUrl } from "../../assets/icons";
import { FONT_FAMILIES, Images } from "../../assets";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { TextInput, Icon } from "react-native-paper";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageHeader from "../../components/PageHeader/PageHeader";



const items = [
    {
        title: "1",
        image: "https://placehold.co/600x400.png"

    },
    {
        title: "1",
        image: "https://placehold.co/600x400.png"

    },
    {
        title: "1",
        image: "https://placehold.co/600x400.png"

    }
]



const products = [
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 3.5,
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 4.5,
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        price: 133,
        image: "https://placehold.co/600x600.png"

    },

    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        price: 133,
        image: "https://placehold.co/600x600.png"

    },

]

function FavList() {

    const insets = useSafeAreaInsets();

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




    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }



    return (
        // <SafeAreaView style={{ flex: 1 }}>

        <>
            {/* <SafeAreaView style={{ borderBottomWidth: 1, borderColor: '#bfbfbf', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 15  }}> */}
            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: insets.top, paddingBottom: 20,borderBottomWidth: 1, borderColor: '#bfbfbf',  paddingHorizontal: 15 }}>
                    <View></View>
                    <Text style={{ fontFamily: FONT_FAMILIES.ALMARAI_BOLD }}>المفضلة</Text>
                    <View>
                        <TouchableOpacity onPress={() => NavigationAdapter.goBack()}>
                            <Icon source={getIconUrl(Images, 'ic_weui_arrow_outlined')} size={24} />
                        </TouchableOpacity>
                    </View>
                </View> */}

            <PageHeader headerLabel="المفضلة" />
            {/* </SafeAreaView> */}
            <ScrollView style={{}}>

                <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom: 50 }}>
                    <FlatList
                        numColumns={2}  // Set two columns per row
                        keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                        data={products}
                        //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                        renderItem={({ item, index }) => <ProductCard product={item} />} />
                </View>
            </ScrollView>
        </>

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


export default FavList