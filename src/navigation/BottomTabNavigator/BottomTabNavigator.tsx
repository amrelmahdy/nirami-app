import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../../scenes/Home/HomeScreen'
import { Images } from '../../assets';
import { Image, ImageSourcePropType, ImageStyle, StyleSheet, View } from 'react-native';
import { getIconUrl } from '../../assets/icons';
import NAVIGATION_ROUTES from '../NavigationRoutes';
import TabBar from './TabBar/TabBar';
import FavListScreen from '../../scenes/FavList/FavListScreen';
import ProductDetailsScreen from '../../scenes/ProductDetails/ProductDetailsScreen';
import DepartmentSearchScreen from '../../scenes/DepartmentSearch/DepartmentSearchScreen';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name={NAVIGATION_ROUTES.HOMEPAGE} component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name={NAVIGATION_ROUTES.FAV_LIST} component={FavListScreen} />
        <Stack.Screen options={{ headerShown: false }} name={NAVIGATION_ROUTES.PRODUCT_DETAILS} component={ProductDetailsScreen} />
    </Stack.Navigator>
)


const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Profile"  options={{ headerShown: false }}  component={DepartmentSearchScreen} />
    </Stack.Navigator>
)

type TabIconProps = {
    focused: boolean;
    iconName: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, iconName }) => {
    const tintColor = focused ? "#000000" : "#888888";
    const iconSource: ImageSourcePropType | undefined = getIconUrl(Images, iconName);

    return (
        <View style={styles.iconContainer}>
            {focused && <View style={styles.activeBar} />}
            {iconSource && (
                <Image source={iconSource} style={[styles.icon, { tintColor } as ImageStyle]} />
            )}
        </View>

    );
};


const BottomTabBar = () => {
    return (
        <Tab.Navigator
            tabBar={(props) => <TabBar {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
            })}
        // screenOptions={({ route }) => ({

        //     headerShown: false,
        //     tabBarIcon: ({ focused, color, size }) => {
        //         let iconName
        //         switch (route.name) {
        //             case 'Home':
        //                 iconName = focused ? 'home' : 'home'
        //                 return <TabIcon focused={focused} iconName='ic_ph_user_circle_light' />
        //             case 'Cart':
        //                 iconName = focused ? 'shoppingcart' : 'shoppingcart'
        //                 return <TabIcon focused={focused} iconName='ic_fluent_tag_regular' />
        //             case 'Notifications':
        //                 iconName = focused ? 'notification' : 'notification'
        //                 return <TabIcon focused={focused} iconName='ic_famicons_bag_outline' />
        //             case 'Profile':
        //                 iconName = focused ? 'user' : 'user'
        //                 return <TabIcon focused={focused} iconName='ic_search' />

        //             case 'Settings':
        //                 iconName = focused ? 'setting' : 'setting'
        //                 return <TabIcon focused={focused} iconName='ic_N_Gray' />


        //             default:
        //             //     
        //         }
        //         return <></>
        //         //return <Image source={getIconUrl(Images, 'ic_bottom_bar_home')} />
        //         //return <Icon color={focused ? '#09B6CC' : '#333'} name={iconName} size={30} />
        //     },
        // })}
        // tabBarOptions={{
        //     labelStyle: { display: 'none' },
        //     activeTintColor: 'tomato',
        //     inactiveTintColor: 'gray',
        // }}
        >

            <Tab.Screen options={{ tabBarShowLabel: false }} name="Nirami" component={HomeStack} initialParams={{ icon: 'ic_N_Gray' }} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Search" component={ProfileStack} initialParams={{ icon: 'ic_search' }} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Cart" component={HomeStack} initialParams={{ icon: 'ic_famicons_bag_outline' }} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Brands" component={HomeStack} initialParams={{ icon: 'ic_fluent_tag_regular' }} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Account" component={HomeStack} initialParams={{ icon: 'ic_ph_user_circle_light' }} />



        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: "center",
        width: "100%",
    },
    activeBar: {
        width: 80,
        height: 2,
        backgroundColor: "#000000",
        borderRadius: 2,
        position: "absolute",
        top: -6,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
});

export default BottomTabBar