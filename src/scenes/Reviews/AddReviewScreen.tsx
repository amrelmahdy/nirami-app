import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { FONT_FAMILIES, Images } from '../../assets';
import HomeScreen from '../Home/HomeScreen';
import PageHeader from '../../components/PageHeader/PageHeader';
import SearchInput from '../../components/SearchInput/SearchInput';

import FilterBar from '../../components/FilterBar/FilterBar';
import FilterGroupBar from '../../components/FilterGroupBar/FilterGroupBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterByBar from '../../components/FilterByBar/FilterByBar';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Checkbox, Icon, RadioButton } from 'react-native-paper';
import BannerImage from '../../components/BannerImage/BannerImage';
import { Product, useAddProductReview, useGetProducts } from '../../hooks/products.hooks';
import i18next from 'i18next';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIconUrl } from '../../assets/icons';
import NIScreen from '../../components/NIScreen/NiScreen';
import NIText from '../../components/NIText/NIText';
import DatePicker from 'react-native-date-picker';
import { useGetCurrentUser } from '../../hooks/user.hooks';
import NIButton from '../../components/NIButton/NIButton';
import { updateUser } from '../../api/auth.api';
import { Rating } from 'react-native-ratings';
import navigationAdapter from '../../navigation/NavigationAdapter';



type ProfileScreenProps = {
    route: {
        params?: {
            // emailOrPhone?: string;
            // type?: number; 
        };
    }
};

const AddReviewScreen = ({ route }: ProfileScreenProps) => {
    const { product } = route.params as { product: Product }; // Get the orderId from route params

    const addReview = useAddProductReview();

    const [review, setReview] = useState({
        rating: 0,
        review: '',
        showName: true
    });

    const insets = useSafeAreaInsets();



    const handleSendReview = async () => {
        // try {
        //    const res = await addReview.mutateAsync({ productId: product.id, review });
        //     if (res) {
        //        // navigationAdapter.pop();
        //     }

        // } catch (error: any) {
        //     console.log("Error sending review:", error);
        // }

        addReview.mutate({
            productId: product.id, review
        }, {
            onSuccess: (data) => {
                // setAddress({
                //     name: "",
                //     phone: "",
                //     deliveryAddress: "",
                //     location: {
                //         lat: 0,
                //         lng: 0,
                //         displayName: "",
                //     },
                //     isDefault: false,
                // })
                // setLocationBottomSheetRef?.current?.close();
                setReview(
                    {
                        rating: 0,
                        review: '',
                        showName: true
                    }
                )
                navigationAdapter.pop();
            },
            onError: (error) => {
                console.error("Error updating address:", error);
            }
        })

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={[
                {
                    flexDirection: 'row',
                    backgroundColor: '#FFF',
                    // justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: insets.top,
                    paddingBottom: 20,
                    //borderBottomWidth: withBorder ? 1 : 0,
                    borderColor: '#bfbfbf',
                    paddingHorizontal: 15
                }
            ]}>

                <View style={{ flex: 3 }}>
                    <NIText style={{ fontSize: 17 }}> {product?.name[i18next.language as 'ar' | 'en']}</NIText>
                </View>





                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Image source={{ uri: product.productCardImage }} style={{ width: 50, height: 50 }} />
                </View>


                <View style={{
                    flex: 1,
                    alignItems: 'flex-end'
                    // position: 'absolute',
                    // right: 15,
                    // top: 0
                }}>
                    {
                        navigationAdapter.canGoBack && <TouchableOpacity onPress={() => navigationAdapter.goBack()}>
                            <Icon source={getIconUrl(Images, 'ic_weui_arrow_outlined')} size={24} />
                        </TouchableOpacity>
                    }
                </View>
            </View>

            <View style={{ flex: 1, padding: 20, justifyContent: 'space-between' }}>
                <Rating
                    type='custom'
                    imageSize={60}
                    //showRating
                    onFinishRating={(val: number) => {
                        setReview(prev => ({ ...prev, rating: val }))
                    }}
                    style={{ paddingVertical: 0, alignItems: 'center', marginBottom: 20 }}
                    //readonly
                    ratingColor='#000000'
                    startingValue={0}
                    tintColor="#FFF"
                    ratingBackgroundColor="#bebebe"
                    ratingTextColor="red"
                    fractions={1}
                />

                <View>
                    <NIText style={{ marginBottom: 15, fontSize: 16 }}>التقييم</NIText>
                    <TextInput
                        style={{
                            height: 200,
                            width: '100%',
                            borderColor: '#ccc',
                            backgroundColor: "#F5F4F4",
                            // borderWidth: 1,
                            borderRadius: 10,
                            padding: 10,
                            textAlignVertical: 'top',
                            fontFamily: FONT_FAMILIES.ALMARAI_REGULAR
                        }}
                        onChangeText={text => setReview(prev => ({ ...prev, review: text }))}
                        placeholder="اكتب تقييمك"
                        multiline
                        
                        numberOfLines={4}
                        textAlign="right"
                    />
                </View>

                <View style={{ marginVertical: 10 }}>
                    <Checkbox.Item
                        status={review.showName ? 'checked' : 'unchecked'}
                        onPress={() => setReview({ ...review, showName: !review.showName })}
                        // key={index}
                        label="أسمح بظهور أسمي في التقييمات"
                        labelStyle={{ fontFamily: FONT_FAMILIES.ALMARAI_LIGHT, textAlign: 'right' }}
                        color='#000'
                        uncheckedColor='#000'
                        mode='android'
                        rippleColor="transparent"

                        style={{ marginVertical: 0, paddingVertical: 0, paddingHorizontal: 0 }}
                        theme={{ colors: { primary: '#000' } }}

                    />
                </View>

                <View style={{ width: '100%' }}>
                    <NIButton type='primary' onPress={handleSendReview}>إرسال</NIButton>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

});


export default AddReviewScreen