import React, { useRef, useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { Icon } from "react-native-paper";
import NIText from "../../../components/NIText/NIText";
import NIButton from "../../../components/NIButton/NIButton";
import { getIconUrl } from "../../../assets/icons";
import { FONT_FAMILIES, Images } from "../../../assets";



const Tab = createMaterialTopTabNavigator();


type ChangeAddressProps = {
    onNext?: () => void;
};

function ChangeAddress({ onNext }: ChangeAddressProps) {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const animation = useRef(new Animated.Value(0)).current;

    const contentHeight = 200; // adjust to actual content height

    const toggleCollapse = () => {
        Animated.timing(animation, {
            toValue: isCollapsed ? contentHeight : 0,
            duration: 300,
            useNativeDriver: false, // must be false for height animation
        }).start();
        setIsCollapsed(!isCollapsed);
    };

    const renderTabs = () => {
        return (
            <>
                <Tab.Screen key={'department.id6'} name={'tab1'} options={{ tabBarLabel: 'جميع انحاء المملكة', }} component={() =>
                    <View style={{ flex: 1, padding: 15, backgroundColor: '#FFF' }}>
                        <NIText style={{ fontWeight: 'bold' }}>الشحن إلى المملكة العربية السعودية</NIText>
                        <NIText>مدة الشحن 2-5 ايام عمل</NIText>
                        <NIText>25 ريال للطلبات التي تقل عن 500 ر.س</NIText>
                        <NIText>مجانا للطلبات التي تزيد عن 500 ر.س</NIText>
                    </View>} />
                <Tab.Screen key={'department.id'} name={'tab2'} options={{ tabBarLabel: 'الرياض', }} component={() =>
                    <View style={{ flex: 1, padding: 10, backgroundColor: '#FFF' }}>
                        <NIText style={{ fontWeight: 'bold' }}>الشحن من مدينة الرياض</NIText>
                        <NIText>مدة الشحن 1-2 ايام عمل</NIText>
                        <NIText>25 ريال للطلبات التي تقل عن 500 ر.س</NIText>
                        <NIText>مجانا للطلبات التي تزيد عن 500 ر.س</NIText>
                    </View>} />
            </>
        )
    }

    return (
        <View style={{ flex: 1, paddingHorizontal: 0, width: '100%', justifyContent: 'space-between', backgroundColor: '#FFF' }}>
            <View style={{ borderWidth: 10, borderColor: "#f8f8f8" }}>
                <TouchableOpacity onPress={toggleCollapse} style={styles.header}>
                    <View style={{ flex: 1 }}>
                        <Icon
                            source={getIconUrl(Images, isCollapsed ? 'ic_arrow_down_outlined' : 'ic_arrow_up_outlined')}
                            size={15}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <NIText style={{ height: 20 }}>تفاصيل الشحن</NIText>
                    </View>
                    <View style={{ flex: 1 }} />
                </TouchableOpacity>

                <Animated.View style={{ height: animation, overflow: 'hidden' }}>
                    <Tab.Navigator
                        initialRouteName={'tab1'}
                        screenOptions={{
                            tabBarLabelStyle: {
                                fontSize: 15,
                                fontFamily: FONT_FAMILIES.ALMARAI_REGULAR,
                                height: 23
                            },
                            // tabBarContentContainerStyle: {
                            //     backgroundColor: 'powderblue',
                            // },
                            // tabBarStyle: {
                            //     backgroundColor: '#FFF',
                            // },

                            // tabBarItemStyle: { width: 100 },
                            //tabBarStyle: { backgroundColor: 'powderblue' },
                            tabBarIndicatorStyle: {
                                backgroundColor: '#000',
                                height: 1,
                            },
                        }}
                    >
                        {renderTabs()}
                    </Tab.Navigator>
                </Animated.View>
            </View>


            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 15, }}>
                    <NIText type='light' style={{ fontSize: 23, height: 25, marginTop: 20 }}>عنوان التوصيل</NIText>
                </View>

                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', borderWidth: 1, borderColor: '#efefef', marginHorizontal: 15, borderRadius: 10, marginVertical: 10, overflow: 'hidden' }}>
                    <View style={{ padding: 15, backgroundColor: '#FFF' }}>

                        <NIText type='light' style={{ fontSize: 15 }}>Miss Ghaida Alsharef</NIText>
                        <NIText type='light' style={{ fontSize: 15 }}>+966540521583</NIText>
                        <NIText type='light' style={{ fontSize: 15 }}>الشافعي</NIText>
                    </View>
                    <View style={{ padding: 15 }}>
                        <TouchableOpacity >
                            <NIText style={{ fontSize: 15, color: '#79777f' }}>تعديل العنوان</NIText>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>


            <View style={{ padding: 15, backgroundColor: '#FFF' }}>
                <NIButton style={{ marginBottom: 10 }} onPress={() => {
                    //navigationAdapter.navigate(NAVIGATION_ROUTES.ChECKOUT)
                }}>إضافة عنوان جديد</NIButton>

                <NIButton type='secondary' onPress={() => {
                    onNext?.();
                }}>المراجعة والدفع</NIButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: "#000",
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#FFF',
        // marginBottom: 10,
        direction: 'rtl',
    }
});

export default ChangeAddress;
