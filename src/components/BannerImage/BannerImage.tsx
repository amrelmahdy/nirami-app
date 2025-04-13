import React from "react";
import { View, Image, StyleSheet } from "react-native";



type BannerImageProps = {
    image: string;
};

const BannerImage: React.FC<BannerImageProps> = ({ image }) => {
    return (
        <View
            style={{
                flex: 1,
                height: 300,
                marginVertical: 30,
                // justifyContent: "center",
            }}
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
