import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Images } from './../../assets'
import { getIconUrl } from "../../assets/icons";

type SplashScreenProps = {
    onFinish?: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {




    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            if (onFinish) onFinish();
        }, 3000); // Adjust the timeout as needed

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <View style={styles.container}>
            {isVisible && <Image source={getIconUrl(Images, 'splash_logo')} style={styles.image} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000", // Change to match your theme
    },
    image: {
        width: 100, // Adjust size as needed
        height: 100,
        resizeMode: "contain",
    },
});

export default SplashScreen;
