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
import FilteredProductsScreen from '../../scenes/DepartmentSearch/FilteredProductsScreen';
import CartScreen from '../../scenes/Cart/CartScreen';
import BrandsScreen from '../../scenes/Brands/BrandsScreen';
import FilteredProductsByBrandScreen from '../../scenes/Brands/FilteredProductsByBrandScreen';
import AccountScreen from '../../scenes/Account/Account';
import ProductsScreen from '../../scenes/Products/ProductsScreen';
import ChooseAddressScreen from '../../scenes/Checkout/ChooseAddressScreen';
import CheckoutDeliveryAddressScreen from '../../scenes/Checkout/ChooseAddressScreen';
import CheckoutScreen from '../../scenes/Checkout/CheckoutScreen';
import AddAddressScreen from '../../scenes/Addresses/AddAddressScreen';
import AddressesScreen from '../../scenes/Addresses/AddressesScreen';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name={NAVIGATION_ROUTES.HOMEPAGE} component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name={NAVIGATION_ROUTES.FAV_LIST} component={FavListScreen} />
        <Stack.Screen options={{ headerShown: false }} name={NAVIGATION_ROUTES.PRODUCT_DETAILS} component={ProductDetailsScreen} />
        <Stack.Screen options={{ headerShown: false }} name={NAVIGATION_ROUTES.PRODUCTS} component={ProductsScreen} />

    </Stack.Navigator>
)


const DepartmentStack = () => (
    <Stack.Navigator>
        <Stack.Screen name={NAVIGATION_ROUTES.DEPARTMENT_SEARCH} options={{ headerShown: false }} component={DepartmentSearchScreen} />
        <Stack.Screen name={NAVIGATION_ROUTES.FILTERED_PRODUCTS} options={{ headerShown: false }} component={FilteredProductsScreen} />
        <Stack.Screen options={{ headerShown: false }} name={NAVIGATION_ROUTES.PRODUCT_DETAILS} component={ProductDetailsScreen} />
    </Stack.Navigator>
)


const CartStack = () => (
    <Stack.Navigator>
        <Stack.Screen name={NAVIGATION_ROUTES.CART} options={{ headerShown: false }} component={CartScreen} />
        <Stack.Screen name={NAVIGATION_ROUTES.FILTERED_PRODUCTS} options={{ headerShown: false }} component={FilteredProductsScreen} />
        <Stack.Screen name={NAVIGATION_ROUTES.ChECKOUT} options={{ headerShown: false }} component={CheckoutScreen} />


    </Stack.Navigator>
)


const BrandsStack = () => (
    <Stack.Navigator>
        <Stack.Screen name={NAVIGATION_ROUTES.BRANDS} options={{ headerShown: false }} component={BrandsScreen} />
        <Stack.Screen name={NAVIGATION_ROUTES.FILTERED_PRODUCTS_BY_BRAND} options={{ headerShown: false }} component={FilteredProductsByBrandScreen} />
    </Stack.Navigator>
)



const AccountStack = () => (
    <Stack.Navigator>
        <Stack.Screen name={NAVIGATION_ROUTES.ACCOUNT} options={{ headerShown: false }} component={AccountScreen} />
        <Stack.Screen name={NAVIGATION_ROUTES.ADDRESSES} options={{ headerShown: false }} component={AddressesScreen} />
        <Stack.Screen name={NAVIGATION_ROUTES.ADD_ADDRESS} options={{ headerShown: false }} component={AddAddressScreen} />

        {/* <Stack.Screen name={NAVIGATION_ROUTES.FILTERED_PRODUCTS} options={{ headerShown: false }} component={FilteredProductsScreen} /> */}
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
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Search" component={DepartmentStack} initialParams={{ icon: 'ic_search' }} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Cart" component={CartStack} initialParams={{ icon: 'ic_famicons_bag_outline' }} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Brands" component={BrandsStack} initialParams={{ icon: 'ic_fluent_tag_regular' }} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Account" component={AccountStack} initialParams={{ icon: 'ic_ph_user_circle_light' }} />



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