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
import { TextInput, Icon, Divider } from "react-native-paper";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Rating } from "react-native-ratings";
import NIText from "../../components/NIText/NIText";
import NIButton from "../../components/NIButton/NIButton";



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
        image: "https://placehold.co/900x900.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 4.5,
        price: 133,
        image: "https://placehold.co/900x900.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        price: 133,
        image: "https://placehold.co/900x900.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        price: 133,
        image: "https://placehold.co/900x900.png"

    },
]

function ProductDetailsScreen({ route }) {

    const carouselRef = useRef(null);
    const data = [...new Array(6).keys()];
    const width = Dimensions.get("window").width;
    const progress = useSharedValue<number>(0);

    const product = route.params.product


    console.log("Route", product)


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



    const renderReview = (reviews) => {
        return reviews && reviews.length > 0 ? reviews.map((review, index) => {
            return <View style={{ borderWidth: 1, borderColor: '#efefef', paddingVertical: 10, paddingHorizontal: 15, marginVertical: 20, borderRadius: 10 }}>
                <View style={{ flexDirection: 'row', direction: 'rtl', alignItems: 'center', marginBottom: 5 }}>
                    <Text>{review.ownerName}</Text>
                    <Rating
                        type='custom'
                        imageSize={18}
                        //showRating
                        onFinishRating={() => { }}
                        style={{ paddingHorizontal: 5, backgroundColor: '#FFF' }}
                        readonly
                        ratingColor='#000000'
                        startingValue={product.ratings}
                        tintColor="#FFF"
                        ratingBackgroundColor="#bebebe"
                        ratingTextColor="red"
                    />
                    <Text>4.5</Text>
                </View>
                <View>
                    <NIText>{review.review}</NIText>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon source={getIconUrl(Images, 'ic_ei_like')} size={24} />
                        <NIText style={{ color: "#797780" }}>مفيد</NIText>
                    </View>

                    <NIText style={{ color: "#797780", }}>09/3/2025</NIText>
                </View>
            </View>
        }) : <></>
    }



    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <View>
            <ScrollView style={{ backgroundColor: '#FFF', flexGrow: 1, }}>
                <SafeAreaView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, marginVertical: 20 }}>

                        <View style={{ flexDirection: 'row', }}>
                            <TouchableOpacity>
                                <Icon source={getIconUrl(Images, 'ic_mdi_light_heart')} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginLeft: 10 }}>
                                <Icon source={getIconUrl(Images, 'ic_lsicon_share_outline')} size={30} />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <TouchableOpacity>
                                <Icon source={getIconUrl(Images, 'ic_close')} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginBottom: 40 }}>
                        <Carousel
                            ref={carouselRef}
                            width={width}
                            height={300}
                            data={products}
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

                    <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 18, color: "#000", textAlign: 'right', fontWeight: 'bold' }}>{product.category}</Text>
                        <Text style={{ fontSize: 16, marginVertical: 4, textAlign: 'right', fontFamily: 'Almarai-Light', color: '#a2a2a3', marginBottom: 10 }}>{product.name}</Text>
                        <View style={{ flexDirection: 'row-reverse' }}>
                            <Rating
                                type='custom'
                                imageSize={16}
                                //showRating
                                onFinishRating={() => { }}
                                style={{ paddingVertical: 0, direction: 'rtl', alignItems: 'flex-start', marginBottom: 20 }}
                                readonly
                                ratingColor='#000000'
                                startingValue={product.ratings}
                                tintColor="#FFF"
                                ratingBackgroundColor="#bebebe"
                                ratingTextColor="red"
                            />
                            <NIText style={{ fontSize: 12, marginHorizontal: 4, marginTop: 1 }}>4.5</NIText>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#828282", }}>150</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Almarai-Light', marginLeft: 5, color: '#828282' }}>السعر قبل الخصم</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                            <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000", textAlign: 'right', }}>{product.price}</Text>
                        </View>


                        <View style={{ direction: 'rtl', marginVertical: 20, }}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                                data={[
                                    {
                                        id: 1,
                                        name: 'زهري',
                                        color: 'rgb(159,98,105)'
                                    },
                                    {
                                        id: 1,
                                        name: 'زهري',
                                        color: 'rgb(165,46,86)'
                                    },
                                    {
                                        id: 1,
                                        name: 'زهري',
                                        color: 'rgb(189,126,130)'
                                    },
                                    {
                                        id: 1,
                                        name: 'زهري',
                                        color: 'rgb(114,45,50)'
                                    }
                                ]}
                                renderItem={({ item, index }) => <TouchableOpacity style={{ borderWidth: 1, borderColor: '#bdbdbd', padding: 10, marginLeft: 10, flexDirection: 'row', borderRadius: 10 }}>
                                    <NIText>{item.name}</NIText>
                                    <View style={{ width: 20, height: 20, backgroundColor: item.color, borderRadius: 10, marginHorizontal: 5 }} />
                                </TouchableOpacity>} />
                        </View>

                        <Divider style={{ marginVertical: 10 }} />


                        <View>
                            <NIText type='bold' style={{ fontSize: 15, marginBottom: 10 }}>الوصف</NIText>
                            <NIText style={{ lineHeight: 20 }}>أحمر شفاه سوبر ستاي فينيل إنك يدوم طويلاً ومقاوم للنقل، 35 تشيكي</NIText>
                        </View>

                        <Divider style={{ marginVertical: 20 }} />

                        <TouchableOpacity style={{ flexDirection: 'row', direction: 'rtl', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
                            <View style={{ flexDirection: 'row', direction: 'rtl', alignItems: 'center' }}>
                                <NIText>التقييمات</NIText>
                                <NIText style={{ marginHorizontal: 5 }}>(15)</NIText>
                                <Rating
                                    type='custom'
                                    imageSize={18}
                                    //showRating
                                    onFinishRating={() => { }}
                                    style={{ paddingVertical: 0, backgroundColor: 'green' }}
                                    readonly
                                    ratingColor='#000000'
                                    startingValue={product.ratings}
                                    tintColor="#FFF"
                                    ratingBackgroundColor="#bebebe"
                                    ratingTextColor="red"
                                />
                                <NIText style={{ marginHorizontal: 5 }}>4.5</NIText>
                            </View>
                            <Icon source={getIconUrl(Images, 'ic_weui_arrow_outlined_left_angle')} size={12} />

                        </TouchableOpacity>


                        <View>
                            {renderReview(product.reviews)}
                            <NIButton type='outline' style={{ marginBottom: 20 }}>جميع التقييمات</NIButton>
                            <NIButton type='outline'>اضف تقييماً</NIButton>

                        </View>





                    </View>


                    <Divider style={{ marginVertical: 30 }} />



                    {/* 
                <View style={{ flex: 1, paddingHorizontal: 15, marginBottom: 50 }}>
                    <Text style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20 }}>الاكثر مبيعاً</Text>
                    <FlatList
                        numColumns={2}  // Set two columns per row
                        keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                        data={products}
                        //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                        renderItem={({ item, index }) => <ProductCard product={item} />} />
                </View>

                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <Text style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20 }}>وصل حديثاً</Text>
                    <FlatList
                        numColumns={2}  // Set two columns per row
                        keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                        data={products}
                        //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                        renderItem={({ item, index }) => <ProductCard product={item} />} />
                </View> */}
                </SafeAreaView>
            </ScrollView>

            <View style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "FFF", // Ensures the button is visible
                paddingVertical: 5,
                paddingHorizontal: 10,
                // borderTopWidth: 1,
                // borderColor: "#ddd",
                alignItems: "center",
            }}>
                <NIButton type="primary" style={{ width: '100%' }}>اضف الي العربة</NIButton>
            </View>

        </View>

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


export default ProductDetailsScreen