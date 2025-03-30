import React from 'react';
import { View } from 'react-native';
import { TextInput  } from 'react-native-paper';
import { Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';

type SearchInputProps = {
    placeholder?: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ placeholder = "البحث ..." }) => {
    return (
        <View style={{ }}>
            <TextInput
                mode='outlined'
                placeholder={placeholder}
                placeholderTextColor="#bebebe"
                style={{ backgroundColor: '#FFF', height: 40, textAlign: 'right' }}
                outlineStyle={{ borderWidth: 1, borderColor: '#bebebe', borderRadius: 10, height: 40 }}
                underlineStyle={{ borderRadius: 0 }}
                right={<TextInput.Icon color='#bebebe' icon={getIconUrl(Images, 'ic_mynaui_search')} />}
            />
        </View>
    );
};

export default SearchInput;
