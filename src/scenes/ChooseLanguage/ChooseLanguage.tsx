import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Images } from './../../assets'
import { getIconUrl } from "../../assets/icons";

type ChooseLanguagenProps = {
    onFinish?: () => void;
};

const ChooseLanguage: React.FC<ChooseLanguagenProps> = ({ onFinish }) => {



    return (
        <View style={styles.container}>
            <View style={styles.logoWithSlogan}>
                <Image source={getIconUrl(Images, 'choose_lang_logo')} style={styles.image} />}
                <Text style={styles.slogan}>Slogansss</Text>
            </View>

            <View style={styles.chooseLangWrapper}>
                <Text style={styles.slogan}>Slogan</Text>
                <Text style={styles.slogan}>Slogan</Text>
                <Text style={styles.slogan}>Slogan</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "#000", // Change to match your theme
    },
    image: {
       flex: 2
        // width: 100, // Adjust size as needed
        // height: 100,
        //resizeMode: "contain",
    },
    logoWithSlogan: {
        borderColor: '#F00',
        borderWidth: 1,
        flex: 2,
        //backgroundColor:'#333',

        // justifyContent: 'flex-end',
        // alignItems: 'flex-end'
    },
    slogan: {
        flex: 1
    },
    chooseLangWrapper: {
        flex: 1
    }
});

export default ChooseLanguage;
