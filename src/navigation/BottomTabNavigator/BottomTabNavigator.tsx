import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../../scenes/Home/HomeScreen'
import { Images } from '../../assets';
import { Image, ImageSourcePropType, ImageStyle, StyleSheet, View } from 'react-native';
import { getIconUrl } from '../../assets/icons';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
)


const ProfileStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={HomeScreen} />
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

            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home'
                            return <TabIcon focused={focused} iconName='ic_bottom_bar_home' />
                        case 'Cart':
                            iconName = focused ? 'shoppingcart' : 'shoppingcart'
                            return <TabIcon focused={focused} iconName='ic_bottom_bar_home' />
                        case 'Notifications':
                            iconName = focused ? 'notification' : 'notification'
                            return <TabIcon focused={focused} iconName='ic_bottom_bar_home' />
                        case 'Profile':
                            iconName = focused ? 'user' : 'user'
                            return <TabIcon focused={focused} iconName='ic_bottom_bar_home' />

                        case 'Settings':
                            iconName = focused ? 'setting' : 'setting'
                            return <TabIcon focused={focused} iconName='ic_bottom_bar_home' />


                        default:
                        //     
                    }
                    return <></>
                    //return <Image source={getIconUrl(Images, 'ic_bottom_bar_home')} />
                    //return <Icon color={focused ? '#09B6CC' : '#333'} name={iconName} size={30} />
                },
            })}
        // tabBarOptions={{
        //     labelStyle: { display: 'none' },
        //     activeTintColor: 'tomato',
        //     inactiveTintColor: 'gray',
        // }}
        >
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Home" component={HomeStack} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Cart" component={HomeStack} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Notifications" component={HomeStack} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Profile" component={ProfileStack} />
            <Tab.Screen options={{ tabBarShowLabel: false }} name="Settings" component={HomeStack} />
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