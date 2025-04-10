import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Icon } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import NIText from '../ProductCard/NIText/NIText';


type Item = {
    name: string
}

type FilterItemProps = {
    item: Item;
    isActive?: boolean
};

const FilterItem: React.FC<FilterItemProps> = ({ item, isActive = true }) => {

    return (
        <TouchableOpacity style={{
            backgroundColor: isActive ? '#3f2848' :'#e5e5e5' ,
            justifyContent: 'center',
            alignItems: 'center',
            // marginHorizontal: 3,
            paddingVertical: 15,
            paddingHorizontal: 15,
            marginHorizontal: 2

        }}>
            <NIText style={{  color:  isActive ? '#FFF' :'#000' }}>{item?.name}</NIText>
        </TouchableOpacity>
    );
};

export default FilterItem;
