import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Alert } from "react-native";
import { Images } from './../../assets'
import { getIconUrl } from "../../assets/icons";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshAccessToken } from "../../api/auth.api";

type SplashScreenProps = {
    onFinish?: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {

    const [isVisible, setIsVisible] = useState(false);


    const getAuthTokenData = async () => {
        try {
            const keys = ['access-token', 'refresh-token', 'expires-at'];
            const result = await AsyncStorage.multiGet(keys);
            return result;
        } catch (e) {
            console.error('Error fetching multiple items from AsyncStorage', e);
            return null;
        }
    }

    useEffect(() => {
        const finishTimer = setTimeout(() => {
            (async () => {
                setIsVisible(true); // Only set once

                const authData = await getAuthTokenData();
                const accessToken = authData?.find(([key]) => key === 'access-token')?.[1];

                if (accessToken) {
                    const refreshToken = authData?.find(([key]) => key === 'refresh-token')?.[1];
                    const expiresAt = authData?.find(([key]) => key === 'expires-at')?.[1];

                    try {
                        if (Number(expiresAt) < Date.now()) {
                            const res = await refreshAccessToken(refreshToken || "");
                            await AsyncStorage.multiSet([
                                ['access-token', res.accessToken],
                                ['expires-in', res.expiresIn],
                                ['expires-at', res.expiresAt]
                            ]);
                        }

                        navigationAdapter.replace(NAVIGATION_ROUTES.BOTTOM_TAB_BAR);
                    } catch (err) {
                        console.error("Token refresh failed", err);
                        navigationAdapter.replace(NAVIGATION_ROUTES.AUTH);
                    }
                } else {
                    navigationAdapter.replace(NAVIGATION_ROUTES.AUTH);
                }

                if (onFinish) onFinish();
            })();
        }, 3000);

        return () => clearTimeout(finishTimer);
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

