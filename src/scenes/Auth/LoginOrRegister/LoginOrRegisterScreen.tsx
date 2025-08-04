import React, { useEffect } from "react";
import { Button, View, ImageBackground, StyleSheet, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { Text } from "react-native-gesture-handler";
import { Images } from "../../../assets";
import { getIconUrl } from "../../../assets/icons";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import NAVIGATION_ROUTES from "../../../navigation/NavigationRoutes";
import navigationAdapter from "../../../navigation/NavigationAdapter";
import i18next, { t } from "i18next";
import { sendAnOTPForLoginOrRegister } from "../../../api/auth.api";
import { formatSaudiNumber, getNormalizedPhone, isValidEmailOrSaudiPhone, isValidSaudiPhone } from "../../../utils/helpers";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import NIText from "../../../components/NIText/NIText";
import { TouchableRipple } from "react-native-paper";
// import { TextInput } from 'react-native-paper';
// import { InputOutline, InputStandard } from 'react-native-input-outline';

// import NavigationAdapterImpl from '../../navigation/NavigationAdapterImpl'
// import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";



function LoginOrRegister() {

    const [activeTab, setActiveTab] = React.useState('login');
    const [emailOrPhone, setEmailOrPhone] = React.useState('');
    const [inputError, setInputError] = React.useState<string | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    const handleEmailOrPhoneChange = (text: string) => {
        const formatted = formatSaudiNumber(text);
        setEmailOrPhone(formatted ? formatted : text);
        setInputError(null);
    };

    const handleContinuePress = async () => {



        try {
            if (!formatSaudiNumber(emailOrPhone)) {
                setInputError('يرجى إدخال رقم جوال صحيح');
                return;
            }
            setIsLoading(true);
            const res = await sendAnOTPForLoginOrRegister(emailOrPhone);
            console.log("OTP sent response: ", res);
            setIsLoading(false);
            if (!res.success) {
                setInputError(res.error);
                return;
            }
            navigationAdapter.navigate(NAVIGATION_ROUTES.OTP, { emailOrPhone, type: activeTab !== 'register' ? 0 : 1, otpId: res?.id }); // Pass emailOrPhone to OTP screen

        } catch (error) {
            setIsLoading(false);
            // Handle Axios or Fetch-style backend error format
            let message = 'حدث خطأ أثناء إرسال رمز التحقق';

            if (error?.response?.data?.code) {
                // e.g. NestJS returns { message: 'user_not_found' }
                message = typeof error.response.data.code === 'string'
                    ? error.response.data.code
                    : error.response.data.code[0]; // In case it's an array
            } else if (error?.message) {
                message = error.message;
            }

            setInputError(message);

        }
    };

    // useEffect(() => {
    //     console.log("Current Screen Name: ", NavigationAdapterImpl.getCurrentScreenName())

    // })


    return (


        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.loginFormContainer}>
                <Image style={styles.logo} source={getIconUrl(Images, "login_logo_nirami")} />
                <View style={[styles.tabs, { flexDirection: i18next.language === 'ar' ? 'row' : 'row-reverse' }]}>
                    <TouchableRipple style={styles.tab} onPress={() => setActiveTab("register")}>
                        <NIText style={{
                            ...styles.font,
                            color: activeTab !== 'register' ? '#bebebe' : '#000'
                        }}>{t("register")}</NIText>
                    </TouchableRipple>
                    <Text style={styles.tabDivider} />
                    <TouchableRipple style={styles.tab} onPress={() => setActiveTab("login")}>
                        <NIText style={{
                            ...styles.font,
                            color: activeTab !== 'login' ? 'rgb(190, 190, 190)' : '#000'
                        }}>{t("login")}</NIText>
                    </TouchableRipple>
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={{ textAlign: 'right', fontFamily: 'Almarai-Regular', height: 20 }}>رقم الجوال</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={handleEmailOrPhoneChange}
                        value={emailOrPhone}
                        placeholder="رقم الجوال"
                        keyboardType="numeric"
                    />
                    {inputError && (
                        <NIText style={{ color: 'red', textAlign: 'right', marginBottom: 40, fontFamily: 'Almarai-Regular' }}>
                            {t(inputError)}
                        </NIText>
                    )}

                </View>

                <TouchableOpacity onPress={handleContinuePress} disabled={isLoading} style={[
                    styles.continueButton,
                    isLoading && styles.continueButtonDisabled,
                ]}>
                    <NIText style={{}}>استمرار</NIText>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 15

    },
    imageBackground: {
        flex: 1.5,
        //justifyContent: 'flex-start',
    },
    loginFormContainer: {
        flex: 0.5,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {

        // marginTop: 30,
        marginBottom: 30,

        //flex: 1,
        //flexDirection: 'row',
        //justifyContent: 'center'
    },
    logo: {
        width: 150,
        height: 25
    },
    tabsSection: {
        flex: 1,
        justifyContent: 'center',
    },
    tabsContainer: {

    },
    tabs: {
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        // paddingVertical: 15,
        borderColor: '#bebebe',
        marginVertical: 40,
    },
    tab: {
        flex: 1,
        //paddingVertical: 15,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',

    },
    tabDivider: {
        // flex: 0.1,
        // fontSize: 20,
        //borderWidth: 1,
        width: 1,
        backgroundColor: 'rgb(190, 190, 190)'
    },
    fieldContainer: {
        width: '100%',
    },
    font: {
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Almarai-Regular',
        alignItems: 'center'

    },
    input: {
        width: '100%',
        height: 50,
        marginVertical: 12,
        borderWidth: 1,
        fontSize: 17,
        padding: 10,
        fontFamily: 'Almarai-Regular',
        textAlign: "right",
        borderColor: 'rgb(190, 190, 190)',
        borderRadius: 5,

    },
    continueBtnContainer: {
        alignItems: 'center'
    },
    continueButton: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgb(190, 190, 190)',
        width: 130,
        paddingVertical: 10,
        marginTop: 20,
        alignItems: 'center',
    },

    continueButtonDisabled: {
        backgroundColor: '#e0e0e0', // gray out background
        borderColor: '#ccc',
    },

    continueBtnDisabledText: {
        color: '#999',
    },
    // text: {
    //     color: 'white',
    //     fontSize: 42,
    //     lineHeight: 84,
    //     fontWeight: 'bold',
    //     textAlign: 'center',
    //     backgroundColor: '#000000c0',
    // },
})

export default LoginOrRegister