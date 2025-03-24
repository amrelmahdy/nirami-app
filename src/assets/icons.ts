import { ImageResolvedAssetSource, ImageSourcePropType } from "react-native";

export type IconMap = Record<string, ImageSourcePropType>;

export const getIconUrl = (icons: IconMap, iconName: string): ImageSourcePropType | undefined => {
    return icons[iconName];
};