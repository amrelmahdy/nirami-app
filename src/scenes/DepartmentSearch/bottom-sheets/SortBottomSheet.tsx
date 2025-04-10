import React, { RefObject, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import { RadioButton } from 'react-native-paper';
import { FONT_FAMILIES } from '../../../assets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import NIButton from '../../../components/NIButton/NIButton';



type SortBottomSheetProps = {
};

const SortBottomSheet: React.FC<SortBottomSheetProps> = ({  }) => {

    const [sortBy, setSortBy] = useState('new');

    const [popularity, setpo] = useState(false)

    return (

        <View style={{}}>
            <RadioButton.Group  onValueChange={value => { console.log("vakl", value) }} value="x">
                <RadioButton.Item
                    value="x"
                    label='الاكثر شعبية'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    mode='android'
                    color="#000"
                    rippleColor="transparent"
                    
                />
                <RadioButton.Item
                    value="first"
                    label='الجديد'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    mode='android'
                    color="#000"
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="first"
                    label='العروض'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                   
                    mode='android'
                    color="#000"
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="first"
                    label='السعر الاعلي الي الاقل'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                   
                    mode='android'
                    color="#000"
                    rippleColor="transparent"

                />

                <RadioButton.Item
                    value="first"
                    label='السعر الاقل الي الاعلي'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                   
                    mode='android'
                    color="#000"
                    rippleColor="transparent"
                />
            </RadioButton.Group>
            <View style={{ width: '100%',  paddingHorizontal: 15, marginBottom: 20 }}>
                <NIButton type='secondary'>تفعيل</NIButton>
            </View>
        </View>
    )
}

export default SortBottomSheet;