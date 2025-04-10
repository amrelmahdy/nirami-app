import React, { RefObject, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import { RadioButton } from 'react-native-paper';
import { FONT_FAMILIES } from '../../../assets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';



type ColorBottomSheetProps = {
};

const ColorBottomSheet: React.FC<ColorBottomSheetProps> = ({ }) => {

    const [sortBy, setSortBy] = useState('new');

    const [popularity, setpo] = useState(false)

    return (

        <View style={{}}>
            <RadioButton.Group onValueChange={value => { console.log("vakl", value) }} value="x">
                <RadioButton.Item
                    value="x"
                    label='بيج'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    color='#F3E2CD'
                    uncheckedColor='#F3E2CD'
                    // onPress={() => { }}
                    mode='android'
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="first"
                    label='بني'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'

                    color='#693B13'
                    uncheckedColor='#F3E2CD'
                    mode='android'
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="first"
                    label='زهري'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    color='#F6C5DD'
                    uncheckedColor='#F6C5DD'
                    onPress={() => { }}
                    mode='android'
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="first"
                    label='شفاف'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    color='#EEEAEA'
                    uncheckedColor='#EEEAEA'
                    onPress={() => { }}
                    mode='android'
                    rippleColor="transparent"

                />

                <RadioButton.Item
                    value="first"
                    label='احمر'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    color='#B61919'
                    uncheckedColor='#B61919'
                    onPress={() => { }}
                    mode='android'
                    rippleColor="transparent"
                />

                <RadioButton.Item
                    value="first"
                    label='ابيض'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    color='#FFF'
                    uncheckedColor='#000'
                    onPress={() => { }}
                    mode='android'
                    rippleColor="transparent"
                />
            </RadioButton.Group>
        </View>
    )
}

export default ColorBottomSheet;