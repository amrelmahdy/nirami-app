import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
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
import { Icon, RadioButton } from 'react-native-paper';
import BannerImage from '../../components/BannerImage/BannerImage';
import { Product, useGetProducts } from '../../hooks/products.hooks';
import i18next from 'i18next';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { getIconUrl } from '../../assets/icons';
import NIScreen from '../../components/NIScreen/NiScreen';
import NIText from '../../components/NIText/NIText';
import DatePicker from 'react-native-date-picker';
import { useGetCurrentUser } from '../../hooks/user.hooks';
import NIButton from '../../components/NIButton/NIButton';
import { updateUser } from '../../api/auth.api';
import navigationAdapter from '../../navigation/NavigationAdapter';
import { Rating } from 'react-native-ratings';
import ReviewCard from '../../components/ReviewCard/ReviewCard';



type ProfileScreenProps = {
    route: {
        params?: {
            // emailOrPhone?: string;
            // type?: number; 
        };
    }
};

const ReviewsScreen = ({ route }: ProfileScreenProps) => {


    const { product } = route.params as { product: Product }; // Get the orderId from route params


    const insets = useSafeAreaInsets();


    const [date, setDate] = useState(new Date());

    const { data: currentUser, isError: currentUserError, isLoading: currentUserIsLoading } = useGetCurrentUser();

    const [open, setOpen] = useState(false)

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dataOfBirth: new Date(),
        gender: 'male',
    });

    // Sync user state with currentUser changes
    useEffect(() => {
        if (currentUser) {
            setUser({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                dataOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : new Date(),
                gender: currentUser.gender || 'male',
            });
        }
    }, [currentUser]);

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={[
                {
                    flexDirection: 'row',
                    backgroundColor: '#FFF',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: insets.top,
                    paddingBottom: 20,
                    //borderBottomWidth: withBorder ? 1 : 0,
                    borderColor: '#bfbfbf',
                    paddingHorizontal: 15
                }
            ]}>

                <View style={{ flex: 2, alignItems: 'flex-start' }}>
                    <Text style={{ fontFamily: FONT_FAMILIES.ALMARAI_REGULAR, textAlign: 'center', fontSize: 18 }}>{`التقييمات(${product.reviews.length})`}</Text>

                </View>



                <View style={{ direction: 'rtl', flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                    <Rating
                        type='custom'
                        imageSize={18}
                        //showRating
                        onFinishRating={() => { }}
                        style={{ paddingHorizontal: 5, backgroundColor: '#FFF' }}
                        readonly
                        ratingColor='#000000'
                        startingValue={product.averageRating}
                        tintColor="#FFF"
                        ratingBackgroundColor="#bebebe"
                        ratingTextColor="red"
                    />
                </View>

                <View>
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





            <FlatList
                style={{ flex: 1, paddingHorizontal: 15, paddingTop: 10 }}
                data={product.reviews}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => <ReviewCard review={item} />}
                ListEmptyComponent={
                    <NIText style={{ textAlign: 'center', marginTop: 20 }}>
                        لا توجد تقييمات لهذا المنتج بعد
                    </NIText>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({

});


export default ReviewsScreen