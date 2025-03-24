import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import { Images } from './../../assets'
import { getIconUrl } from "../../assets/icons";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";

type SplashScreenProps = {
    onFinish?: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
            if (onFinish) onFinish();
        }, 1000); // Adjust the timeout as needed

        // Call onFinish() after 1 more second
        const finishTimer = setTimeout(() => {
            navigationAdapter.replace(NAVIGATION_ROUTES.CHOOSE_LANG)
            if (onFinish) onFinish();
        }, 3000);

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
