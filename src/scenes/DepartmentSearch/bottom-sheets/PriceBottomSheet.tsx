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
// import Slider from '@mui/material/Slider';
import Slider, { Range } from 'rc-slider';


type PriceBottomSheetProps = {
    setActivePrice: (price: string) => void;
    activePrice?: string;
    bottomSheetModalRef?: RefObject<BottomSheetModal | null>;
};

const CONSTANTS = {
    MAX_VALUE: 500,
    MIN_VALUE: 17,
    STEP: 400,
    DEFAULT_STEP_RESOLUTION: 100,
} as const;






const PriceBottomSheet: React.FC<PriceBottomSheetProps> = ({
    setActivePrice,
    activePrice,
    bottomSheetModalRef
}) => {
    const [value, setValue] = useState([20, 80]);

    const [multiSliderValue, setMultiSliderValue] = useState([0, 100])

    // const multiSliderValuesChange = (values) => setMultiSliderValue(values)



    return (

        <View style={styles.container}>

            <View style={{}}>
                <View style={[styles.minMaxLabelContainer, {
                    flexDirection: i18next.language === 'ar' ? 'row' : 'row-reverse',
                }]}>
                    <NIText style={styles.minMaxText}>{ }
                        {i18next.language === 'ar' ? toArabicDigits(500) : 500}
                        &nbsp;
                        {t('sar')}
                    </NIText>
                    <NIText style={styles.minMaxText}>
                        {/* {i18next.language === 'ar' ? toArabicDigits(+value.toFixed(0)) : value.toFixed(0)} */}
                        &nbsp;
                        {t('sar')}
                    </NIText>
                    <NIText style={styles.minMaxText}>{
                        i18next.language === 'ar' ? toArabicDigits(17) : 17
                    }
                        &nbsp;
                        {t('sar')}
                    </NIText>
                </View>

                {/* <ScrollView keyboardShouldPersistTaps="handled">
                    <MultiSlider
     sliderLength={200}
 
                        values={[multiSliderValue[0], multiSliderValue[1]]}
                        onValuesChange={multiSliderValuesChange}
                        min={0}
                        max={100}
                        allowOverlap={false}
                        minMarkerOverlapDistance={10}
                    />

                </ScrollView> */}

                {/* <Slider
                    getAriaLabel={() => 'Temperature range'}
                    value={value}
                    onChange={() => setValue(value)}
                    valueLabelDisplay="auto"
                    // getAriaValueText={valuetext}
                /> */}


                <Slider range />
                {/* <Slider
                    style={[styles.slider, {
                        transform: [{ scaleX: i18next.language === 'ar' ? -1 : 1 }]
                    }]}
                    minimumValue={CONSTANTS.MIN_VALUE}
                    maximumValue={CONSTANTS.MAX_VALUE}
                    // value={value}
                    value={value}
                    onValueChange={setValue}
                    tapToSeek
                    inverted
                    minimumTrackTintColor={'#000'}
                    maximumTrackTintColor={'#979EA4'}
                /> */}
            </View>
            <View style={{ width: '100%' }}>
                <NIButton type='secondary' onPress={() => {
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

