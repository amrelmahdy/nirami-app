import React from 'react';
import { View, TextInput, ImageBackground, StyleSheet, Image } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { Images } from '../../assets';
import { getIconUrl } from '../../assets/icons';

type ImageBannerProps = {
    placeholder?: string;
    image: any;
};

const ImageBanner: React.FC<ImageBannerProps> = ({ image }) => {
    return (
        <Image source={image} resizeMode="cover" style={styles.image} />
    );
};

const styles = StyleSheet.create({
    image: {
      
        width:'100%',
        height: 300,
        backgroundColor: '#333'
    },
});

export default ImageBanner;
