import React from "react";
import { View, Image, StyleSheet, ViewStyle } from "react-native";



type BannerImageProps = {
    image: string;
    style?: ViewStyle
};

const BannerImage: React.FC<BannerImageProps> = ({ image, style }) => {
    return (
        <View
            style={[{
                flex: 1,
                height: 300
            }, style]}
        >
            <View style={styles.banner}>
                <Image
                    style={styles.image}
                    source={{ uri: image }}
                    resizeMode="cover"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});

export default BannerImage;
