import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import ImageBanner from "../../../components/ImageBanner/ImageBanner";
import { getIconUrl } from "../../../assets/icons";
import { Images } from "../../../assets";



function SkinCare() {


    return (
        <View>
            <ImageBanner image={getIconUrl(Images, 'makeup_tab_bg')} />
            <Text>dd</Text>
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


export default SkinCare