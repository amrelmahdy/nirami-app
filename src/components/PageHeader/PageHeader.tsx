import React from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONT_FAMILIES, Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Icon } from 'react-native-paper';

export type PageHeaderProps = {
    headerLabel?: string;
    withBorder?: boolean;
    style?: ViewStyle
};

const PageHeader: React.FC<PageHeaderProps> = ({ headerLabel, withBorder = true, style }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            {
                backgroundColor: '#FFF',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: insets.top,
                paddingBottom: 20,
                borderBottomWidth: withBorder ? 1 : 0,
                borderColor: '#bfbfbf',
                paddingHorizontal: 15
            }, style
        ]}>
            <Text style={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'center', fontSize: 18 }}>{headerLabel || ''}</Text>
            <View style={{
                position: 'absolute',
                right: 15,
                top: 0
            }}>
                { 
                    navigationAdapter.canGoBack && <TouchableOpacity onPress={() => navigationAdapter.goBack()}>
                    <Icon source={getIconUrl(Images, 'ic_weui_arrow_outlined')} size={24} />
                </TouchableOpacity>
                }
            </View>
        </View>
    );
};

export default PageHeader;
