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
import Toast from 'react-native-toast-message';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Ticket, useAddTicket } from '../../hooks/tickets.hooks';



type ProfileScreenProps = {
    route: {
        params?: {
            // emailOrPhone?: string;
            // type?: number; 
        };
    }
};

const AddTicketScreen = ({ route }: ProfileScreenProps) => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const [ticket, setTicket] = useState<Ticket>({
        name: "",
        phone: "",
        email: "",
        type: "complaint",
        message: "",
        orderNumber: ""
    });

    useEffect(() => {
        if (currentUser) {
            setTicket({
                name: currentUser.firstName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                type: "complaint",
                message: "",
                orderNumber: ""
            });
        }
    }, [currentUser]);



    const addTicket = useAddTicket()


    const showToast = () => {
        Toast.show({
            type: 'tomatoToast',
            text1: 'whoops',
            text2: 'global_error',
        });
    }

    return (
        <NIScreen title={t("add_new_ticket")} style={{ flex: 1 }}>
            {currentUserIsLoading || isLoading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3f2848" />
            </View>)
                :
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <NIText style={{ marginBottom: 10 }}>{t("username")}</NIText>
                        <TextInput
                            editable={false}
                            style={{ borderWidth: 1, borderColor: "#C3C3C3", padding: 10, height: 50, textAlign: 'right', borderRadius: 5, backgroundColor: "#EEE" }}
                            value={ticket.name}
                            onChange={(e) => setTicket({ ...ticket, name: e.nativeEvent.text })}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <NIText style={{ marginBottom: 10 }}>{t("email")}</NIText>
                        <TextInput
                            editable={false}
                            style={{ borderWidth: 1, borderColor: "#C3C3C3", height: 50, textAlign: 'right', padding: 10, borderRadius: 5, backgroundColor: "#EEE" }}
                            value={ticket.email}
                            onChange={(e) => setTicket({ ...ticket, email: e.nativeEvent.text })}
                        />
                    </View>


                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <NIText style={{ marginBottom: 10 }}>{t("mobile_number")}</NIText>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                editable={false}
                                style={{ borderWidth: 1, borderColor: "#C3C3C3", height: 50, borderRadius: 5, flex: 0.3, padding: 10, backgroundColor: "#EEE" }}
                                value="+966"
                            />
                            <View style={{ flex: 0.1 }} />
                            <TextInput
                                editable={false}
                                style={{ borderWidth: 1, borderColor: "#C3C3C3", height: 50, borderRadius: 5, padding: 10, flex: 1, backgroundColor: "#EEE" }}
                                value={ticket.phone}
                                onChange={(e) => setTicket({ ...ticket, phone: e.nativeEvent.text })}
                            />
                        </View>
                    </View>


                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <NIText style={{ marginBottom: 10 }}>{t("ticket_type")}</NIText>
                        <View style={{ direction: 'rtl' }}>
                            <FlatList
                                horizontal
                                data={[
                                    { key: 'complaint', label: 'شكوي' },
                                    { key: 'inquiry', label: 'استفسار' },
                                    { key: 'return_or_exchange', label: 'طلب استرجاع او استبدال' }
                                ]}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => {
                                        setTicket({ ...ticket, type: item.key });
                                    }} style={{ justifyContent: 'center', borderWidth: 1, borderColor: ticket.type === item.key ? "#333" : "#C3C3C3", height: 50, borderRadius: 5, paddingHorizontal: 10, marginLeft: 5 }}>
                                        <NIText>{item.label}</NIText>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => item.key}
                                contentContainerStyle={{ justifyContent: 'space-between', alignItems: 'center' }}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    </View>





                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <NIText style={{ marginBottom: 10 }}>{t("order_number")}</NIText>
                        <TextInput
                            style={{ borderWidth: 1, borderColor: "#C3C3C3", padding: 10, height: 50, textAlign: 'right', borderRadius: 5 }}
                            value={ticket.orderNumber}
                            onChange={(e) => setTicket({ ...ticket, orderNumber: e.nativeEvent.text })}
                        />
                    </View>

                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <NIText style={{ marginBottom: 10 }}>{t("message")}</NIText>
                        <TextInput
                            style={{
                                borderWidth: 1,
                                borderColor: "#C3C3C3",
                                padding: 10,
                                height: 100,
                                textAlign: 'right',
                                borderRadius: 5,
                                textAlignVertical: 'top', // ensures text starts at the top
                            }}
                            value={ticket.message}
                            multiline
                            numberOfLines={6}
                            onChange={(e) => setTicket({ ...ticket, message: e.nativeEvent.text })}
                            placeholder="اكتب رسالتك هنا"
                        />
                    </View>


                    <View style={{ paddingHorizontal: 15, marginTop: 20 }}>
                        <NIButton

                            disabled={
                                ticket.name === "" ||
                                ticket.phone === "" ||
                                ticket.email === "" ||
                                ticket.message === "" ||
                                ticket.orderNumber === ""
                            }

                            style={{
                                opacity: ticket.name === "" ||
                                    ticket.phone === "" ||
                                    ticket.email === "" ||
                                    ticket.message === "" ||
                                    ticket.orderNumber === "" ? 0.5 : 1
                            }}

                            onPress={async () => {
                                setIsLoading(true);
                                try {
                                    addTicket.mutateAsync(ticket, {
                                        onSuccess: (res) => {
                                            setIsLoading(false);
                                            if (res.ticketNumber) {
                                                Toast.show({
                                                    type: 'success',
                                                    text1: t("ticket_created_successfully"),
                                                    text2: `${t("your_ticket_number_is")} ${res.ticketNumber}`,
                                                });
                                                navigationAdapter.pop();
                                            }
                                        },
                                        onError: (error) => {
                                            setIsLoading(false);
                                            console.error('Error creating ticket:', error);
                                            Toast.show({
                                                type: 'error',
                                                text1: t("error_creating_ticket"),
                                                text2: error.message,
                                            });
                                        }
                                    });
                                } catch (error) {
                                    setIsLoading(false);
                                    console.error('Error creating ticket:', error);

                                }

                            }}>تحديث</NIButton>
                    </View>




                </ScrollView>
            }
            {/* <View style={{}}>
                <NIButton
                    onPress={showToast}
                >
                    Show toast
                </NIButton>
            </View> */}
        </NIScreen>
    );
}

const styles = StyleSheet.create({

});


export default AddTicketScreen