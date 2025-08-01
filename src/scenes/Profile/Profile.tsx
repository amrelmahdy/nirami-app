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
import { ActivityIndicator, RadioButton } from 'react-native-paper';
import BannerImage from '../../components/BannerImage/BannerImage';
import { useGetProducts } from '../../hooks/products.hooks';
import i18next from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIconUrl } from '../../assets/icons';
import NIScreen from '../../components/NIScreen/NiScreen';
import NIText from '../../components/NIText/NIText';
import DatePicker from 'react-native-date-picker';
import { useGetCurrentUser } from '../../hooks/user.hooks';
import NIButton from '../../components/NIButton/NIButton';
import { updateUser } from '../../api/auth.api';



type ProfileScreenProps = {
    route: {
        params?: {
            // emailOrPhone?: string;
            // type?: number; 
        };
    }
};

const ProfileScreen = ({ route }: ProfileScreenProps) => {

    const [date, setDate] = useState(new Date());

    const [isUpdatingUserData, setIsUpdatingUserData] = useState(false);

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

    return (
        <NIScreen title="الصفحة الخاصة" style={{ flex: 1 }}>
            {
                currentUserIsLoading || isUpdatingUserData ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#3f2848" />
                </View>) :
                    <View style={{ flex: 1 }}>
                        <View>
                            <NIText style={{ marginVertical: 10, marginHorizontal: 15 }}>اللقب</NIText>
                            <RadioButton.Group
                                onValueChange={value => setUser({
                                    ...user,
                                    gender: value
                                })}
                                value={user.gender}
                            >
                                <View style={{ flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 0 }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton.Item
                                            value="male"
                                            label='ذكر'
                                            labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                                            status='checked'

                                            // color='#693B13'
                                            // uncheckedColor='#F3E2CD'
                                            mode='android'
                                            rippleColor="transparent"

                                        />

                                    </View>

                                    <View style={{ flexDirection: 'row' }}>
                                        <RadioButton.Item
                                            value="female"
                                            label='أنثي'
                                            labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                                            status='checked'

                                            // color='#693B13'
                                            // uncheckedColor='#F3E2CD'
                                            mode='android'
                                            rippleColor="transparent"

                                        />

                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>

                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <NIText style={{ marginBottom: 10 }}>الإسم الأول</NIText>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#C3C3C3", padding: 10, height: 50, textAlign: 'right', borderRadius: 5 }}
                                value={user.firstName}
                                onChange={(e) => setUser({ ...user, firstName: e.nativeEvent.text })}
                            />
                        </View>
                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <NIText style={{ marginBottom: 10 }}>إسم العائلة</NIText>
                            <TextInput

                                style={{ borderWidth: 1, borderColor: "#C3C3C3", height: 50, padding: 10, textAlign: 'right', borderRadius: 5 }}
                                value={user.lastName}
                                onChange={(e) => setUser({ ...user, lastName: e.nativeEvent.text })}
                            />
                        </View>

                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <NIText style={{ marginBottom: 10 }}>رقم الجوال</NIText>
                            <View style={{ flexDirection: 'row' }}>
                                <TextInput editable={false} style={{ borderWidth: 1, borderColor: "#C3C3C3", height: 50, borderRadius: 5, flex: 0.3, padding: 10 }} value="+966" />
                                <View style={{ flex: 0.1 }} />
                                <TextInput
                                    editable={false}
                                    style={{ borderWidth: 1, borderColor: "#C3C3C3", height: 50, borderRadius: 5, padding: 10, flex: 1 }}
                                    value={user.phone}
                                    onChange={(e) => setUser({ ...user, phone: e.nativeEvent.text })}
                                />
                            </View>
                        </View>

                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <NIText style={{ marginBottom: 10 }}>البريد الإلكتروني</NIText>
                            <TextInput
                                style={{ borderWidth: 1, borderColor: "#C3C3C3", height: 50, textAlign: 'right', padding: 10, borderRadius: 5 }}
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.nativeEvent.text })}
                            />
                        </View>



                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <NIText style={{ marginBottom: 10 }}>تاريخ الميلاد</NIText>
                            <TextInput editable={false}
                                onTouchStart={() => setOpen(true)} // ✅ use onTouchStart instead of onPress for TextInput
                                style={{ borderWidth: 1, borderColor: "#C3C3C3", height: 50, textAlign: 'right', borderRadius: 5, padding: 10 }}
                                value={user.dataOfBirth?.toISOString()} // or 'en-US'
                            />
                            <DatePicker
                                modal
                                open={open}
                                date={date}
                                mode='date'
                                onConfirm={(date) => {
                                    console.log('Selected date:', date);
                                    setOpen(false)
                                    setUser({
                                        ...user,
                                        dataOfBirth: date
                                    })
                                }}
                                onCancel={() => {
                                    setOpen(false)
                                }}
                            />
                        </View>


                        <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                            <NIButton onPress={async () => {
                                setIsUpdatingUserData(true);

                                try {

                                    const newUser = {
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email,
                                        phone: user.phone,
                                        dateOfBirth: user.dataOfBirth,
                                        gender: user.gender
                                    }

                                    await updateUser(currentUser?.id || "", newUser)
                                    setIsUpdatingUserData(false);


                                } catch (error) {
                                    setIsUpdatingUserData(false);
                                    console.error('Error updating user:', error);

                                }
                            }}>تحديث</NIButton>
                        </View>




                    </View>
            }
        </NIScreen>
    );
}

const styles = StyleSheet.create({

});


export default ProfileScreen