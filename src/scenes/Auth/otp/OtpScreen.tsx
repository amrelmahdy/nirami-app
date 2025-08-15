import React, { useEffect } from "react";
import { Button, View, ImageBackground, StyleSheet, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { Text } from "react-native-gesture-handler";
import { Images } from "../../../assets";
import { getIconUrl } from "../../../assets/icons";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
// import NavigationAdapterImpl from '../../navigation/NavigationAdapterImpl'
// import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { OtpInput } from "react-native-otp-entry";
import navigationAdapter from "../../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../../navigation/NavigationRoutes";
import { login, verifyOTPForLoginOrRegister } from "../../../api/auth.api";
import NIText from "../../../components/NIText/NIText";
import { RouteProp } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeSpacesFromSaudiNumber } from "../../../utils/helpers";

type OtpScreenRouteProp = {
    params?: {
        emailOrPhone?: string;
        otpId?: string;
        type?: number; // 0 for login, 1 for register
    };
};

function OtpScreen({ route }: { route: OtpScreenRouteProp }) {

    const emailOrPhone = route.params?.emailOrPhone ?? '';
    const otpId = route.params?.otpId ?? '';

    const type = route.params?.type;

    const [inputError, setInputError] = React.useState<string | null>(null);

    const handleonFilled = async (text: string) => {
        try {
            const res = await login(removeSpacesFromSaudiNumber(emailOrPhone), otpId, text)
            if (res && res.accessToken) {
                const accessToken = res.accessToken;
                const refreshToken = res.refreshToken;
                const expiresIn = res.expiresIn;
                const expiresAt = res.expiresAt;
                await AsyncStorage.multiSet([
                    ['access-token', accessToken],
                    ['refresh-token', refreshToken],
                    ['expires-in', expiresIn],
                    ['expires-at', expiresAt]
                ]);
                navigationAdapter.replace(NAVIGATION_ROUTES.BOTTOM_TAB_BAR);
            }
        } catch (error: any) {
            console.log("Error verifying OTP:", error, JSON.stringify(error, Object.getOwnPropertyNames(error)));
            setInputError(error?.message || 'حدث خطأ غير متوقع');
        }

    }

    return (


        <SafeAreaView style={styles.container} >
            {/* ic_weui_arrow_outlined */}

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableOpacity style={styles.backBtnWrapper} onPress={() => {
                    navigationAdapter.goBack()
                }}>
                    <Image style={styles.backBtnIcon} source={getIconUrl(Images, "ic_weui_arrow_outlined")} />
                </TouchableOpacity>
            </View>

            <View>
                <Text style={styles.header}>قم بتاكيد رقم هاتفك</Text>
                <Text style={styles.otpDesc}>لقد أرسلنا رسالة نصية تحتوي على رمز التفعيل الى هاتفك 0546665576</Text>
            </View>


            <OtpInput
                numberOfDigits={4}
                focusColor="#452347"
                autoFocus={false}
                hideStick={true}
                // placeholder="******"
                blurOnFilled={true}
                disabled={false}
                type="numeric"
                secureTextEntry={false}
                focusStickBlinkingDuration={400}
                onFocus={() => console.log("Focused")}
                onBlur={() => console.log("Blurred")}
                onTextChange={(text) => console.log(text)}
                onFilled={handleonFilled}
                textInputProps={{
                    accessibilityLabel: "One-Time Password",
                }}
                theme={{
                    containerStyle: {
                        direction: 'rtl'
                    },
                    pinCodeContainerStyle: {
                        width: 58,
                        height: 58,
                        borderRadius: 12,
                    }
                }
                    //     {
                    //     containerStyle: styles.container,
                    //     pinCodeContainerStyle: styles.pinCodeContainer,
                    //     pinCodeTextStyle: styles.pinCodeText,
                    //     focusStickStyle: styles.focusStick,
                    //     focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                    //     placeholderTextStyle: styles.placeholderText,
                    //     filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                    //     disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
                    // }
                }
            />

            <View>
                {inputError && (
                    <NIText style={{ color: 'red', textAlign: 'center', marginTop: 20, fontFamily: 'Almarai-Regular' }}>
                        {inputError}
                    </NIText>
                )}
            </View>

            <View style={{}}>
                <Text style={styles.resendHeader}>لم تتلقي رمز التحقق ؟</Text>
                <Text style={styles.resendText}> أرسل الرمز مرة اخري 02:30</Text>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity style={styles.smsTextBox} >
                    <Text style={styles.smsText}>الرسائل النصية</Text>
                    <Image style={styles.resendTextIcon} source={getIconUrl(Images, "ic_material_symbols_sms_rounded")} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.whatsappTextBox} >
                        <Text style={styles.whatsappText}>الواتس اب</Text>
                        <Image style={styles.resendTextIcon} source={getIconUrl(Images, "ic_dashicons_whatsapp")} />
                    </TouchableOpacity> */}

            </View>

        </SafeAreaView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15
    },
    backBtnWrapper: {
        width: 35,
        height: 35,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bebebe',
        justifyContent: 'center',
        alignItems: 'center',

    },
    backBtnIcon: {

    },
    header: {
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Almarai-Regular',
        marginVertical: 20,
        height: 50,
        lineHeight: 50,
        //backgroundColor: '#333'

    },

    otpDesc: {
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Almarai-Light',
        marginBottom: 30,
        height: 50,
        lineHeight: 25,
    },
    resendHeader: {
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Almarai-Regular',
        marginVertical: 30,
        height: 25,
        lineHeight: 25,
    },
    resendText: {
        fontSize: 17,
        fontFamily: 'Almarai-Light',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 25,
        lineHeight: 25,
        marginBottom: 30

    },
    whatsappTextBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgb(190, 190, 190)',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 5,
        width: 145,
        justifyContent: 'flex-end'
    },
    whatsappText: {
        fontFamily: 'Almarai-Regular',
        fontSize: 15,
        color: '#14AE5C'

    },
    smsTextBox: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'rgb(190, 190, 190)',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 6,
        // width: 145,
        justifyContent: 'center'

    },
    smsText: {
        fontFamily: 'Almarai-Regular',
        fontSize: 15,
        color: '#0983C1'
    },
    resendTextIcon: {
        marginHorizontal: 5
    }
})

export default OtpScreen