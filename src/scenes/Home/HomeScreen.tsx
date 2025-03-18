import React, { useEffect } from "react";
import { Button, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import NavigationAdapterImpl from '../../navigation/NavigationAdapterImpl'
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";

function HomeScreen() {

    useEffect(() => {
        console.log("Current Screen Name: ", NavigationAdapterImpl.getCurrentScreenName())

    })


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button title='HomePage' onPress={() => {
                NavigationAdapterImpl.navigate(NAVIGATION_ROUTES.CHOOSE_LANG)
            }} ></Button>
        </View>
    );
}


export default HomeScreen