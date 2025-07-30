import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Images } from './../../assets';
import { getIconUrl } from "../../assets/icons";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { refreshAccessToken } from "../../api/auth.api";

type SplashScreenProps = {
    onFinish?: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let isAuthChecked = false;
        let isTimerDone = false;
        let navigated = false;

        const getAuthTokenData = async () => {
            try {
                const keys = ['access-token', 'refresh-token', 'expires-at'];
                const result = await AsyncStorage.multiGet(keys);
                return result;
            } catch (e) {
                console.error('Error fetching multiple items from AsyncStorage', e);
                return null;
            }
        };

        const checkAuth = async () => {
            const authData = await getAuthTokenData();
            const accessToken = authData?.find(([key]) => key === 'access-token')?.[1];

            if (accessToken) {
                const refreshToken = authData?.find(([key]) => key === 'refresh-token')?.[1];
                const expiresAt = authData?.find(([key]) => key === 'expires-at')?.[1];

                if (Number(expiresAt) / 1000 < Date.now() / 1000) {
                    try {
                        const res = await refreshAccessToken(refreshToken || "");
                        const newAccessToken = res.accessToken;
                        const expiresIn = res.expiresIn;
                        const newExpiresAt = res.expiresAt;

                        await AsyncStorage.multiSet([
                            ['access-token', newAccessToken],
                            ['expires-in', expiresIn],
                            ['expires-at', newExpiresAt]
                        ]);
                    } catch (err) {
                        console.error('Error refreshing token', err);
                        // Clear tokens if refresh fails
                        await AsyncStorage.multiRemove(['access-token', 'refresh-token', 'expires-in', 'expires-at']);
                        navigate(NAVIGATION_ROUTES.CHOOSE_LANG);
                        return;
                    }
                }
                navigate(NAVIGATION_ROUTES.BOTTOM_TAB_BAR);
            } else {
                navigate(NAVIGATION_ROUTES.CHOOSE_LANG);
            }
        };

        const navigate = (route: string) => {
            if (!navigated && isAuthChecked && isTimerDone) {
                navigated = true;
                navigationAdapter.replace(route);
                if (onFinish) onFinish();
            }
        };

        // Start timer
        setTimeout(() => {
            isTimerDone = true;
            // If auth already done, navigate
            if (isAuthChecked && !navigated) {
                navigated = true;
                navigationAdapter.replace(NAVIGATION_ROUTES.CHOOSE_LANG);
                if (onFinish) onFinish();
            }
        }, 2000);

        // Start auth check
        (async () => {
            await checkAuth();
            isAuthChecked = true;
        })();

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
        backgroundColor: "#000",
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "contain",
    },
});

export default SplashScreen;
