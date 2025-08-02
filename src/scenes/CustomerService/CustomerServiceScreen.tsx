import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { FONT_FAMILIES, Images } from '../../assets';
import HomeScreen from '../Home/HomeScreen';
import PageHeader from '../../components/PageHeader/PageHeader';
import SearchInput from '../../components/SearchInput/SearchInput';

import FilterBar from '../../components/FilterBar/FilterBar';
import FilterGroupBar from '../../components/FilterGroupBar/FilterGroupBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterByBar from '../../components/FilterByBar/FilterByBar';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Icon, RadioButton } from 'react-native-paper';
import BannerImage from '../../components/BannerImage/BannerImage';
import { useGetProducts } from '../../hooks/products.hooks';
import i18next, { t } from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIconUrl } from '../../assets/icons';
import NIScreen from '../../components/NIScreen/NiScreen';
import NIText from '../../components/NIText/NIText';
import DatePicker from 'react-native-date-picker';
import { useGetCurrentUser } from '../../hooks/user.hooks';
import NIButton from '../../components/NIButton/NIButton';
import { updateUser } from '../../api/auth.api';
import navigationAdapter from '../../navigation/NavigationAdapter';
import NAVIGATION_ROUTES from '../../navigation/NavigationRoutes';



type ProfileScreenProps = {
    route: {
        params?: {
            // emailOrPhone?: string;
            // type?: number; 
        };
    }
};




const CustomerServiceScreen = ({ route }: ProfileScreenProps) => {

    const contactUsBottomSheetRef = useRef<BottomSheetModal>(null);


    const [date, setDate] = useState(new Date());

    const { data: currentUser, isError: currentUserError, isLoading: currentUserIsLoading } = useGetCurrentUser();

    const [open, setOpen] = useState(false)

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dataOfBirth: new Date(),
        gender: 'male',
    });



    const menu = [
        {
            label: 'tickets',
            screen_key: 'lang',
            onPress: () => {
                navigationAdapter.navigate(NAVIGATION_ROUTES.TICKETS) 
            }

        },
        {
            label: 'contact_us',
            screen_key: 'profile',
            onPress: () => { contactUsBottomSheetRef.current?.present() },

        },
        {
            label: 'frequently_asked_questions',
            icon: "ic_account",
            screen_key: 'orders',
            onPress: () => { navigationAdapter.navigate(NAVIGATION_ROUTES.FAQ) }

        },
        {
            label: 'return_and_refund_policy',
            icon: "ic_ph_address_book",
            screen_key: 'addresses',
            onPress: () => { navigationAdapter.navigate(NAVIGATION_ROUTES.RETURN_POLICY) }
        }

    ]

    // Sync user state with currentUser changes
    useEffect(() => {
        if (currentUser) {
            setUser({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                dataOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : new Date(),
                gender: currentUser.gender || 'male',
            });
        }
    }, [currentUser]);

    const renderCell = (item) => {
        return <TouchableOpacity onPress={item.onPress} style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', paddingVertical: 20, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <NIText style={{ fontSize: 15, marginRight: 15 }}>{t(item.label)}</NIText>
            </View>
            <View>
                <Icon source={getIconUrl(Images, 'ic_angle_left')} size={15} />
            </View>
        </TouchableOpacity>
    }




    return (
        <NIScreen title={t("customer_service")} headerProps={{ style: { marginBottom: 0 } }}>
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


            <BottomSheet
                title='الترتيب علي حسب'
                withHeader={false}
                bottomSheetModalRef={contactUsBottomSheetRef}>
                <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <NIText style={{ fontSize: 16, marginBottom: 10 }}>{t("contact_us")}</NIText>
                    <NIText style={{ fontSize: 14, marginBottom: 20 }}>{t("contact_us_at_our_channels")}</NIText>
                    <View>
                        <NIText style={{ fontSize: 14, marginBottom: 5, textAlign: 'center' }}>{t("customer_service_working_hours")}</NIText>
                        <NIText style={{ fontSize: 14, marginBottom: 20 }}>{t("customer_service_working_hours_description")}</NIText>
                    </View>
                </View>
                <View style={{  paddingHorizontal: 20 }}>
                    <View style={{ marginVertical: 10 }}>
                        <TouchableOpacity style={[styles.button, {
                            flexDirection: 'row-reverse',
                        }]} onPress={() => {
                            // Handle contact us action
                        }}>
                            <Icon source={getIconUrl(Images, 'famicons_logo_whatsapp')} size={20} />
                            <NIText style={{ color: '#FFF', fontSize: 15 }}> {t("whats_app")}</NIText>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginVertical: 10 }}>
                        <TouchableOpacity style={[styles.button, {
                            flexDirection: 'row-reverse',
                        }]} onPress={() => {
                            // Handle contact us action
                        }}>
                            <Icon source={getIconUrl(Images, 'iconoir_phone')} size={20} />
                            <NIText style={{ color: '#FFF', fontSize: 15 }}> {t("phone")}</NIText>
                        </TouchableOpacity>
                    </View>


                    <View style={{ marginVertical: 10 }}>
                        <TouchableOpacity style={[styles.button, {
                            flexDirection: 'row-reverse',
                        }]} onPress={() => {
                            // Handle contact us action
                        }}>
                            <Icon source={getIconUrl(Images, 'formkit_email')} size={20} />
                            <NIText style={{ color: '#FFF', fontSize: 15 }}> {t("email")}</NIText>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>

        </NIScreen>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        // alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#3f2848",
    }
});


export default CustomerServiceScreen