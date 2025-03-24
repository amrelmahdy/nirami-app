import React, { useEffect, useRef } from "react";
import { Button, Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import NavigationAdapterImpl from '../../navigation/NavigationAdapter'
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { TextInput } from "react-native-paper";

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

    useEffect(() => {
        console.log("Current Screen Name: ", NavigationAdapterImpl.getCurrentScreenName())

    })

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.slide}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
        );
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
                <Image source={getIconUrl(Images, 'logo_eng_ar')} /* style={styles.image} */ />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20 }}>
                <Image source={getIconUrl(Images, 'ic_mdi_light_heart')} style={{ marginHorizontal: 10 }} />
                <TextInput
                    mode='outlined'
                    // label="Password"
                    style={{ flex: 1, backgroundColor: '#f2f2f2', height: 40 }}

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
                    right={<TextInput.Icon icon={getIconUrl(Images, 'ic_mdi_light_heart')} />}
                />
                <Image source={getIconUrl(Images, 'ic_icon_notifications_outline')} style={{ marginHorizontal: 10 }} /* style={styles.image} */ />
            </View>


            <View style={{ flex: 1 }}>
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


            <View>
                <Text>....</Text>
            </View>



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


export default HomeScreen