import { View, Platform, StyleSheet } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../../scenes/Home/HomeScreen';
import TabIcon from '../TabIcon/TabIcon';
import { Badge } from 'react-native-paper';
import { useGetCart } from '../../../hooks/cart.hooks';

const TabBar = ({ state, descriptors, navigation }) => {

    const { data: cartData, isLoading: cartDataIsLoading, isError: cartDataIstError, refetch } = useGetCart();


    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: colors.background,
                borderTopWidth: 1,
                borderTopColor: colors.border,
                paddingBottom: Platform.OS === 'ios' ? 20 : 10,
                paddingTop: 10,
                height: 80,
                direction: 'rtl'
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    console.log("route.key", route)

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                console.log("route.params", route.params)

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };


                return (
                    <PlatformPressable
                        key={route.key}
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingVertical: 10,
                        }}
                    >

                        {isFocused && <View style={styles.activeBar} />}
                        {route.name === "Cart" && cartData && !cartDataIsLoading && !cartDataIstError && cartData.items.length > 0 &&
                            <Badge style={{ position: 'absolute', left: 16, top: 7 }}>{
                                cartData.items.length
                            }</Badge>}
                        <TabIcon focused={isFocused} iconName={route.params.icon} />
                        {/* <Text
                            style={{
                                color: isFocused ? colors.primary : colors.text,
                                fontWeight: isFocused ? 'bold' : 'normal',
                                fontSize: 10
                            }}
                        >

                            {label}

                        </Text> */}
                    </PlatformPressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: "center",
        width: "100%",
    },
    activeBar: {
        width: 80,
        height: 1,
        backgroundColor: "#000000",
        borderRadius: 2,
        position: "absolute",
        top: -11,
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
});

export default TabBar;
