import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { FONT_FAMILIES } from '../../assets';
import HomeScreen from '../Home/HomeScreen';
import PageHeader from '../../components/PageHeader/PageHeader';
import SearchInput from '../../components/SearchInput/SearchInput';
import Makeup from './tabs/Makeup';
import SkinCare from './tabs/SkinCare';



const Tab = createMaterialTopTabNavigator();



export default function DepartmentSearchScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <PageHeader headerLabel="الاقسام" withBorder={false} />
            <View style={{ paddingHorizontal: 15, marginVertical: 20, backgroundColor: '#FFF' }}>
                <SearchInput />
            </View>

            <Tab.Navigator
                initialRouteName='TAB1'
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 18, fontFamily: FONT_FAMILIES.ALMARAI_REGULAR },
                    // tabBarItemStyle: { width: 100 },
                    // tabBarStyle: { backgroundColor: 'powderblue' },
                }}
            >
                <Tab.Screen name='TAB1' options={{ tabBarLabel: 'العناية' }} component={Makeup} />
                <Tab.Screen name='TAB2' options={{ tabBarLabel: 'المكياج' }} component={SkinCare} />
            </Tab.Navigator>
        </View>
    );
}

const styles = StyleSheet.create({

});