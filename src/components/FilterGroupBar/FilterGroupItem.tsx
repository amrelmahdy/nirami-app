import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import NIText from '../NIText/NIText';
import i18next from "i18next";


type Item = {
    name: Record<string, string>; // or Partial<Record<LanguageCode, string>>
    image: string;
    id: string;
}

type FilterGroupItemProps = {
    item: Item;
    activeId: string,
    onItemPress: (id: string) => void;
};

const FilterGroupItem: React.FC<FilterGroupItemProps> = ({ item, activeId = "1", onItemPress }) => {


    const isActive = item?.id === activeId;

    return (
        <TouchableOpacity style={{

            // backgroundColor: isActive ? '#3f2848' : '#e5e5e5',
            // justifyContent: 'center',
            // alignItems: 'center',


            marginHorizontal: 5
            // paddingVertical: 15,
            // paddingHorizontal: 15
        }}

            onPress={() => onItemPress(item.id)}

        >
            <Image
                style={{
                    width: 70, height: 70, borderWidth: 1, borderColor: isActive ? "#000" : "#c2c2c2", borderRadius: 35,
                    overflow: 'hidden',
                    marginBottom: 5
                }}
                source={{ uri: item.image }}
            //resizeMode={'cover'}
            />
            <NIText style={{ color: '#000', height: 20, fontSize: 12, textAlign: "center" }}>{
                item?.name[i18next.language] || item?.name['ar']
            }</NIText>
        </TouchableOpacity>
    );
};

export default FilterGroupItem;
