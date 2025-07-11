import React from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import { useTranslation } from 'react-i18next';

type SearchInputProps = {
    value: string;
    placeholder?: string;
    handleQueryChange?: (query: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, placeholder, handleQueryChange, rest }) => {

    const { t } = useTranslation()

    return (
        <View style={{ direction: 'rtl' }}>
            <TextInput
                value={value}
                onChangeText={text => {
                    handleQueryChange?.(text)
                }}
                mode='outlined'
                placeholder={placeholder ? placeholder : t('what_are_you_looking_for')}
                placeholderTextColor="#bebebe"
                style={{ backgroundColor: '#FFF', height: 40, textAlign: 'right' }}
                contentStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}
                outlineStyle={{ borderWidth: 1, borderColor: '#bebebe', borderRadius: 10, height: 40 }}
                underlineStyle={{ borderRadius: 0 }}
                returnKeyLabel={t('what_are_you_looking_for')}
                returnKeyType="search"
                right={<TextInput.Icon color='#bebebe' icon={getIconUrl(Images, 'ic_mynaui_search')}
                {...rest}

                />}
            />
        </View>
    );
};

export default SearchInput;
