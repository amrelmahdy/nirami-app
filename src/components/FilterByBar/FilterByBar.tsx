import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Icon, RadioButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import FilterItem from './FilterItem';
import FilterByItem from './FilterByItem';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '../BottomSheet/BottomSheet';
import SortBottomSheet from '../../scenes/DepartmentSearch/bottom-sheets/SortBottomSheet';
import BrandBottomSheet from '../../scenes/DepartmentSearch/bottom-sheets/BrandBottomSheet';
import ColorBottomSheet from '../../scenes/DepartmentSearch/bottom-sheets/ColorBottomSheet';
import PriceBottomSheet from '../../scenes/DepartmentSearch/bottom-sheets/PriceBottomSheet';


type Filter = {
    name: string
}

type FilterByBarProps = {
    withBorder?: boolean
};

const FilterByBar: React.FC<FilterByBarProps> = ({ withBorder = true }) => {

    const sortBottomSheetRef = useRef<BottomSheetModal>(null);
    const colorBottomSheetRef = useRef<BottomSheetModal>(null);
    const brandBottomSheetRef = useRef<BottomSheetModal>(null);
    const pricsBottomSheetRef = useRef<BottomSheetModal>(null);

    // callbacks
    const filters = [
        {
            type: 'sort',
            label: 'الترتيب حسب',
            sheetRef: sortBottomSheetRef
        },
        {
            type: 'color',
            label: 'اللون',
            sheetRef: colorBottomSheetRef

        },
        {
            type: 'brand',
            label: 'الماركة',
            sheetRef: brandBottomSheetRef

        },
        {
            type: 'price',
            label: 'السعر',
            sheetRef: pricsBottomSheetRef

        }
    ]

    return (
        <>
            <BottomSheet title='الترتيب علي حسب' bottomSheetModalRef={sortBottomSheetRef}>
                <SortBottomSheet />
            </BottomSheet>

            <BottomSheet title='اللون' bottomSheetModalRef={colorBottomSheetRef}>
               <ColorBottomSheet />
            </BottomSheet>

            <BottomSheet title='الماركات' bottomSheetModalRef={brandBottomSheetRef}>
                <BrandBottomSheet />
            </BottomSheet>

            <BottomSheet title='السعر' bottomSheetModalRef={pricsBottomSheetRef}>
                <PriceBottomSheet />
            </BottomSheet>

            <View style={{
                backgroundColor: '#FFF',
                justifyContent: 'center',
                alignItems: 'center',
                // marginTop: insets.top,
                paddingBottom: 20,
                // borderBottomWidth: withBorder ? 1 : 0,
                // borderColor: '#bfbfbf',
                // paddingHorizontal: 15,
                direction: 'rtl'
            }}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    data={filters}
                    keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                    renderItem={({ item, index }) => <FilterByItem item={item} />}

                />
            </View>
        </>
    );
};

export default FilterByBar;
