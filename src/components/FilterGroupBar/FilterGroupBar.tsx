import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Icon } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import FilterGroupItem from './FilterGroupItem';


type Filter = {
    name: string
}

type FilterGroupBarProps = {
    filters: Filter[];
    withBorder?: boolean
};

const FilterGroupBar: React.FC<FilterGroupBarProps> = ({ filters, withBorder = true }) => {
    const insets = useSafeAreaInsets();

    return (
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
                renderItem={({ item, index }) => <FilterGroupItem item={item} isActive={item?.id === 1} />}

            />
        </View>
    );
};

export default FilterGroupBar;