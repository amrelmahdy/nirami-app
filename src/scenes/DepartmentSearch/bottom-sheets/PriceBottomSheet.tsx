import React, { RefObject, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import { RadioButton } from 'react-native-paper';
import { FONT_FAMILIES } from '../../../assets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Slider, { MarkerProps } from '@react-native-community/slider';
import NIText from '../../../components/ProductCard/NIText/NIText';



type PriceBottomSheetProps = {
};

const CONSTANTS = {
    MAX_VALUE: 500,
    MIN_VALUE: 17,
    STEP: 400,
    DEFAULT_STEP_RESOLUTION: 100,
} as const;




const toArabicDigits = (num: number | string) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return num
        .toString()
        .replace(/\d/g, d => arabicDigits[parseInt(d)]);
};


const PriceBottomSheet: React.FC<PriceBottomSheetProps> = ({ }) => {
    const [value, setValue] = useState(0);

    const [sortBy, setSortBy] = useState('new');

    const [popularity, setpo] = useState(false)

    return (

        <View style={styles.container}>

            {/* This is where we show min and max labels */}
            <View style={styles.minMaxLabelContainer}>
                <NIText style={styles.minMaxText}>٥٠٠ رس</NIText>
                <NIText style={styles.minMaxText}>
                    {toArabicDigits(+value.toFixed(0))}
                    &nbsp; 
                    رس
                </NIText>
                <NIText style={styles.minMaxText}>١٧ رس</NIText>
            </View>

            {/* Current selected value */}

            {/* The slider */}
            <Slider
                style={styles.slider}
                minimumValue={CONSTANTS.MIN_VALUE}
                maximumValue={CONSTANTS.MAX_VALUE}
                value={value}
                onValueChange={setValue}
                tapToSeek
                inverted
                minimumTrackTintColor={'#000'}
                maximumTrackTintColor={'#979EA4'}
            />
        </View>
    )
}



export default PriceBottomSheet;

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '500',
        margin: 0,
    },
    trackText: {
        color: '#FFFFFF',
        fontSize: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        top: 12,
    },
    trackDot: {
        width: 10,
        height: 10,
        borderRadius: 10,
        top: 4,
    },
    empty: {
        backgroundColor: '#B3BFC9',
    },
    filled: {
        backgroundColor: '#00629A',
    },
    customComponentFrame: {
        flex: 1,
        flexDirection: 'row',
        top: -10,
        opacity: 0.95,
    },
    customComponentLeftFrame: {
        height: 40,
        width: 20,
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
    },
    customComponentRightFrame: {
        height: 40,
        width: 20,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
    },
    divider: {
        width: 2,
        height: 20,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        width: 2,
        height: 20,
        backgroundColor: '#00629A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        marginTop: 10,
        width: 55,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    tinyLogo: {
        marginVertical: 2,
        aspectRatio: 1,
        flex: 1,
        height: '100%',
        width: '100%',
    },
    minMaxLabel: {
        flexDirection: 'row',
        zIndex: -1,
    },
    slider: {
        width: 300,
        opacity: 1,
        marginTop: 10,
    },
    outer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#11FF11',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerTrue: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#0F0FFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#111111',
    },
    innerTrue: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#0F0FFF',
    },
    container: {
        alignItems: 'center',
        marginBottom: 130,
        marginTop: 30
    },
    outerSmall: {
        width: 4,
        height: 4,
        top: 6,
        borderRadius: 2,
        backgroundColor: '#003366',
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerTrueSmall: {
        width: 8,
        height: 8,
        borderRadius: 2,
        backgroundColor: '#ABCDEF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerSmall: {
        width: 7,
        height: 7,
        borderRadius: 1,
        backgroundColor: '#223366',
    },
    innerTrueSmall: {
        width: 7,
        height: 7,
        borderRadius: 1,
        backgroundColor: '#334488',
    },
    minMaxLabelContainer: {
        width: 300, // should match your slider width
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginBottom: 4,
    },
    minMaxText: {
        fontSize: 12,
        color: '#000',
    },
});

