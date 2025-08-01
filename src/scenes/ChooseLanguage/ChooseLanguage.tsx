import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Images } from './../../assets'
import { getIconUrl } from "../../assets/icons";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import i18next, { t } from "i18next";
import i18n from "../../i18n";
import Config from "react-native-config";

type ChooseLanguagenProps = {
    onFinish?: () => void;
};


const ChooseLanguage: React.FC<ChooseLanguagenProps> = ({ onFinish }) => {



    return (
        <View style={styles.container}>
            <View style={styles.logoWithSlogan}>
                <Image source={getIconUrl(Images, 'login_logo_nirami')} style={styles.image} />
                <Text style={styles.slogan}>{t("slogan")}</Text>
        </View>

            <View style={styles.chooseLangWrapper}>
                <Text style={styles.chooseLang}>{t("choose_lang")}</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    borderWidth: 1,
                    borderColor: '#bebebe',
                    height: 40,
                    alignItems: 'center',

                }}>
                    <TouchableOpacity onPress={() => {
                        navigationAdapter.replace(NAVIGATION_ROUTES.AUTH)
                        i18next.changeLanguage('en')
                    }} style={{ flex: 1 }} onLayout={(event) => console.log("Width:", event.nativeEvent.layout.width)}>
                        <Text style={styles.lang}>{t("lang_en")}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigationAdapter.replace(NAVIGATION_ROUTES.AUTH)
                        i18next.changeLanguage('ar')
                    }
                    } style={{ flex: 1 }} onLayout={(event) => console.log("Width:", event.nativeEvent.layout.width)}>
                        <Text style={styles.lang}>{t("lang_ar")}</Text>
                    </TouchableOpacity>
                    <View style={{
                        position: 'absolute',
                        height: '100%',
                        width: 1,
                        backgroundColor: '#bebebe'
                    }} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        //backgroundColor: "#000", // Change to match your theme
    },
    image: {
        //flex: 1
        // width: 100, // Adjust size as needed
        // height: 100,
        resizeMode: "contain",
    },
    logoWithSlogan: {
        flex: 1,
        justifyContent: 'flex-end',
        //backgroundColor:'#333',

        alignItems: 'center',
        // alignItems: 'flex-end'
    },
    slogan: {
        fontFamily: 'Almarai-Regular',
        textAlign: 'center'
    },
    lang: {
        fontFamily: 'Almarai-Regular',
        textAlign: 'center',
        padding: 10,

    },
    chooseLangWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    chooseLang: {
        fontFamily: 'Almarai-Regular',
        textAlign: 'center',
        marginBottom: 15
    }
});

export default ChooseLanguage;
