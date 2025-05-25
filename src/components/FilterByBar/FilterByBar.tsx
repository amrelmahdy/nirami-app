import React, { act, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Icon, RadioButton } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import FilterByItem from './FilterByItem';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '../BottomSheet/BottomSheet';
import SortBottomSheet from '../../scenes/DepartmentSearch/bottom-sheets/SortBottomSheet';
import BrandBottomSheet from '../../scenes/DepartmentSearch/bottom-sheets/BrandBottomSheet';
import ColorBottomSheet from '../../scenes/DepartmentSearch/bottom-sheets/ColorBottomSheet';
import PriceBottomSheet from '../../scenes/DepartmentSearch/bottom-sheets/PriceBottomSheet';


type Filter = {
    name: Record<string, string>; // or Partial<Record<LanguageCode, string>>
    image: string;
    id: string; 
}

type FilterByBarProps = {
    withBorder?: boolean;
    withBrandFilter?: boolean;
    activeBrands?: string;
    brands?: Filter[];
    setActiveBrands?: (brands: string) => void;
    activeSorting?: string;
    setActiveSorting?: (sorting: string) => void;
    activePrice?: string;   
    setActivePrice?: (price: string) => void;
};


//   activeBrands={activeBrands}
//                     setActiveSorting={setActiveSorting}
//                     activeSorting={activeSorting}   
//                     setActivePrice={setActivePrice}
//                     activePrice={activePrice}


const FilterByBar: React.FC<FilterByBarProps> = ({ withBorder = true, withBrandFilter,activeBrands, brands, setActiveBrands, activePrice, setActivePrice, activeSorting, setActiveSorting }) => {

    const sortBottomSheetRef = useRef<BottomSheetModal>(null);
    const colorBottomSheetRef = useRef<BottomSheetModal>(null);
    const brandBottomSheetRef = useRef<BottomSheetModal>(null);
    const pricsBottomSheetRef = useRef<BottomSheetModal>(null);

    // callbacks
    const filters = [
        {
            type: 'sort',
            label: 'الترتيب',
            sheetRef: sortBottomSheetRef,
            activeSorting: activeSorting,
        },
        {
            type: 'color',
            label: 'اللون',
            sheetRef: colorBottomSheetRef

        },
        {
            type: 'brand',
            label: 'الماركة',
            sheetRef: brandBottomSheetRef,
            activeBrands: activeBrands,
        },
        {
            type: 'price',
            label: 'السعر',
            sheetRef: pricsBottomSheetRef,
            activePrice: activePrice,

        }
    ]

    return (
        <>
            <BottomSheet title='الترتيب علي حسب' onReset={() => setActiveSorting(undefined)} bottomSheetModalRef={sortBottomSheetRef}>
                <SortBottomSheet activeSorting={activeSorting} setActiveSorting={setActiveSorting} bottomSheetModalRef={sortBottomSheetRef} />
            </BottomSheet>

            <BottomSheet title='اللون' bottomSheetModalRef={colorBottomSheetRef}>
                <ColorBottomSheet />
            </BottomSheet>

            <BottomSheet onReset={() => setActiveBrands(undefined)} title='الماركات' bottomSheetModalRef={brandBottomSheetRef}>
                <BrandBottomSheet brands={brands} activeBrands={activeBrands} setActiveBrands={setActiveBrands} brandBottomSheetRef={brandBottomSheetRef} />
            </BottomSheet>

            <BottomSheet title='السعر' onReset={() => setActivePrice(undefined)} bottomSheetModalRef={pricsBottomSheetRef}>
                <PriceBottomSheet activePrice={activePrice} setActivePrice={setActivePrice} bottomSheetModalRef={pricsBottomSheetRef}/>
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
                    renderItem={({ item, index }) => <FilterByItem  withBrandFilter={withBrandFilter} item={item} />}

                />
            </View>
        </>
    );
};

export default FilterByBar;
