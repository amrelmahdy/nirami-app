
import React from 'react'
import { Image, ImageSourcePropType, ImageStyle, StyleSheet, View } from 'react-native';
import { getIconUrl } from '../../../assets/icons';
import { Images } from '../../../assets';


type TabIconProps = {
    focused: boolean;
    iconName: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, iconName }) => {
    const tintColor = focused ? "#000000" : "#888888";
    const iconSource: ImageSourcePropType | undefined = getIconUrl(Images, iconName);

    return (
        <View style={styles.iconContainer}>
            {/* {focused && <View style={styles.activeBar} />} */}
            {iconSource && (
                <Image source={iconSource} style={[styles.icon, { tintColor } as ImageStyle]} />
            )}
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

export default TabIcon