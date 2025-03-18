import React, { useEffect, useRef } from 'react';
import { BackHandler, Button, View } from 'react-native';
import { NavigationContainer, NavigationContainerRef, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationAdapterImpl from './NavigationAdapterImpl';
import NAVIGATION_ROUTES from './NavigationRoutes';
import { Text } from 'react-native-gesture-handler';
import SplashScreen from '../scenes/Splash/SplashScreen';
import BottomTabBar from './BottomTabNavigator/BottomTabNavigator';
import ChooseLanguage from '../scenes/ChooseLanguage/ChooseLanguage';

const Stack = createStackNavigator();

export const noHeaderOptions = {
    options: { headerShown: false },
};

export const noHeaderWithNoTransitionOptions = {
    options: { headerShown: false, cardStyleInterpolator: () => ({}) },
};



function HomeScreen() {
    console.log("urrent Screen Name:", NavigationAdapterImpl.getCurrentScreenName())



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title='ddd' onPress={() => {
                NavigationAdapterImpl.navigate(NAVIGATION_ROUTES.SPLASH)
            }} ></Button>
        </View>
    );
}


function Navigation() {

    const setUpRef = (navigatorRef: NavigationContainerRef<ReactNavigation.RootParamList>) => {
        NavigationAdapterImpl.navigator = navigatorRef;
    };



    return (
        <>
            <NavigationContainer
                ref={setUpRef}
                onReady={() => {
                    console.log('Navigation container is ready')
                }}
                onStateChange={(state) => console.log('New state is', state)}

            >

                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen
                        name="Main"
                        component={BottomTabBar} />

                    <Stack.Screen
                        name={NAVIGATION_ROUTES.SPLASH}
                        component={SplashScreen}
                        {...noHeaderOptions}
                    />

                    <Stack.Screen
                        name={NAVIGATION_ROUTES.CHOOSE_LANG}
                        component={ChooseLanguage}
                        {...noHeaderOptions}
                    />

                    <Stack.Screen
                        name={NAVIGATION_ROUTES.HOMEPAGE}
                        component={HomeScreen}
                        {...noHeaderOptions}
                    />

                </Stack.Navigator>


                {/* 
                <Stack.Navigator>
                    <Stack.Screen
            name={NAVIGATION_ROUTES.SPLASH}
            component={SplashScreen}
            initialParams={{
              startSplashEndingAnimation,
            }}
            {...noHeaderOptions}
          />
          <Stack.Screen
            name={NAVIGATION_ROUTES.AUTH}
            component={AuthNavigation}
            {...noHeaderWithNoTransitionOptions}
          />
          <Stack.Screen
            name={NAVIGATION_ROUTES.PRE_APP}
            component={PreAppNavigation}
            {...noHeaderWithNoTransitionOptions}
          />
          <Stack.Screen
            name={NAVIGATION_ROUTES.APP}
            component={AppNavigator}
            {...noHeaderWithNoTransitionOptions}
          />
          <Stack.Screen
            name={NAVIGATION_ROUTES.WEB_VIEW}
            component={WebViewScreen}
            {...noHeaderOptions}
          /> 
                </Stack.Navigator>
                */}
            </NavigationContainer>
        </>
    );
}

// Navigation.propTypes = {
//   theme: PropTypes.shape({
//     colors: PropTypes.objectOf(PropTypes.string),
//   }),
//   startSplashEndingAnimation: PropTypes.func,
// };

export default Navigation;
