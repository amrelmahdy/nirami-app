import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    TextStyle,
    ViewStyle,
    GestureResponderEvent,
} from "react-native";
import { FONT_FAMILIES } from "../../assets";

// Define the button variants
type ButtonType = "primary" | "secondary" | "outline" | "disabled";

interface NIButtonProps {
    children: string;
    type?: ButtonType;
    style?: ViewStyle;
    textStyle?: TextStyle;
    onPress?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
}



const NIButton: React.FC<NIButtonProps> = ({
    children,
    type = "primary",
    style,
    textStyle,
    onPress,
    disabled = false,
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={disabled ? 1 : 0.7}
            disabled={disabled}
            style={[
                styles.base,
                type === "primary" && styles.primary,
                type === "secondary" && styles.secondary,
                type === "outline" && styles.outline,
                type === "disabled" && styles.disabled,
                style,
            ]}
        >
            <Text
                style={[
                    styles.textBase,
                    type === "outline" && styles.textOutline,
                    type === "disabled" && styles.textDisabled,
                    textStyle,
                ]}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
};


// Define styles for different button types
const styles = StyleSheet.create({
    base: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        
    },
    primary: {
        backgroundColor: "#3f2848",
    },
    secondary: {
        backgroundColor: "#000000",
    },
    outline: {
        borderWidth: 1,
        borderColor: "#000000",
        backgroundColor: "transparent",
    },
    disabled: {
        backgroundColor: "#D6D6D6",
    },
    textBase: {
        fontSize: 16,
        height: 20,
        // fontWeight: "bold",
        color: "#FFFFFF",
        fontFamily: FONT_FAMILIES.ALMARAI_REGULAR
    },
    textOutline: {
        color: "#000000"
        },
    textDisabled: {
        color: "#A0A0A0",
    },
});

export default NIButton;
