import React, { useEffect, useRef, useState } from "react";
import {
    PermissionsAndroid,
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { Text } from "react-native-gesture-handler";
import Geolocation, { GeoPosition } from "@react-native-community/geolocation";
import { GooglePlacesAutocomplete, GooglePlacesAutocompleteProps } from 'react-native-google-places-autocomplete';

import MapView, {
    Marker,
    PROVIDER_GOOGLE,
    Region,
    MarkerDragEndEvent,
} from "react-native-maps";
import { t } from "i18next";
import NIScreen from "../../components/NIScreen/NiScreen";
import axios from "axios";
import VectotIcon from "react-native-vector-icons/MaterialIcons";
import NIButton from "../../components/NIButton/NIButton";
import { getIconUrl } from "../../assets/icons";
import { FONT_FAMILIES, Images } from "../../assets";
import { ActivityIndicator, Checkbox, Divider, Icon, TextInput } from 'react-native-paper';
import SearchInput from "../../components/SearchInput/SearchInput";
import { getPlaceInfo, getSuggestions } from "../../api/maps";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import NIText from "../../components/NIText/NIText";
import { Address, useAddAddress, useUpdateAddress } from "../../hooks/addresses.hooks";
import navigationAdapter from "../../navigation/NavigationAdapter";
import { getCurrentUser } from "../../api/auth.api";



interface Coordinates {
    latitude: number;
    longitude: number;
}

type PlaceSuggestion = {
    display_name: string;
    lat: string;
    lon: string;
};




const AddAddressScreen: React.FC = ({ route }) => {

    const addressToEdit = route.params?.address;

    const addAddress = useAddAddress();
    const updateAddress = useUpdateAddress();

    // Remove useGetCurrentUser
    // const { data: currentUser, isError: currentUserError, isLoading: currentUserIsLoading } = useGetCurrentUser();

    const [currentUserIsLoading, setCurrentUserIsLoading] = useState(true);


    const setLocationBottomSheetRef = useRef<BottomSheetModal>(null);


    const [address, setAddress] = useState<Address>({
        name: addressToEdit ? addressToEdit.name : "",
        phone: addressToEdit ? addressToEdit.phone : "",
        deliveryAddress: addressToEdit ? addressToEdit.deliveryAddress : "",
        location: {
            lat: addressToEdit ? addressToEdit.location.lat : 0,
            lng: addressToEdit ? addressToEdit.location.lng : 0,
            displayName: addressToEdit ? addressToEdit.location.displayName : "",
        },
        isDefault: addressToEdit ? addressToEdit.isDefault : false,
    });

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const mapRef = useRef<MapView>(null);


    const fetchCurrentUser = async () => {
        setCurrentUserIsLoading(true);
        //setCurrentUserError(false);
        try {
            const res = await getCurrentUser();
            if (!res) throw new Error('Failed to fetch user');

            setAddress(prev => ({
                ...prev,
                name: res.firstName,
                phone: res.phone,
            }));
        } catch (err) {
            //setCurrentUserError(true);
        } finally {
            setCurrentUserIsLoading(false);
        }
    };

    const requestLocationPermission = async () => {
        const getOneTimeLocation = () => {

            if (addressToEdit && addressToEdit.location && addressToEdit.location.lat && addressToEdit.location.lng) {
                mapRef.current?.animateToRegion(
                    {
                        latitude: addressToEdit.location.lat,
                        longitude: addressToEdit.location.lng,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    },
                    500
                );
                return;

            } else {
                Geolocation.getCurrentPosition(
                    (position: GeoPosition) => {
                        const { latitude, longitude } = position.coords;
                        //setUserCoordinates({ latitude, longitude });
                        setAddress(prev => ({
                            ...prev,
                            location: {
                                ...prev.location,
                                lat: latitude,
                                lng: longitude,
                                displayName: "",
                            },
                        }));
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
            }
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


    useEffect(() => {


        !addressToEdit && fetchCurrentUser();



        requestLocationPermission();




        // Set initial address state

    }, []);

    const fetchPlaceInfo = async (latitude: number, longitude: number) => {
        try {
            const response = await getPlaceInfo(latitude, longitude);

            if (response && response.display_name) {
                setAddress(prev => ({
                    ...prev,
                    location: {
                        ...prev.location,
                        lat: latitude,
                        lng: longitude,
                        displayName: response.display_name,
                    },
                }));

                //setPlaceInfo(response);
                // setPlaceInfo(response.display_name);
            } else {
                //setPlaceInfo("لا توجد معلومات عن هذا الموقع");
            }
        } catch (error) {
            //setPlaceInfo("حدث خطأ أثناء جلب معلومات الموقع");
        }
    };

    // Fetch suggestions from Nominatim
    const fetchSuggestions = async (query: string) => {
        if (!query) {
            setSuggestions([]);
            return;
        }
        try {
            const response = await getSuggestions(query);
            if (!response || !Array.isArray(response)) {
                setSuggestions([]);
                return;
            }
            setSuggestions(response || []);
        } catch (error) {
            setSuggestions([]);
        }
    };

    // Debounce search input
    useEffect(() => {
        if (!searchQuery || showSuggestions) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        const timeout = setTimeout(() => {
            fetchSuggestions(searchQuery);
            setShowSuggestions(true);
        }, 400);
        return () => clearTimeout(timeout);
    }, [searchQuery]);

    const goToCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position: GeoPosition) => {
                const { latitude, longitude } = position.coords;

                // Update marker position
                //setUserCoordinates({ latitude, longitude });
                setAddress(prev => ({
                    ...prev,
                    location: {
                        lat: latitude,
                        lng: longitude,
                        displayName: "",
                    },
                }));


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
        //setUserCoordinates({ latitude, longitude });
        setAddress(prev => ({
            ...prev,
            location: {
                lat: latitude,
                lng: longitude,
                displayName: "",
            },
        }));

        //setPlaceInfo("جاري جلب معلومات الموقع...");
        await fetchPlaceInfo(latitude, longitude);
    };

    const mapRegion: Region = {
        latitude: address.location?.lat,
        longitude: address.location?.lng,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    };


    const handleAddressIsDisabled = (address: Address) => {
        return (
            address.name === "" ||
            address.phone === "" ||
            address.deliveryAddress === "" ||
            address.location?.lat === 0 ||
            address.location?.lng === 0
        );
    }


    const handleOnSubmit = () => {
        if (handleAddressIsDisabled(address)) {
            console.warn("Please fill all fields before submitting.");
            return;
        }


        if (!addressToEdit) {



            addAddress.mutate({
                name: address.name,
                phone: address.phone,
                deliveryAddress: address.deliveryAddress,
                location: {
                    lat: address.location?.lat,
                    lng: address.location?.lng,
                    displayName: address.location?.displayName,
                },
                isDefault: address.isDefault,
            },
                {
                    onSuccess: (data) => {

                        setAddress({
                            name: "",
                            phone: "",
                            deliveryAddress: "",
                            location: {
                                lat: 0,
                                lng: 0,
                                displayName: "",
                            },
                            isDefault: false,
                        })
                        setLocationBottomSheetRef?.current?.close();
                        navigationAdapter.pop();
                    },
                    onError: (error) => {
                        console.error("Error adding address:", error);
                    },
                }
            );
        } else {

            updateAddress.mutate({
                id: addressToEdit.id, address: {
                    name: address.name,
                    phone: address.phone,
                    deliveryAddress: address.deliveryAddress,
                    location: {
                        lat: address.location?.lat,
                        lng: address.location?.lng,
                        displayName: address.location?.displayName,
                    },
                    isDefault: address.isDefault,
                }
            }, {
                onSuccess: (data) => {
                    setAddress({
                        name: "",
                        phone: "",
                        deliveryAddress: "",
                        location: {
                            lat: 0,
                            lng: 0,
                            displayName: "",
                        },
                        isDefault: false,
                    })
                    setLocationBottomSheetRef?.current?.close();
                    navigationAdapter.pop();
                },
                onError: (error) => {
                    console.error("Error updating address:", error);
                }
            })
        }
    };


    return (
        <NIScreen
            title={addressToEdit ? 'تعديل العنوان' : t("اضف عنوان جديد")}
            headerProps={{ style: { marginBottom: 0 }, withBorder: false }}
        >
            {
                !addressToEdit && currentUserIsLoading || address.location?.lat == 0 || address.location?.lng == 0 ?
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                    :
                    <>

                        <View style={styles.searchContainer}>
                            <View style={{ paddingHorizontal: 15, marginBottom: 20 }}>
                                <SearchInput
                                    placeholder="ابحث عن مكان..."
                                    value={searchQuery}
                                    handleQueryChange={setSearchQuery}
                                    onFocus={() => setShowSuggestions(true)}
                                    returnKeyLabel={t('what_are_you_looking_for')}
                                    returnKeyType="search"
                                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                                />
                            </View>

                            {showSuggestions && suggestions.length > 0 && (
                                <View style={styles.suggestionsContainer}>
                                    <FlatList
                                        data={suggestions}
                                        keyExtractor={(_, idx) => idx.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                style={styles.suggestionItem}
                                                onPress={() => {
                                                    const lat = parseFloat(item.lat);
                                                    const lng = parseFloat(item.lon);
                                                    setAddress(prev => ({
                                                        ...prev,
                                                        location: {
                                                            ...prev.location,
                                                            lat,
                                                            lng,
                                                            displayName: "",
                                                        },
                                                    }));
                                                    //setSearchQuery(item.display_name);
                                                    setShowSuggestions(false);
                                                    setSuggestions([]);
                                                    mapRef.current?.animateToRegion(
                                                        {
                                                            latitude: lat,
                                                            longitude: lng,
                                                            latitudeDelta: 0.015,
                                                            longitudeDelta: 0.0121,
                                                        },
                                                        500
                                                    );
                                                    //setPlaceInfo("جاري جلب معلومات الموقع...");
                                                    fetchPlaceInfo(lat, lng);
                                                }}
                                            >
                                                <Text style={styles.suggestionText}>{item.display_name}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            )}
                        </View>
                        <View style={{ flex: 0.85 }}>
                            {address.location?.lat !== 0 && address.location?.lng !== 0 ? (
                                <>
                                    <MapView
                                        ref={mapRef}
                                        provider={PROVIDER_GOOGLE}
                                        region={{
                                            latitude: address.location?.lat,
                                            longitude: address.location?.lng,
                                            latitudeDelta: 0.015,
                                            longitudeDelta: 0.0121,
                                        }}
                                        style={styles.map}
                                        showsUserLocation
                                        loadingEnabled
                                        showsCompass
                                        zoomEnabled
                                        zoomTapEnabled
                                        zoomControlEnabled

                                    >
                                        <Marker
                                            coordinate={{
                                                latitude: address.location?.lat,
                                                longitude: address.location?.lng,
                                            }}
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
                                        <VectotIcon name="my-location" size={28} color="#333" />
                                    </TouchableOpacity>

                                    <BottomSheet
                                        withHeader={false}
                                        onReset={() => { }}
                                        onClose={() => setLocationBottomSheetRef?.current?.close()}
                                        bottomSheetModalRef={setLocationBottomSheetRef}>



                                        <View style={{ marginHorizontal: 20, paddingVertical: 15 }}>
                                            <View style={{ flexDirection: 'row-reverse', flex: 1, marginBottom: 30 }}>
                                                <Icon
                                                    source={getIconUrl(Images, 'ic_map_pin')}
                                                    size={20}
                                                //style={{ alignSelf: "center", marginBottom: 10 }}
                                                />
                                                <NIText>{address ? address.location.displayName : ""}</NIText>

                                            </View>


                                            <View style={{}}>

                                                <View style={{ marginBottom: 5 }}>
                                                    <TextInput
                                                        placeholder="الإسم"
                                                        style={{ backgroundColor: '#FFF', height: 40, textAlign: 'right' }}
                                                        contentStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}
                                                        value={address.name}
                                                        onChange={(text) =>
                                                            setAddress({
                                                                ...address,
                                                                name: text.nativeEvent.text
                                                            })
                                                        }
                                                    />
                                                </View>



                                                <View style={{ marginBottom: 5 }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ flex: 0.2 }}>
                                                            <Icon
                                                                source={getIconUrl(Images, 'ic_saudi_ar_flag')}
                                                                size={50}

                                                            />
                                                        </View>
                                                        <View style={{ flex: 0.8 }}>
                                                            <TextInput

                                                                placeholder="رقم الهاتف"
                                                                style={{ backgroundColor: '#FFF', height: 40, textAlign: 'right' }}
                                                                contentStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}
                                                                value={address.phone}
                                                                onChange={(text) =>
                                                                    setAddress({
                                                                        ...address,
                                                                        phone: text.nativeEvent.text
                                                                    })
                                                                }
                                                            />
                                                        </View>

                                                    </View>

                                                </View>

                                                <View style={{ marginBottom: 5 }}>
                                                    <TextInput
                                                        onChange={(text) =>
                                                            setAddress({
                                                                ...address,
                                                                deliveryAddress: text.nativeEvent.text
                                                            })
                                                        }
                                                        placeholder="التوصيل : معلم مشهور اسم الشارع"
                                                        style={{ backgroundColor: '#FFF', height: 40, textAlign: 'right' }}
                                                        contentStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}
                                                        value={address.deliveryAddress}
                                                    />
                                                </View>

                                                <View style={{ marginVertical: 10 }}>
                                                    <Checkbox.Item
                                                        status={address?.isDefault ? 'checked' : 'unchecked'}
                                                        // key={index}
                                                        label="استخدم كعنوان افتراضي"
                                                        labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_LIGHT, textAlign: 'right' }}
                                                        color='#000'
                                                        uncheckedColor='#000'
                                                        mode='android'
                                                        rippleColor="transparent"
                                                        onPress={() => {
                                                            setAddress(prev => ({
                                                                ...prev,
                                                                isDefault: !address.isDefault
                                                            }))
                                                        }}
                                                        style={{ marginVertical: 0, paddingVertical: 0, paddingHorizontal: 0 }}
                                                        theme={{ colors: { primary: '#000' } }}

                                                    />
                                                </View>

                                                <NIButton type={handleAddressIsDisabled(address) ? 'disabled' : 'primary'} disabled={handleAddressIsDisabled(address)} style={{ marginTop: 10 }} onPress={handleOnSubmit}>
                                                    حفظ
                                                </NIButton>

                                            </View>
                                        </View>

                                    </BottomSheet>

                                </>
                            ) : (
                                <View style={styles.loadingView}>
                                    <Text>جارٍ تحديد الموقع...</Text>
                                </View>
                            )}
                        </View>
                        <View style={{ flex: 0.1, justifyContent: "center", marginHorizontal: 15 }}>
                            <NIButton type='primary' onPress={() => {
                                setLocationBottomSheetRef?.current?.present()
                            }}>تحديد</NIButton>
                        </View>
                    </>
            }
        </NIScreen >
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flex: 0.05,
        zIndex: 10,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingTop: 10,
        justifyContent: "center",
        marginBottom: 20,
    },
    searchInput: {
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        fontSize: 15,
    },
    suggestionsContainer: {
        position: "absolute",
        top: 50,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 0,
        maxHeight: 180,
        zIndex: 100,
        elevation: 10,
        marginHorizontal: 25
    },
    suggestionItem: {
        padding: 10,
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    suggestionText: {
        fontSize: 15,
        color: "#333",
    },
    map: {
        width: "100%",
        height: "100%",
    },
    loadingView: {
        flex: 1
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
