import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Icon } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';
import FilterItem from './FilterItem';


type Filter = {
    name: string
}

type FilterBarProps = {
    filters: any;
    activeId: string;
    onItemPress: (id: string) => void;
    withBorder?: boolean
};

const FilterBar: React.FC<FilterBarProps> = ({ filters, activeId, onItemPress, withBorder = true }) => {
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
                renderItem={({ item, index }) => <FilterItem onItemPress={onItemPress} item={item} isActive={item?.id === activeId} />}

            />
        </View>
    );
};

export default FilterBar;
