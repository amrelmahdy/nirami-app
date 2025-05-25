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
    name: Record<string, string>; // or Partial<Record<LanguageCode, string>>
    image: string;
    id: string;
}

type FilterGroupBarProps = {
    filters: Filter[];
    withBorder?: boolean
};

const FilterGroupBar: React.FC<FilterGroupBarProps> = ({ filters, activeId, onItemPress,withBorder = true }) => {
    const insets = useSafeAreaInsets();
    const defaultFilter: Filter = {
        id: '1',
        name: { ar: 'الكل', en: 'All' },
        image: "https://res.cloudinary.com/diuv22zck/image/upload/v1747924621/MISS-ROSE-All-In-One-Makeup-Kit-Makeup-Kit-for-Women-Full-Kit-Multipurpose-Women-s-Makeup-Sets-Beginners-and-Professionals-Alike-Easy-to-Carry_c3042b44-f2d7-44bc-ac05-68d27af29d30.55ba830b8d7bd5910d578572763c5257_gghyvw.webp"
    };


    if (!filters || filters.length === 0) {
        return null;
    }

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
                data={[defaultFilter, ...filters]}

                keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                renderItem={({ item, index }) => <FilterGroupItem onItemPress={onItemPress} item={item} activeId={activeId} isActive={activeId && (item?.id === activeId)} />}

            />
        </View>
    );
};

export default FilterGroupBar;