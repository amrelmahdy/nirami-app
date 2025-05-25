import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Icon } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import NIText from '../NIText/NIText';


type Item = {
    name: string;
    image: string;
    id: string;
}

type FilterItemProps = {
    item: Item;
    isActive?: boolean;
    onItemPress: (id: string) => void;
    // onItemPress: (id: string) => void;
};

const FilterItem: React.FC<FilterItemProps> = ({ item, onItemPress, isActive = true }) => {

    return (
        <TouchableOpacity style={{
            backgroundColor: isActive ? '#3f2848' : '#e5e5e5',
            justifyContent: 'center',
            alignItems: 'center',
            // marginHorizontal: 3,
            paddingVertical: 15,
            paddingHorizontal: 15,
            marginHorizontal: 2
        }}

            onPress={() => {
                onItemPress(item?.id);
                // navigationAdapter.navigate(NAVIGATION_ROUTES.PRODUCTS, { id: item.id })
            }}
        >
            <NIText style={{ color: isActive ? '#FFF' : '#000' }}>{item?.name?.ar}</NIText>
        </TouchableOpacity>
    );
};

export default FilterItem;
