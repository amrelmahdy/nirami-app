import React, { RefObject } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Icon } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import NIText from '../NIText/NIText';
import { BottomSheetModal } from '@gorhom/bottom-sheet';


type Item = {
    name: string;
    sheetRef: RefObject<BottomSheetModal | null>;
}

type FilterByItemProps = {
    item: Item;
    isActive?: boolean
};

const FilterByItem: React.FC<FilterByItemProps> = ({ item }) => {

    return (
        <TouchableOpacity
            onPress={() => {
                item?.sheetRef.current?.present()
            }}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: "#c2c2c2",
                width: 100,
                marginHorizontal: 5,

                paddingVertical: 7,
                paddingHorizontal: 15,
                borderRadius: 10
            }}>

            <NIText style={{ color: '#000', fontSize: 12, textAlign: "center" }}>{item?.label}</NIText>
        </TouchableOpacity>
    );
};

export default FilterByItem;
