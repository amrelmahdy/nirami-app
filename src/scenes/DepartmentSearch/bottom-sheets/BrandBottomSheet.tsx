import React, { RefObject, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import { RadioButton } from 'react-native-paper';
import { FONT_FAMILIES } from '../../../assets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import NIButton from '../../../components/NIButton/NIButton';



type BrandBottomSheetProps = {
};

const BrandBottomSheet: React.FC<BrandBottomSheetProps> = ({ }) => {

    const [sortBy, setSortBy] = useState('1');

    const [popularity, setpo] = useState(false)

    return (

        <View style={{}}>
            <RadioButton.Group onValueChange={value => { console.log("vakl", value) }} value="1">
                <RadioButton.Item
                    value="1"
                    label='ماك'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    mode='android'
                    color='#000'
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="2"
                    label='لوريال'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='unchecked'
                    mode='android'
                    color='#000'
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="3"
                    label='هدي بيوتي'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    onPress={() => { }}
                    mode='android'
                    color='#000'
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="4"
                    label='بيودسرما'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    onPress={() => { }}
                    mode='android'
                    color='#000'
                    rippleColor="transparent"

                />

                <RadioButton.Item
                    value="5"
                    label='ميليبين'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    onPress={() => { }}
                    mode='android'
                    color='#000'
                    rippleColor="transparent"
                />
            </RadioButton.Group>
            <View style={{ width: '100%',  paddingHorizontal: 15, marginBottom: 20 }}>
                <NIButton type='secondary'>تفعيل</NIButton>
            </View>
        </View>
    )
}

export default BrandBottomSheet;