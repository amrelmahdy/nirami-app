import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import {
    StyleSheet,
    View,
    ViewComponent
} from 'react-native';
import { FONT_FAMILIES } from '../../assets';
import PageHeader, { PageHeaderProps } from '../../components/PageHeader/PageHeader';




interface NIScreenProps {
    children?: React.ReactNode | undefined;
    title?: string;
    headerProps?: PageHeaderProps;
}



const NIScreen: React.FC<NIScreenProps> = ({ children, title, headerProps  }) => {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <PageHeader headerLabel={title} {...headerProps} />
            {children}
        </View>
    );
}

const styles = StyleSheet.create({

});


export default NIScreen