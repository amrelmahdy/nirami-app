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
import { useGetDepartments } from '../../hooks/departments.hooks';
import DepTab from './tabs/DepTab';
import { ActivityIndicator } from 'react-native-paper';



const Tab = createMaterialTopTabNavigator();



const DepartmentsScreen = () => {


    const { data: departmentsList, isLoading: departmentsIsLoading, isError: departmentsIsError, refetch } = useGetDepartments()


    const renderTabs = () => {
        return departmentsList && !departmentsIsLoading && !departmentsIsError && departmentsList?.map((department) => {
            return (
                <Tab.Screen key={department.id} name={department.name.en} options={{ tabBarLabel: department.name.ar, }} component={() => <DepTab department={department} refetch={refetch} />} />
            )
        })
    }



    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>

            <PageHeader headerLabel="الاقسام" withBorder={false} />


            {departmentsIsLoading && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#3f2848" />
            </View>}
            {/* <View style={{ paddingHorizontal: 15, marginVertical: 20, backgroundColor: '#FFF' }}>
                <SearchInput />
            </View> */}

            {departmentsList && !departmentsIsLoading && !departmentsIsError && departmentsList.length && <Tab.Navigator
                initialRouteName={departmentsList ? departmentsList[1].name.en : 'Makeup'}
                screenOptions={{
                    tabBarLabelStyle: {
                        fontSize: 18,
                        fontFamily: FONT_FAMILIES.ALMARAI_REGULAR,
                        height: 23
                    },
                    // tabBarItemStyle: { width: 100 },
                    // tabBarStyle: { backgroundColor: 'powderblue' },
                }}
            >
                {renderTabs()}
            </Tab.Navigator>}
        </View>
    );
}

const styles = StyleSheet.create({

});

export default DepartmentsScreen;