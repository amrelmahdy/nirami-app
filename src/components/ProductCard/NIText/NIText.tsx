import React from "react";
import { Text, TextStyle } from "react-native";
import { FONT_FAMILIES } from "../../../assets";

interface NITextProps {
    children: string;
    type?: "bold" | "extraBold" | "light" | "regular";
    style?: TextStyle;
}

// Define available font types
export const fontMap: Record<string, string> = {
    bold: FONT_FAMILIES.ALMARAI_BOLD,
    extraBold: FONT_FAMILIES.ALMARAI_EXTRA_BOLD,
    light: FONT_FAMILIES.ALMARAI_LIGHT,
    regular: FONT_FAMILIES.ALMARAI_REGULAR,
};

const NIText: React.FC<NITextProps> = ({ children, type = fontMap.regular, style, ...props }) => {

    // Set default font family if type is not found
    const fontFamily = fontMap[type] || FONT_FAMILIES.ALMARAI_REGULAR;

    return (
        <Text style={[{ fontFamily, color: "#000", textAlign: "right" }, style]} {...props}>
            {children}
        </Text>
    );
};

export default NIText;
