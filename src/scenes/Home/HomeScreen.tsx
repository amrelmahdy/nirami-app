import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Button, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View, RefreshControl } from "react-native";
import { ScrollView, Text } from "react-native-gesture-handler";
import NavigationAdapter from '../../navigation/NavigationAdapter'
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { getIconUrl } from "../../assets/icons";
import { FONT_FAMILIES, Images } from "../../assets";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { TextInput, Icon, ActivityIndicator } from "react-native-paper";
import ProductCard from "../../components/ProductCard/ProductCard";
import homeCarouselData from './../../stubs/home_carousel.json'
import brandsData from './../../stubs/brands.json'
import BrandCard from "../../components/BrandCard/BrandCard";
import { useTranslation } from "react-i18next";
import { useGetMostSaledProducts, useGetProducts } from "../../hooks/products.hooks";
import { useGetBrands } from "../Brands/brands.hooks";
import NIText from "../../components/NIText/NIText";





function HomeScreen() {

    const { data: mostSaledProductsData, isError: isMostSaledProductsError, isLoading: isMostSaledLoading, refetch: refetchMostSaledProducts, isFetching: isRefetchingMostSaledProducts } = useGetMostSaledProducts();
    const { data: newProductsData, isError: isNewProductsError, isLoading: isNewProductsLoading, refetch: refetchNewProducts, isFetching: isRefetchingNeProducts } = useGetProducts({ sortBy: 'new' });
    const { data: brands, isError: isBrandsError, isLoading: isNBrandsLoading, refetch: refetchBrands, isFetching: isRefetchingBrands } = useGetBrands();

    const { t } = useTranslation();

    const [query, setQuery] = useState("");
    // const [activeSorting, setActiveSorting] = useState();

    const carouselRef = useRef<ICarouselInstance>(null);
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


    useEffect(() => {
        console.log("HomeScreen re-rendered");
    });



    const refetch = useCallback(async () => {
        await Promise.all([
            refetchNewProducts(),
            refetchMostSaledProducts(),
        ]);
    }, [refetchNewProducts, refetchMostSaledProducts]);


    const onRefresh = useCallback(() => {
        console.log('Triggered onRefresh');
        refetch();
    }, [refetch]);

    return (
        // <SafeAreaView style={{ flex: 1 }}>

        <SafeAreaView>

            <ScrollView
                style={{}}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefetchingMostSaledProducts || isRefetchingNeProducts}
                        onRefresh={onRefresh}
                    />
                }
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                    <Image source={getIconUrl(Images, 'logo_eng_ar')} /* style={styles.image} */ />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20, marginRight: 10 }}>

                    <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={(() => NavigationAdapter.navigate(NAVIGATION_ROUTES.FAV_LIST))}>
                        <Icon source={getIconUrl(Images, 'ic_mdi_light_heart')} size={30} />
                    </TouchableOpacity>

                    <TextInput
                        mode='outlined'
                        placeholder={t('what_are_you_looking_for')}
                        value={query}
                        placeholderTextColor="#bebebe"
                        // label="Password"
                        style={{ flex: 1, backgroundColor: '#f2f2f2', height: 40, textAlign: 'right' }}

                        outlineStyle={{ borderWidth: 1, borderColor: '#bebebe', borderRadius: 10, height: 40 }}
                        underlineStyle={{
                            borderRadius: 0
                        }}

                        returnKeyLabel="بحث"
                        returnKeyType="search"
                        onChangeText={(text) => setQuery(text)}
                        onEndEditing={() => { NavigationAdapter.navigate(NAVIGATION_ROUTES.PRODUCTS, { query }) }}
                        contentStyle={
                            {
                                fontFamily: FONT_FAMILIES.ALMARAI_LIGHT
                                // height: 50,

                                // borderWidth: 1,
                                // // fontSize: 17,
                                // // padding: 10,
                                // // fontFamily: 'Almarai-Regular',
                                // // textAlign: "right",
                                // borderColor: 'rgb(190, 190, 190)',
                                // borderRadius: 5
                            }
                        }
                        right={<TextInput.Icon color='#bebebe' icon="magnify" />}
                    />
                    {/* <TouchableOpacity style={{ marginHorizontal: 5 }}>
                        <Icon source={getIconUrl(Images, 'ic_icon_notifications_outline')} size={24} />
                    </TouchableOpacity> */}
                </View>

                {/* {
                    refreshing && (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
                            <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )
                } */}

                <View style={{ flex: 1, marginBottom: 40 }}>
                    <Carousel
                        ref={carouselRef}
                        width={width}
                        height={width / 2}
                        data={homeCarouselData.items}
                        onProgressChange={progress}
                        renderItem={({ item, index }) => (
                            <View
                                style={{
                                    flex: 1,
                                    // justifyContent: "center",
                                }}
                            >
                                <View style={styles.slide}>
                                    <Image
                                        style={styles.image}

                                        source={getIconUrl(Images, item.imageName)}
                                        resizeMode={'cover'}
                                    />
                                </View>
                            </View>
                        )}
                    />

                    <View style={{ direction: 'rtl' }}>
                        <Pagination.Basic
                            progress={progress}
                            data={homeCarouselData.items}
                            dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                            containerStyle={{ gap: 5, marginTop: 20 }}
                            onPress={onPressPagination}
                        />
                    </View>
                </View>



                {
                    mostSaledProductsData && mostSaledProductsData.length &&

                    <View style={{}}>
                        <NIText style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20, paddingHorizontal: 15 }}>الاكثر مبيعاً</NIText>

                        <View style={{ direction: 'rtl' }}>
                            <FlatList
                                // numColumns={2}  // Set two columns per row
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                                data={mostSaledProductsData}
                                //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                                renderItem={({ item, index }) => <ProductCard isLoading={isRefetchingMostSaledProducts} product={item} />} />
                        </View>

                    </View>
                }






                <View
                    style={{
                        flex: 1,
                        height: 300,
                        marginVertical: 30
                        // justifyContent: "center",
                    }}
                >
                    <View style={styles.slide}>
                        <Image
                            style={styles.image}
                            source={getIconUrl(Images, "home_banner_4")}

                            resizeMode={'cover'}
                        />
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <NIText style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20, paddingHorizontal: 15 }}>إكتشف الماركات</NIText>
                    <View style={{ direction: 'rtl' }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                            data={brands}
                            //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                            renderItem={({ item, index }) => <BrandCard brand={item} />} />
                    </View>
                </View>





                {newProductsData && newProductsData.products && newProductsData.products.length && !isNewProductsLoading &&
                    <View style={{ flex: 1 }}>
                        <NIText style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20, paddingHorizontal: 15 }}>المنتجات الجديدة</NIText>
                        <View style={{ direction: 'rtl' }}>
                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                                data={newProductsData.products}
                                //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                                renderItem={({ item, index }) => <ProductCard isLoading={isRefetchingNeProducts} product={item} />} />
                        </View>
                    </View>
                }


                <View
                    style={{
                        flex: 1,
                        height: 300,
                        marginVertical: 30
                        // justifyContent: "center",
                    }}
                >
                    <View style={styles.slide}>
                        <Image
                            style={styles.image}
                            source={getIconUrl(Images, "home_banner_5")}
                            resizeMode={'cover'}
                        />
                    </View>
                </View>




                {/* {
                    mostSaledProductsData && mostSaledProductsData.length &&

                    <View style={{ flex: 1, paddingHorizontal: 0 }}>
                        <Text style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20, marginHorizontal: 15, height: 30 }}>أفضل منتجات منتجات المكياج</Text>
                        <FlatList
                            // numColumns={2}  // Set two columns per row
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                            data={mostSaledProductsData}
                            contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                            renderItem={({ item, index }) => <ProductCard product={item} />} />
                    </View>
                } */}


            </ScrollView>

        </SafeAreaView>




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


export default React.memo(HomeScreen);
