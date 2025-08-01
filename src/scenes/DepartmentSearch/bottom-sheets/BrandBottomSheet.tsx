import React, { RefObject, useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from '../../../components/BottomSheet/BottomSheet';
import { RadioButton, Checkbox } from 'react-native-paper';
import { FONT_FAMILIES } from '../../../assets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import NIButton from '../../../components/NIButton/NIButton';
import i18next from 'i18next';
import { Brand } from '../../Brands/brands.hooks';



type BrandBottomSheetProps = {
    brands: Brand[];
    setActiveBrands: (brands: string) => void;
    brandBottomSheetRef: RefObject<BottomSheetModal | null>;
    // onClose?: () => void;
    // children: ReactNode;
};

const BrandBottomSheet: React.FC<BrandBottomSheetProps> = ({ activeBrands, brands, setActiveBrands, brandBottomSheetRef }) => {


    const [filteredBrands, setFilteredBrands] = useState<string[]>([]);

    // Sync filteredBrands with activeBrands each time the sheet is opened
    useEffect(() => {
        if (brandBottomSheetRef?.current) {
            // If the sheet is open, sync filteredBrands with activeBrands
            // You may need to adjust this logic if you have a more explicit open/close state
            setFilteredBrands(
                activeBrands
                    ? activeBrands.split(',').filter(Boolean)
                    : []
            );
        }
    }, [activeBrands, brandBottomSheetRef?.current]);

    const [sortBy, setSortBy] = useState('1');

    const [popularity, setpo] = useState(false)

    console.log("brandsMMMMM", activeBrands?.split(','))

    return (

        <View style={{ paddingHorizontal: 15 }}>


            <View style={{ marginBottom: 10 }}>
                {
                    brands && brands.length && brands.map((item: Brand, index) => {
                        const checked = filteredBrands.includes(item.id);
                        return (
                            <View style={{ marginBottom: 5 }} key={item.id}>
                                <Checkbox.Item
                                    key={index}
                                    label={item?.name[i18next.language as 'en' | 'ar'] || item?.name['ar']}
                                    labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'right' }}
                                    color='#000'
                                    uncheckedColor='#000'
                                    mode='android'
                                    rippleColor="transparent"
                                    onPress={() => {
                                        setFilteredBrands(prev =>
                                            checked
                                                ? prev.filter(id => id !== item.id)
                                                : [...prev, item.id]
                                        );
                                    }}
                                    status={checked ? 'checked' : 'unchecked'}
                                    style={{ marginVertical: 0, paddingVertical: 0, paddingHorizontal: 0 }}
                                    theme={{ colors: { primary: '#000' } }}

                                />
                            </View>
                        )
                    })
                }
            </View>

        
            <View style={{ width: '100%', marginBottom: 20 }}>
                <NIButton type='secondary' onPress={() => {
                    setActiveBrands(filteredBrands.join(','))
                    brandBottomSheetRef.current?.close()
                }}>تفعيل</NIButton>
            </View>
        </View>
    )
}

export default BrandBottomSheet;