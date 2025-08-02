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
import NIAucordion from '../../components/NIAucordion/NIAucordion';



type ProfileScreenProps = {
    route: {
        params?: {
            // emailOrPhone?: string;
            // type?: number; 
        };
    }
};

const FAQsScreen = ({ route }: ProfileScreenProps) => {

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



    const ORDERS_SECTIONS = [
        {
            key: "faq_question_1",
            title: t("faq_question_1"),
            content: t("faq_answer_1"),
        },
        {
            key: "faq_question_2",
            title: t("faq_question_2"),
            content: t("faq_answer_2"),
        },
        {
            key: "faq_question_3",
            title: t("faq_question_3"),
            content: t("faq_answer_3"),
        },
        {
            key: "faq_question_4",
            title: t("faq_question_4"),
            content: t("faq_answer_4"),
        },
    ]

    const PAYMENT_SECTIONS = [
        {
            key: "faq_question_5",
            title: t("faq_question_5"),
            content: t("faq_answer_5"),
        }
    ]

    const PRPODUCTS_SECTIONS = [
        {
            key: "faq_question_6",
            title: t("faq_question_6"),
            content: t("faq_answer_6"),
        },
        {
            key: "faq_question_7",
            title: t("faq_question_7"),
            content: t("faq_answer_7"),
        },
        {
            key: "faq_question_8",
            title: t("faq_question_8"),
            content: t("faq_answer_8"),
        },
    ]

    const RETURN_AND_REPLACEMENT_SECTIONS = [
        {
            key: "faq_question_9",
            title: t("faq_question_9"),
            content: t("faq_answer_9"),
        },
        {
            key: "faq_question_10",
            title: t("faq_question_10"),
            content: t("faq_answer_10"),
        },
        {
            key: "faq_question_11",
            title: t("faq_question_11"),
            content: t("faq_answer_11"),
        },
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

    return (
        <NIScreen title={t("faq")} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1, paddingVertical: 15 }}>
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <NIText style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20 }}>{t("orders")}</NIText>
                    <NIAucordion sections={ORDERS_SECTIONS} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <NIText style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20 }}>{t("payment")}</NIText>
                    <NIAucordion sections={PAYMENT_SECTIONS} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <NIText style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20 }}>{t("products")}</NIText>
                    <NIAucordion sections={PRPODUCTS_SECTIONS} />
                </View>
                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <NIText style={{ fontFamily: 'Almarai-Bold', textAlign: 'right', fontSize: 20, marginBottom: 20 }}>{t("returns_and_exchanges")}</NIText>
                    <NIAucordion sections={RETURN_AND_REPLACEMENT_SECTIONS} />
                </View>
            </ScrollView>
        </NIScreen>
    );
}

const styles = StyleSheet.create({

});


export default FAQsScreen