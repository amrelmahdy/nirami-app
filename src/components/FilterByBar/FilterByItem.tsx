import React, { RefObject } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Badge, Icon } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import NIText from '../NIText/NIText';
import { BottomSheetModal } from '@gorhom/bottom-sheet';


type Item = {
    type: string;
    label: string;
    sheetRef: RefObject<BottomSheetModal | null>;
    activeBrands: string;
    setActiveBrands: (brands: string) => void;
    activeSorting?: string;
    setActiveSorting: (sorting: string) => void;
    activePrice: string;
    setActivePrice: (price: string) => void;
}

type FilterByItemProps = {
    item: Item;
    isActive?: boolean,
    withBrandFilter?: boolean,

};

const FilterByItem: React.FC<FilterByItemProps> = ({ item, withBrandFilter = true, appliedFilters }) => {



    console.log("appliedFiltersappliedFiltersappliedFiltersappliedFilters>>", appliedFilters);




    if (!withBrandFilter && item.type === 'brand') return null




    const getBorderColor = () => {
        if (item.type === 'brand') {
            return item.activeBrands && item.activeBrands !== "" ? "#000" : "#c2c2c2"
        }
        return "#c2c2c2"
    }

    return (
        <TouchableOpacity
            onPress={() => {
                item?.sheetRef.current?.present()
            }}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: getBorderColor(),
                width: 100,
                marginHorizontal: 5,

                paddingVertical: 7,
                paddingHorizontal: 15,
                borderRadius: 10
            }}>

            <NIText style={{ color: '#000', fontSize: 12, textAlign: "center" }}>
                {item?.label}
            </NIText>





            {
                ((            
                    item.type === 'brand' && appliedFilters?.brandId) ||
                    item.type === 'sort' && appliedFilters?.sortBy ||
                    item.type === 'price' && (appliedFilters?.priceFrom || appliedFilters?.priceTo)) && <View style={{
                        position: 'absolute',
                        backgroundColor: '#ed5565',
                        width: 15,
                        height: 15,
                        borderRadius: 7.5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        left: 3
                    }}>
                    {item.type === 'brand' && appliedFilters?.brandId && <Badge>
                        {item.activeBrands?.trim().split(",").length}
                    </Badge>}
                </View>
            }



        </TouchableOpacity >
    );
};

export default FilterByItem;
