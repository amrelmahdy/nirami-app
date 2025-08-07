import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useCallback, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
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
import { useGetProducts } from '../../hooks/products.hooks';
import i18next from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIconUrl } from '../../assets/icons';
import navigationAdapter from '../../navigation/NavigationAdapter';




type ProductsScreenProps = {
    route: {
        params?: {
            query?: string;
        };
    }
};


const ProductsScreen = ({ route }: ProductsScreenProps) => {

    const searchQuery = route.params?.query;

    const [query, setQuery] = useState(searchQuery ? searchQuery : ''); // Initialize with the search query if provided"");
    // const [activeSorting, setActiveSorting] = useState(); const [activePriceFrom, setActivePriceFrom] = useState(0);
    // const [activePriceTo, setActivePriceFromTo] = useState(500);


    const { data: productsData, isError: isOroductsError, isLoading: isProductsLoading, refetch: refetchProducts } = useGetProducts(
        {
            // brandId: `${selectedBrand?.id}`,
            // sortBy: activeSorting,
            // priceFrom: activePriceFrom !== 0 ? `${activePriceFrom}` : undefined,
            // priceTo: activePriceTo !== 500 ? `${activePriceTo}` : undefined,
            query: query
        });



    return (
        <ScrollView style={{}}>
            <SafeAreaView style={{ backgroundColor: '#FFF' }}>



                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ flex:  0.2}} />

                    <View style={{ flex:  0.7, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                        <Image source={getIconUrl(Images, 'logo_eng_ar')} /* style={styles.image} */ />
                    </View>


                    <View style={{
                        flex: 0.1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        paddingHorizontal: 20
                    }}>
                        {
                            navigationAdapter.canGoBack && <TouchableOpacity onPress={() => navigationAdapter.goBack()}>
                                <Icon source={getIconUrl(Images, 'ic_weui_arrow_outlined')} size={30} />
                            </TouchableOpacity>
                        }

                    </View>

                </View>


                <View style={{ paddingHorizontal: 15, marginBottom: 20 }}>
                    <SearchInput value={query} handleQueryChange={setQuery} />
                </View>
                {/* <BannerImage image='https://placehold.co/600x600.png' /> */}
                {/* 
                <View style={{ marginTop: 20, flex: 1, overflow: 'hidden' }}>
                    <FilterByBar
                        appliedFilters={productsData?.appliedFilters}
                        withBrandFilter={false}
                        setActiveSorting={setActiveSorting}
                        activeSorting={activeSorting}
                        setActivePriceFrom={setActivePriceFrom}
                        activePriceFrom={activePriceFrom}
                        setActivePriceTo={setActivePriceFromTo}
                        activePriceTo={activePriceTo}
                    />
                </View> */}

                <View style={{ flex: 1, direction: 'rtl' }}>
                    <FlatList
                        numColumns={2}  // Set two columns per row
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                        data={productsData?.products}
                        //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid
                        renderItem={({ item, index }) => <ProductCard product={item} />} />

                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

});


export default ProductsScreen