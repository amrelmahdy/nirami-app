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
        reviews: [
            {
                value: 5,
                ownerName: "Amr",
                review: "اعجبني جدااااا"
            },
            {
                value: 4.5,
                ownerName: "Ghaidaa",
                review: "خطير اوي"
            },
            {
                value: 1.5,
                ownerName: "Sultan",
                review: "لا معجبنيش خالص"
            }
        ],
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 4.5,
        reviews: [
            {
                value: 5,
                ownerName: "Amr",
                review: "اعجبني جدااااا"
            },
            {
                value: 4.5,
                ownerName: "Ghaidaa",
                review: "خطير اوي"
            },
            {
                value: 1.5,
                ownerName: "Sultan",
                review: "لا معجبنيش خالص"
            }
        ],
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        reviews: [
            {
                value: 5,
                ownerName: "Amr",
                review: "اعجبني جدااااا"
            },
            {
                value: 4.5,
                ownerName: "Ghaidaa",
                review: "خطير اوي"
            },
            {
                value: 1.5,
                ownerName: "Sultan",
                review: "لا معجبنيش خالص"
            }
        ],
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        reviews: [
            {
                value: 5,
                ownerName: "Amr",
                review: "اعجبني جدااااا"
            },
            {
                value: 4.5,
                ownerName: "Ghaidaa",
                review: "خطير اوي"
            },
            {
                value: 1.5,
                ownerName: "Sultan",
                review: "لا معجبنيش خالص"
            }
        ],
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
]

function HomeScreen() {

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

        <ScrollView style={{}}>
            <SafeAreaView>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                    <Image source={getIconUrl(Images, 'logo_eng_ar')} /* style={styles.image} */ />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>

                    <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={(() => NavigationAdapter.navigate(NAVIGATION_ROUTES.FAV_LIST))}>
                        <Icon source={getIconUrl(Images, 'ic_mdi_light_heart')} size={24} />
                    </TouchableOpacity>

                    <TextInput
                        mode='outlined'
                        placeholder="البحث ..."
                        placeholderTextColor="#bebebe"
                        // label="Password"
                        style={{ flex: 1, backgroundColor: '#f2f2f2', height: 40, textAlign: 'right' }}

                        outlineStyle={{ borderWidth: 1, borderColor: '#bebebe', borderRadius: 10, height: 40 }}
                        underlineStyle={{
                            borderRadius: 0
                        }}
                        contentStyle={
                            {
                                // height: 50,
                                // margin: 12,
                                // borderWidth: 1,
                                // // fontSize: 17,
                                // // padding: 10,
                                // // fontFamily: 'Almarai-Regular',
                                // // textAlign: "right",
                                // borderColor: 'rgb(190, 190, 190)',
                                // borderRadius: 5
                            }
                        }
                        right={<TextInput.Icon color='#bebebe' icon={getIconUrl(Images, 'ic_mynaui_search')} />}
                    />
                    <TouchableOpacity style={{ marginHorizontal: 5 }}>
                        <Icon source={getIconUrl(Images, 'ic_icon_notifications_outline')} size={24} />
                    </TouchableOpacity>
                </View>


                <View style={{ flex: 1, marginBottom: 40 }}>
                    <Carousel
                        ref={carouselRef}
                        width={width}
                        height={width / 2}
                        data={items}
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
                                        source={{ uri: item.image }}
                                        resizeMode={'cover'}
                                    />
                                </View>
                            </View>
                        )}
                    />

                    <Pagination.Basic
                        progress={progress}
                        data={items}
                        dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                        containerStyle={{ gap: 5, marginTop: 20 }}
                        onPress={onPressPagination}
                    />
                </View>





                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <Text style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20 }}>الاكثر مبيعاً</Text>
                    <FlatList
                        // numColumns={2}  // Set two columns per row
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                        data={products}
                        //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                        renderItem={({ item, index }) => <ProductCard product={item} />} />
                </View>



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
                            source={{ uri: "https://placehold.co/600x600.png" }}
                            resizeMode={'cover'}
                        />
                    </View>
                </View>

                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <Text style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20 }}>وصل حديثاً</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                        data={products}
                        //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                        renderItem={({ item, index }) => <ProductCard product={item} />} />
                </View>


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
                            source={{ uri: "https://placehold.co/600x600.png" }}
                            resizeMode={'cover'}
                        />
                    </View>
                </View>


                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <Text style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20 }}>المنتجات الجديدة</Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                        data={products}
                        //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                        renderItem={({ item, index }) => <ProductCard product={item} />} />
                </View>
            </SafeAreaView>
        </ScrollView>



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


export default HomeScreen