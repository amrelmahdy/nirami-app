import React, { RefObject, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import { RadioButton } from 'react-native-paper';
import { FONT_FAMILIES } from '../../../assets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
// import Slider, { MarkerProps } from '@react-native-community/slider';
import NIText from '../../../components/NIText/NIText';
import NIButton from '../../../components/NIButton/NIButton';
import i18next, { t } from 'i18next';
import { toArabicDigits } from '../../../utils/helpers';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { Slider } from '@miblanchard/react-native-slider';


type PriceBottomSheetProps = {
    setActivePrice: (price: string) => void;
    activePrice?: string;
    bottomSheetModalRef?: RefObject<BottomSheetModal | null>;
};

const CONSTANTS = {
    MAX_VALUE: 500,
    MIN_VALUE: 0,
    STEP: 1,
    DEFAULT_STEP_RESOLUTION: 100,
} as const;






const PriceBottomSheet: React.FC<PriceBottomSheetProps> = ({
    setActivePrice,
    activePrice,
    bottomSheetModalRef,
    setIsSliding,
    setActivePriceFrom,
    activePriceFrom,
    setActivePriceTo,
    activePriceTo
}) => {
    const [value, setValue] = useState([i18next.language === 'ar' ? 500 - activePriceTo : activePriceFrom, i18next.language === 'ar' ? 500 - activePriceFrom : activePriceTo]);

    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])

    // const multiSliderValuesChange = (values) => setMultiSliderValue(values)


    console.log(value[0], "value in price bottom sheet0");
    console.log(value[1], "value in price bottom sheet1");

    return (

        <View style={styles.container}>

            <View style={{}}>
                <View style={[styles.minMaxLabelContainer, {
                    flexDirection: i18next.language === 'ar' ? 'row' : 'row-reverse',
                }]}>
                    <NIText style={styles.minMaxText}>{ }
                        {
                            i18next.language === 'ar' ?
                                toArabicDigits(500 - value[0]) || 0 : value[1] || 0
                        }
                        &nbsp;
                        {t('sar')}
                    </NIText>
                    {/* <NIText style={styles.minMaxText}>
                        {i18next.language === 'ar' ? toArabicDigits(+value.toFixed(0)) : value.toFixed(0)}
                        &nbsp;
                        {t('sar')}
                    </NIText> */}
                    <NIText style={styles.minMaxText}>{

                        i18next.language === 'ar' ?
                            toArabicDigits(500 - value[1]) || 500 : (value[0]) || 0
                    }



                        &nbsp;
                        {t('sar')}
                    </NIText>
                </View>






                <Slider

                    containerStyle={{

                        //direction: i18next.language === 'ar' ? 'rtl' : 'ltr',
                        transform: [{ scaleY: i18next.language === 'ar' ? -1 : -1 }]
                    }}
                    minimumTrackTintColor={'#000'}
                    maximumTrackTintColor={'#DDD'}
                    minimumValue={CONSTANTS.MIN_VALUE}
                    maximumValue={CONSTANTS.MAX_VALUE}
                    // inverted={true}  // Flips the direction of the slider
                    // thumbTintColor={Colors.themeColor}
                    value={[value[1], value[0]]}
                    onValueChange={([low, high]) => {
                        console.log("Low:", low, "High:", high);
                        // const lowValue = i18next.language === 'ar' ? low : low
                        // const highValue = i18next.language === 'ar' ? high : high
                        setValue([parseInt(low.toString()), parseInt(high.toString())]);
                        // console.log(parseInt(low), parseInt(high));
                        // // setLow(parseInt(low));
                        // // setHigh(parseInt(high));
                    }}
                />


            </View>
            <View style={{ width: '100%' }}>
                <NIButton type='secondary' onPress={() => {

                    if (i18next.language === 'ar') {
                        setActivePriceFrom(500 - value[1]);
                        setActivePriceTo(500 - value[0])
                    } else {
                        setActivePriceFrom(value[0]);
                        setActivePriceTo(value[1]);
                    }

                    console.log("Selected Price Range: low", 500 - value[1]);
                    console.log("Selected Price Range: high", 500 - value[0]);

                    console.log("EEEEESelected Price Range: low", value[0]);
                    console.log("EEESelected Price Range: high", value[1]);

                    // setActivePrice(`${value[0]}-${value[1]}`);
                    // setActivePrice(value.toFixed(0));
                    // Close the bottom sheet
                    bottomSheetModalRef?.current?.close();
                }}>تفعيل</NIButton>
            </View>
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
        // transform: [{ scaleX: -1 }],
        height: 250,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,

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
        justifyContent: 'space-between',
        paddingHorizontal: 4,
        marginBottom: 4,
    },
    minMaxText: {
        fontSize: 12,
        color: '#000',
    },
});

