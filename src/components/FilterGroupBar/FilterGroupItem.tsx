import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
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

type FilterGroupItemProps = {
    item: Item;
    isActive?: boolean
};

const FilterGroupItem: React.FC<FilterGroupItemProps> = ({ item, isActive = true }) => {

    return (
        <TouchableOpacity style={{

            // backgroundColor: isActive ? '#3f2848' : '#e5e5e5',
            // justifyContent: 'center',
            // alignItems: 'center',


            marginHorizontal: 5
            // paddingVertical: 15,
            // paddingHorizontal: 15
        }}>
            <Image
                style={{
                    width: 70, height: 70, borderWidth: 1, borderColor: isActive ? "#000" : "#c2c2c2", borderRadius: 35,
                    overflow: 'hidden',
                    marginBottom: 5
                }}
                source={{ uri: item.image }}
            //resizeMode={'cover'}
            />
            <NIText style={{ color: '#000', height: 20, fontSize: 12, textAlign: "center" }}>{item?.name}</NIText>
        </TouchableOpacity>
    );
};

export default FilterGroupItem;
