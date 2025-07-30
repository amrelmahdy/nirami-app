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
import { RadioButton } from 'react-native-paper';
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



type ProfileScreenProps = {
    route: {
        params?: {
            // emailOrPhone?: string;
            // type?: number; 
        };
    }
};

const AddTicketScreen = ({ route }: ProfileScreenProps) => {

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
        <NIScreen title={t("faq")} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
               
            </View>
        </NIScreen>
    );
}

const styles = StyleSheet.create({

});


export default AddTicketScreen