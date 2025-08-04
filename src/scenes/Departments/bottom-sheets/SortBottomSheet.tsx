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


// if (sortBy === 'isFeatured') {
//     filter.isFeatured = true;
// } else if (sortBy === 'isOnSale') {
//     filter.isOnSale = true;
// } else if (sortBy === 'priceUp') {
//     sort.price = 1;
// } else if (sortBy === 'priceDown') {
//     sort.price = -1;
// } else if (sortBy === 'new') {
//     sort.createdAt = -1;
// }

const SortBottomSheet: React.FC<SortBottomSheetProps> = ({ setActiveSorting, activeSorting, bottomSheetModalRef }) => {

    const [sortBy, setSortBy] = useState(activeSorting || 'isFeatured');

    const [popularity, setpo] = useState(false)

    return (

        <View style={{}}>
            <RadioButton.Group onValueChange={value => { setSortBy(value) }} value={  sortBy  }>
                <RadioButton.Item
                    value="isFeatured"
                    label='الاكثر شعبية'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    mode='android'
                    color="#000"
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="new"
                    label='الجديد'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'
                    mode='android'
                    color="#000"
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="isOnSale"
                    label='العروض'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'

                    mode='android'
                    color="#000"
                    rippleColor="transparent"

                />
                <RadioButton.Item
                    value="priceDown"
                    label='السعر الاعلي الي الاقل'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'

                    mode='android'
                    color="#000"
                    rippleColor="transparent"

                />

                <RadioButton.Item
                    value="priceUp"
                    label='السعر الاقل الي الاعلي'
                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                    status='checked'

                    mode='android'
                    color="#000"
                    rippleColor="transparent"
                />
            </RadioButton.Group>
            <View style={{ width: '100%', paddingHorizontal: 15, marginBottom: 20 }}>
                <NIButton type='secondary' onPress={() => {
                    setActiveSorting(sortBy)
                    bottomSheetModalRef.current?.close()
                }}>تفعيل</NIButton>
            </View>
        </View>
    )
}

export default SortBottomSheet;