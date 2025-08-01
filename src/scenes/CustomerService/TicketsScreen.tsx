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
import { useGetTickets } from '../../hooks/tickets.hooks';



type ProfileScreenProps = {
    route: {
        params?: {
            // emailOrPhone?: string;
            // type?: number; 
        };
    }
};



const TicketsScreen = ({ route }: ProfileScreenProps) => {

    const [date, setDate] = useState(new Date());

    const { data: tickets, isError: ticketsIsError, isLoading: ticketsIsLoading, refetch } = useGetTickets();

    const [open, setOpen] = useState(false)




    const TICKET_TYPES = {
        "complaint": "ticket_type_complaint",
        "inquiry": "ticket_type_inquiry",
        "return_or_exchange": "ticket_type_return_or_exchange"
    }


    const TICKET_STATUSES = {
        'created': 'ticket_status_created',
        'processing': 'ticket_status_processing',
        'completed': 'ticket_status_completed',
        'closed': 'ticket_status_closed',
        'returned': 'ticket_status_returned'
    }

    return (
        <NIScreen title={t("tickets")} style={{ flex: 1 }}>
            {ticketsIsLoading ?
                (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#3f2848" />
                </View>) :
                <View style={{ flex: 1, paddingHorizontal: 0 }}>
                    <FlatList
                        data={tickets}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={{}}>

                                <NIText type='light' style={{ fontSize: 18, marginHorizontal: 15, marginTop: 15, marginBottom: 5 }}>

                                    {`${t('ticket_numer_label')} ${item?.ticketNumber}`}

                                </NIText>

                                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', borderWidth: 1, borderColor: 1 == 2 ? '#333' : '#efefef', marginHorizontal: 15, borderRadius: 10, marginVertical: 5, overflow: 'hidden' }}>

                                    <View style={{ padding: 15, backgroundColor: '#FFF' }}>
                                        <NIText type='light' style={{ fontSize: 15 }}>{item.name}</NIText>
                                        <NIText type='light' style={{ fontSize: 15 }}>{`+966${item.phone}`}</NIText>
                                        <NIText type='light' style={{ fontSize: 15 }}>{t(TICKET_TYPES[item.type])}</NIText>
                                        {/* <NIText type='light' style={{ fontSize: 15 }}>{address.location.displayName}</NIText> */}
                                    </View>
                                    <View style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' }}>
                                        <TouchableOpacity disabled style={{ marginBottom: 10 }} onPress={() => {

                                        }}>
                                            <NIText style={{ fontSize: 15, color: '#79777f' }}>{t(TICKET_STATUSES[item.status])}</NIText>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </View>
                        )}
                        ListEmptyComponent={() => (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
                                <NIText style={{ color: '#888', fontSize: 16 }}>{t("tickets_empty_list")}</NIText>
                            </View>
                        )}
                        style={{ flex: 1, paddingHorizontal: 15 }}
                        refreshing={ticketsIsLoading}
                        onRefresh={() => {
                            refetch();
                        }}


                    />
                </View>


            }

            <View style={{ marginBottom: 20, marginHorizontal: 15 }}>
                <NIButton type='primary' onPress={() => navigationAdapter.navigate(NAVIGATION_ROUTES.ADD_TICKET)}>{t("add_new_ticket")}</NIButton>
            </View>
        </NIScreen >
    );
}

const styles = StyleSheet.create({

});


export default TicketsScreen