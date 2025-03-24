import React, { useEffect } from "react";
import { Button, View, ImageBackground, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native";
import { Text } from "react-native-gesture-handler";
import { Images } from "../../../assets";
import { getIconUrl } from "../../../assets/icons";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import NAVIGATION_ROUTES from "../../../navigation/NavigationRoutes";
import navigationAdapter from "../../../navigation/NavigationAdapter";
// import { TextInput } from 'react-native-paper';
// import { InputOutline, InputStandard } from 'react-native-input-outline';

// import NavigationAdapterImpl from '../../navigation/NavigationAdapterImpl'
// import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";

function LoginOrRegister() {

    const [activeTab, setActiveTab] = React.useState('login');

    // useEffect(() => {
    //     console.log("Current Screen Name: ", NavigationAdapterImpl.getCurrentScreenName())

    // })


    return (


        <SafeAreaProvider>
            <SafeAreaView style={styles.container} edges={['left', 'right']}>
                <ImageBackground source={getIconUrl(Images, activeTab === 'login' ? 'login_shape' : 'register_shape')} resizeMode="cover" style={styles.imageBackground}>
                    {/* <Text style={styles.text}>Inside</Text> */}
                </ImageBackground>
                <View style={styles.loginFormContainer}>

                    <View style={styles.logoContainer}>
                        <Image style={styles.logo} source={getIconUrl(Images, "login_logo_nirami")} />
                    </View>

                    <View style={styles.tabsSection}>
                        <View style={styles.tabsContainer}>
                            <View style={styles.tabs}>
                                <TouchableOpacity style={styles.tab} onPress={() => setActiveTab("register")}>
                                    <Text style={[styles.font, {
                                         color:  activeTab === 'register' ? 'rgb(190, 190, 190)' : '#000'
                                    }]}>التسجيل</Text>
                                </TouchableOpacity>
                                <Text style={styles.tabDivider}>|</Text>
                                <TouchableOpacity style={styles.tab} onPress={() => setActiveTab("login")}>
                                    <Text style={[styles.font, {
                                        color:  activeTab === 'login' ? 'rgb(190, 190, 190)' : '#000'
                                    }]}>تسجيل الدخول</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.fieldContainer}>
                            <TextInput
                                style={styles.input}
                                onChangeText={() => { }}
                                //value={number}
                                placeholder=" البريد الإلكتروني او رقم الجوال"
                                keyboardType="numeric"
                            />
                            {/* <TextInput
                                mode="outlined"
                                
                                //label="البريد الإلكتروني او رقم الجوال"
                                label={
                                    <Text
                                    style={{
                                      fontSize: 16,
                                      fontFamily: 'Almarai-Regular',
                                      color: "red",
                                    }}
                                  >
                                    البريد الإلكتروني او رقم الجوال
                                  </Text>
                                }
                                //placeholder="البريد الإلكتروني او رقم الجوال"
                                style={{
                                    textAlign: "right",
                                }}
                                // textColor="green"
                                theme={{
                                    fonts: { labelLarge: { fontFamily: 'Almarai-Regular', fontSize: 18, fontWeight: "bold" } },
                                    colors: { onSurfaceVariant: "red" }, // Label color
                                }}
                                contentStyle={
                                    styles.input
                                }
                                outlineColor="green"
                                outlineStyle={{
                                    alignContent:'space-evenly'
                                }}
                                underlineStyle={{
                                    borderRadius:'green'
                                }}
                            /> */}
                        </View>




                    </View>
                </View>

                <View style={styles.continueBtnContainer}>
                    <TouchableOpacity style={{}} onPress={() => {
                        navigationAdapter.navigate(NAVIGATION_ROUTES.OTP)
                    }}>
                        <Text style={styles.continueBtn}>استمرار</Text>
                    </TouchableOpacity>

                </View>



            </SafeAreaView>
        </SafeAreaProvider>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1.5,
        //justifyContent: 'flex-start',
    },
    loginFormContainer: {
        flex: 1,
        paddingTop: 30,
        alignItems: 'center',

    },
    logoContainer: {
        // marginTop: 30,
        marginBottom: 30
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
        width: '100%',
        justifyContent: 'space-between'

    },
    tabsContainer: {
        flex: 1
    },
    tabs: {
        marginTop: 20,
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        padding: 15,
        borderColor: '#bebebe',
        marginHorizontal: 20
    },
    tab: {
        flex: 1,
    },
    tabDivider: {
        flex: 0.1,
        fontSize: 20,
        color: 'rgb(190, 190, 190)'
    },
    fieldContainer: {
        flex: 1,
    },
    font: {
        flex: 1,
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'Almarai-Regular',
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        fontSize: 17,
        padding: 10,
        fontFamily: 'Almarai-Regular',
        textAlign: "right",
        textAlign: 'right',
        borderColor: 'rgb(190, 190, 190)',
        borderRadius: 5
    },
    continueBtnContainer: {
        flex: .5,
        alignItems: 'center'
    },
    continueBtn: {
        fontFamily: 'Almarai-Regular',
        fontSize: 17,
        borderWidth: 1,
        borderColor: 'rgb(190, 190, 190)',
        borderRadius: 15,
        textAlign: 'center',
        width: 130,
        paddingVertical: 5,
        paddingHorizontal: 25
    }
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