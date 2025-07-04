import React, { useEffect, useRef, useState } from "react";
import {
    PermissionsAndroid,
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
} from "react-native";
import { Text } from "react-native-gesture-handler";
import Geolocation, { GeoPosition } from "@react-native-community/geolocation";
import MapView, {
    Marker,
    PROVIDER_GOOGLE,
    Region,
    MarkerDragEndEvent,
} from "react-native-maps";
import { t } from "i18next";
import NIScreen from "../../components/NIScreen/NiScreen";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";
import NIButton from "../../components/NIButton/NIButton";

interface Coordinates {
    latitude: number;
    longitude: number;
}

const AddAddressScreen: React.FC = () => {
    const [userCoordinates, setUserCoordinates] = useState<Coordinates>({
        latitude: 0,
        longitude: 0,
    });

    const [placeInfo, setPlaceInfo] = useState<string>("");
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        const requestLocationPermission = async () => {
            const getOneTimeLocation = () => {
                Geolocation.getCurrentPosition(
                    (position: GeoPosition) => {
                        const { latitude, longitude } = position.coords;
                        setUserCoordinates({ latitude, longitude });
                        fetchPlaceInfo(latitude, longitude);
                    },
                    (error) => {
                        console.error(error);
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 10000,
                    }
                );
            };

            if (Platform.OS === "ios") {
                getOneTimeLocation();
            } else {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: "Location Access Required",
                            message: "This App needs to Access your location",
                            buttonNeutral: "Ask Me Later",
                            buttonNegative: "Cancel",
                            buttonPositive: "OK",
                        }
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        getOneTimeLocation();
                    } else {
                        console.warn("Location permission denied");
                    }
                } catch (err) {
                    console.warn(err);
                }
            }
        };

        requestLocationPermission();
    }, []);

    const fetchPlaceInfo = async (latitude: number, longitude: number) => {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=ar`;
            const response = await axios.get(url, {
                headers: { "User-Agent": "NiramiApp/1.0" },
            });

            if (response.data && response.data.display_name) {
                setPlaceInfo(response.data.display_name);
            } else {
                setPlaceInfo("لا توجد معلومات عن هذا الموقع");
            }
        } catch (error) {
            setPlaceInfo("حدث خطأ أثناء جلب معلومات الموقع");
        }
    };

    const goToCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position: GeoPosition) => {
                const { latitude, longitude } = position.coords;

                // Update marker position
                setUserCoordinates({ latitude, longitude });

                // Center the map
                mapRef.current?.animateToRegion(
                    {
                        latitude,
                        longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    },
                    500
                );

                fetchPlaceInfo(latitude, longitude);
            },
            (error) => {
                console.error("Failed to get location:", error);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    };

    const onMarkerDragEnd = async (e: MarkerDragEndEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setUserCoordinates({ latitude, longitude });
        setPlaceInfo("جاري جلب معلومات الموقع...");
        await fetchPlaceInfo(latitude, longitude);
    };

    const mapRegion: Region = {
        latitude: userCoordinates.latitude,
        longitude: userCoordinates.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    };

    return (
        <NIScreen
            title={t("Add Address Screen")}
            headerProps={{ style: { marginBottom: 0 } }}
        >
            <View style={{ flex: 0.9 }}>
                {userCoordinates.latitude !== 0 && userCoordinates.longitude !== 0 ? (
                    <>
                        <MapView
                            ref={mapRef}
                            provider={PROVIDER_GOOGLE}
                            region={mapRegion}
                            style={styles.map}
                            showsUserLocation
                            loadingEnabled
                            showsCompass
                            zoomEnabled
                            minZoomLevel={10}
                            maxZoomLevel={15}
                        >
                            <Marker
                                coordinate={userCoordinates}
                                draggable
                                onDragEnd={onMarkerDragEnd}
                                title="Current Location"
                                pinColor="orange"
                            />
                        </MapView>

                        <TouchableOpacity
                            style={styles.currentLocationBtn}
                            onPress={goToCurrentLocation}
                            activeOpacity={0.7}
                        >
                            <Icon name="my-location" size={28} color="#333" />
                        </TouchableOpacity>
                    </>
                ) : (
                    <View style={styles.loadingView}>
                        <Text>جارٍ تحديد الموقع...</Text>
                    </View>
                )}



                {/* Uncomment if you want to display place info */}
                {/* {placeInfo && (
                <View style={{ padding: 16 }}>
                    <Text style={{ textAlign: "center", color: "#333" }}>{placeInfo}</Text>
                </View>
            )} */}
            </View>

           <View style={{ flex: 0.1, justifyContent: "center", }}>
                <NIButton type='primary' onPress={() => { }}>تحديد</NIButton>
            </View>

            {/* {placeInfo && (
        <View style={{ padding: 16 }}>
          <Text style={{ textAlign: "center", color: "#333" }}>{placeInfo}</Text>
        </View>
      )} */}
        </NIScreen>
    );
};

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "100%",
    },
    loadingView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    currentLocationBtn: {
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    },
});

export default AddAddressScreen;
