import React, { useEffect, useRef } from 'react';
import { BackHandler, Button, View } from 'react-native';
import { NavigationContainer, NavigationContainerRef, useNavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationAdapterImpl from './NavigationAdapter';
import NAVIGATION_ROUTES from './NavigationRoutes';
import { Text } from 'react-native-gesture-handler';
import SplashScreen from '../scenes/Splash/SplashScreen';
import BottomTabBar from './BottomTabNavigator/BottomTabNavigator';
import ChooseLanguage from '../scenes/ChooseLanguage/ChooseLanguage';
import OtpScreen from '../scenes/Auth/otp/OtpScreen';
import LoginOrRegister from '../scenes/Auth/LoginOrRegister/LoginOrRegisterScreen';

const Stack = createStackNavigator();

export const noHeaderOptions = {
    options: { headerShown: false },
};

export const noHeaderWithNoTransitionOptions = {
    options: { headerShown: false, cardStyleInterpolator: () => ({}) },
};






const AuthStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name={NAVIGATION_ROUTES.LOGIN_OR_REGISTER}
            component={LoginOrRegister}
            {...noHeaderOptions}
        />

        <Stack.Screen
            name={NAVIGATION_ROUTES.OTP}
            component={OtpScreen}
            {...noHeaderOptions}
        />
    </Stack.Navigator>
)


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
                        name={NAVIGATION_ROUTES.AUTH}
                        component={AuthStack}
                        {...noHeaderOptions}
                    />

                    <Stack.Screen
                        name={NAVIGATION_ROUTES.BOTTOM_TAB_BAR}
                        component={BottomTabBar} />


                    {/* <Stack.Screen
                        name={NAVIGATION_ROUTES.HOMEPAGE}
                        component={HomeScreen}
                        {...noHeaderOptions}
                    /> */}
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
