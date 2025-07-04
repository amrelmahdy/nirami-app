import React, { useEffect, useRef } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView, Text } from "react-native-gesture-handler";
import NavigationAdapter from '../../navigation/NavigationAdapter'
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { TextInput, Icon } from "react-native-paper";
import ProductCard from "../../components/ProductCard/ProductCard";
import NIScreen from "../../components/NIScreen/NiScreen";
import { t } from "i18next";
import brandsData from './../../stubs/brands.json'
import BrandCard from "../../components/BrandCard/BrandCard";
import NIText from "../../components/NIText/NIText";
import AsyncStorage from "@react-native-async-storage/async-storage";






function AccountScreen() {

    const handleLogOut = async () => {
        await AsyncStorage.multiRemove(
            ['access-token', 'refresh-token',
                'expires-in',
                'expires-at',
            ]);
        // NavigationAdapter.navigate(NAVIGATION_ROUTES.LOGIN);
    }


    console.log("brands", brandsData)

    const carouselRef = useRef(null);

    const progress = useSharedValue<number>(0);




    const menu = [
        {
            label: 'العربية',
            icon: "ic_ion_language_outline",
            screen_key: 'lang',
            onPress: () => { NavigationAdapter.navigate(NAVIGATION_ROUTES.CHOOSE_LANG) }

        },
        {
            label: 'الصفحة الخاصة',
            icon: "ic_ep_user",
            screen_key: 'profile',
            onPress: () => { }

        },
        {
            label: 'الطلبات',
            icon: "ic_account",
            screen_key: 'orders',
            onPress: () => { }

        },
        {
            label: 'العناوين',
            icon: "ic_ph_address_book",
            screen_key: 'addresses',
            onPress: () => { NavigationAdapter.navigate(NAVIGATION_ROUTES.ADDRESSES) }

        },
        {
            label: 'خدمة الولاء',
            icon: "ic_iconamoon_gift_light",
            screen_key: 'loyality',
            onPress: () => { }

        },
        {
            label: 'خدمة العملاء',
            icon: "ic_customer_support",
            screen_key: 'cutomer_care',
            onPress: () => { }

        },
        {
            label: 'نبذة عنا',
            icon: "ic_mdi_about_circle_outline",
            screen_key: 'about_support',
            onPress: () => { }

        },
        {
            label: 'شهادة القيمة المضافة',
            icon: "ic_tax",
            screen_key: 'VAT_cert',
            onPress: () => { }
        },
        {
            label: 'تسجيل الخروج',
            icon: "ic_lucide_book",
            screen_key: 'logout',
            onPress: handleLogOut
        }
    ]



    const renderCell = (item) => {
        return <TouchableOpacity onPress={item.onPress} style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', paddingVertical: 20, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <NIText style={{ fontSize: 15, marginRight: 15 }}>{item.label}</NIText>
                <Icon source={getIconUrl(Images, item.icon)} size={20} />
            </View>
            <View>
                <Icon source={getIconUrl(Images, 'ic_angle_left')} size={15} />
            </View>
        </TouchableOpacity>
    }




    return (
        <NIScreen title={t("الحساب")} headerProps={{ style: { marginBottom: 0 } }}>
            <View style={{ flex: 1, paddingHorizontal: 15 }}>
                <FlatList
                    // numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ width: '100%' }}
                    data={menu}
                    contentContainerStyle={{ paddingTop: 20 }}  // Add padding around the grid
                    renderItem={({ item, index }) => renderCell(item)} />
            </View>

        </NIScreen>
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


export default AccountScreen