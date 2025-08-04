import React, {  useRef } from "react";
import {  Dimensions, FlatList, StyleSheet, View } from "react-native";
import { ScrollView, Text } from "react-native-gesture-handler";
import {  useSafeAreaInsets } from "react-native-safe-area-context";
import { useSharedValue } from "react-native-reanimated";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useGetCurrentUser } from "../../hooks/user.hooks";
import NIText from "../../components/NIText/NIText";
import { ActivityIndicator } from "react-native-paper";



const FavList = () => {

    const { data: currentUser, isError: currentUserError, isLoading: currentUserIsLoading, isRefetching } = useGetCurrentUser();


    const insets = useSafeAreaInsets();

    const carouselRef = useRef(null);
    const data = [...new Array(6).keys()];
    const width = Dimensions.get("window").width;
    const progress = useSharedValue<number>(0);




    
    

    if (currentUserIsLoading || isRefetching) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#3f2848" />
        </View>
    }
  


    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <PageHeader headerLabel="المفضلة" />
            <ScrollView style={{}}>
                {
                    currentUser && currentUser.favList && currentUser.favList.length > 0 ?
                        <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom: 50 }}>
                            <FlatList
                                numColumns={2}
                                keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                                data={currentUser.favList}
                                renderItem={({ item, index }) => <ProductCard isLoading={isRefetching} product={item} />}
                            />
                        </View>
                        :
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                            <NIText style={{ fontSize: 16 }}>لا توجد منتجات مفضلة بعد</NIText>
                        </View>
                }
            </ScrollView>
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


export default FavList