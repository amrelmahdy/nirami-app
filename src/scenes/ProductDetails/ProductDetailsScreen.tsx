import React, { useEffect, useRef } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
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
import { TextInput, Icon, Divider, ActivityIndicator } from "react-native-paper";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Rating } from "react-native-ratings";
import NIText from "../../components/NIText/NIText";
import NIButton from "../../components/NIButton/NIButton";
import i18next from "i18next";
import { Product, useGetProduct, useGetProductVariants, useGetRelatedProducts } from "../../hooks/products.hooks";
import { useAddProductToCart } from "../../hooks/cart.hooks";
import { RouteProp } from '@react-navigation/native';
import moment from 'moment';
import ReviewCard from "../../components/ReviewCard/ReviewCard";


type ProductDetailsScreenRouteProp = RouteProp<{ ProductDetails: { product: Product } }, 'ProductDetails'>;

type ProductDetailsScreenProps = {
    route: ProductDetailsScreenRouteProp;
};

function ProductDetailsScreen({ route }: ProductDetailsScreenProps) {

    const addToCart = useAddProductToCart();

    const [selectedVariant, setSelectedVariant] = React.useState(route.params.product._id);


    const { data: relatedProducts, isLoading: isLoadingRelatedProducts, isError: isErrorRelatedProducts, refetch: refretchRelatedProducts } = useGetRelatedProducts(selectedVariant || route.params.product._id);

    const { data: product, isLoading: isProductLoading, isError: isProductError } = useGetProduct(selectedVariant || route.params.product._id);
    const { data: productVariants, isLoading: isProductVariantsLoading, isError: isProductVariantsError } = useGetProductVariants(route.params.product._id)

    const carouselRef = useRef(null);
    const data = [...new Array(6).keys()];
    const width = Dimensions.get("window").width;
    const progress = useSharedValue<number>(0);
    const scrollViewRef = useRef<ScrollView>(null);



    console.log("Route", selectedVariant)


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
        return reviews && reviews.length > 0 ? reviews.map((review) => {
            return <ReviewCard review={review} />
        }) : <></>
    }


    if (isProductLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    }


    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <View>
            <ScrollView ref={scrollViewRef} style={{ backgroundColor: '#FFF', flexGrow: 1, }}>
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
                            <TouchableOpacity onPress={() => NavigationAdapter.pop()}>
                                <Icon source={getIconUrl(Images, 'ic_close')} size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ flex: 1, marginBottom: 40 }}>
                        <Carousel
                            ref={carouselRef}
                            width={width}
                            height={300}
                            data={product.images}
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
                                            source={{ uri: item.url }}
                                            resizeMode={'cover'}
                                        />
                                    </View>
                                </View>
                            )}
                        />

                        <Pagination.Basic
                            progress={progress}
                            data={product.images}
                            dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
                            containerStyle={{ gap: 5, marginTop: 20 }}
                            onPress={onPressPagination}
                        />
                    </View>

                    <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
                        <NIText style={{ fontSize: 18, color: "#000", textAlign: 'right', fontWeight: 'bold' }}>
                            {product.brand?.name[i18next.language as 'ar' | 'en']}
                        </NIText>



                        <View>
                            <NIText style={{ fontSize: 16, marginVertical: 4, textAlign: 'right', color: '#a2a2a3', marginBottom: product?.color ? 0 : 10 }}>
                                {product?.name[i18next.language as 'ar' | 'en']}
                            </NIText>
                            {product?.color &&
                                <NIText style={{ fontSize: 15, marginVertical: 4, textAlign: 'right', color: '#a2a2a3', marginBottom: 10, fontFamily: FONT_FAMILIES.ALMARAI_EXTRA_BOLD }}>
                                    {(product?.color?.name[i18next.language as 'ar' | 'en'] || "")}
                                </NIText>
                            }
                        </View>

                        <View style={{ flexDirection: 'row-reverse' }}>
                            <Rating
                                type='custom'
                                imageSize={16}
                                //showRating
                                onFinishRating={() => { }}
                                style={{ paddingVertical: 0, direction: 'rtl', alignItems: 'flex-start', marginBottom: 20 }}
                                readonly
                                ratingColor='#000000'
                                startingValue={product?.averageRating}
                                tintColor="#FFF"
                                ratingBackgroundColor="#bebebe"
                                ratingTextColor="red"
                            />
                            <NIText style={{ fontSize: 12, marginHorizontal: 4, marginTop: 1 }}>{product?.averageRating}</NIText>
                        </View>

                        {product.isOnSale && <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                            <Text style={{ fontSize: 12, fontWeight: "bold", color: "#828282", }}>{product.price}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Almarai-Light', marginLeft: 5, color: '#828282' }}>السعر قبل الخصم</Text>
                        </View>}

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                            <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000", textAlign: 'right', }}>{product.isOnSale ? product.salesPrice : product.price}</Text>
                        </View>


                        {productVariants && productVariants.length && productVariants.length > 1 && <View style={{ direction: 'rtl', marginVertical: 20, }}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                                data={productVariants.filter(variant => variant?.color) || []}
                                //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
                                renderItem={({ item, index }) => <TouchableOpacity onPress={() => {
                                    setSelectedVariant(item.id);
                                }} style={{ borderWidth: 1, borderColor: selectedVariant === item.id ? '#3f2848' : '#bdbdbd', padding: 10, marginLeft: 10, flexDirection: 'row', borderRadius: 10 }}>
                                    {/* <NIText>{
                                        item?.color?.name[i18next.language as 'ar' | 'en']
                                    }</NIText> */}
                                    <View style={{ width: 20, height: 20, backgroundColor: item?.color?.value, borderRadius: 10, marginHorizontal: 5 }} />
                                </TouchableOpacity>} />

                            <Divider style={{ marginTop: 10 }} />

                        </View>}



                        <View style={{ marginTop: 10 }} >
                            <NIText type='bold' style={{ fontSize: 15, marginBottom: 10 }}>الوصف</NIText>
                            <NIText style={{ lineHeight: 20 }}>{product?.description[i18next.language as 'ar' | 'en']}</NIText>
                        </View>

                        <Divider style={{ marginVertical: 20 }} />

                        <View style={{ marginVertical: 0 }}>
                            <NIText type='bold' style={{ fontSize: 15, marginBottom: 10 }}>المكونات</NIText>
                            <NIText style={{ lineHeight: 20 }}>{product?.components[i18next.language as 'ar' | 'en']}</NIText>
                        </View>

                        <Divider style={{ marginVertical: 20 }} />

                        <TouchableOpacity
                            onPress={() => {
                                NavigationAdapter.navigate(NAVIGATION_ROUTES.REVIEWS, { product: product });
                            }}
                            style={{ flexDirection: 'row', direction: 'rtl', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20 }}>
                            <View style={{ flexDirection: 'row', direction: 'rtl', alignItems: 'center' }}>
                                <NIText>التقييمات</NIText>
                                <NIText style={{ marginHorizontal: 5 }}>({product.reviews.length})</NIText>
                                <Rating
                                    type='custom'
                                    imageSize={18}
                                    //showRating
                                    onFinishRating={() => { }}
                                    style={{ paddingVertical: 0, backgroundColor: 'green' }}
                                    readonly
                                    ratingColor='#000000'
                                    startingValue={product.averageRating}
                                    tintColor="#FFF"
                                    ratingBackgroundColor="#bebebe"
                                    ratingTextColor="red"
                                />
                                <NIText style={{ marginHorizontal: 5 }}>{product.averageRating}</NIText>
                            </View>
                            <Icon source={getIconUrl(Images, 'ic_weui_arrow_outlined_left_angle')} size={12} />

                        </TouchableOpacity>


                        <View>
                            {renderReview(product.reviews)}
                            <NIButton
                                onPress={() => {
                                    NavigationAdapter.navigate(NAVIGATION_ROUTES.REVIEWS, { product: product });
                                }}
                                type='outline' style={{ marginBottom: 20 }}>جميع التقييمات</NIButton>
                            <NIButton
                                onPress={() => {
                                    NavigationAdapter.navigate(NAVIGATION_ROUTES.ADD_REVIEW, { product: product });
                                }}
                                type='outline'>اضف تقييماً</NIButton>
                        </View>
                    </View>


                    <Divider style={{ marginVertical: 30 }} />



                   {relatedProducts && !isErrorRelatedProducts && !isLoadingRelatedProducts && relatedProducts.length && <View style={{ flex: 1, direction: 'rtl', marginBottom: 50 }}>
                        <NIText style={{ textAlign: 'left', fontSize: 18, fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, height: 25, marginBottom: 20, marginHorizontal: 15 }}>اكملي إطلالتك</NIText>
                        <FlatList
                            horizontal={true}
                            scrollEnabled={false}
                            keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                            data={relatedProducts}
                            //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid
                            renderItem={({ item, index }) => <ProductCard onPress={() => {
                                setSelectedVariant(item.id);
                                scrollViewRef.current?.scrollTo({ y: 0, animated: true });
                            }} product={item} />} />

                    </View>}



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
                <NIButton onPress={() => {
                    addToCart.mutate(selectedVariant || route.params.product._id, {
                        onSuccess: () => {
                            // Optionally, you can show a success message or update the UI
                            console.log('Product added to cart successfully');
                        },
                        onError: (error) => {
                            //Alert.alert("Error", error.message || "Failed to add product to cart.");
                        }
                    });
                }} type="primary" style={{ width: '100%' }}>اضف الي العربة</NIButton>
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