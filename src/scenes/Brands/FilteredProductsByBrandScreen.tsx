import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useCallback, useRef, useState } from 'react';
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { FONT_FAMILIES } from '../../assets';
import HomeScreen from '../Home/HomeScreen';
import PageHeader from '../../components/PageHeader/PageHeader';
import SearchInput from '../../components/SearchInput/SearchInput';

import FilterBar from '../../components/FilterBar/FilterBar';
import FilterGroupBar from '../../components/FilterGroupBar/FilterGroupBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterByBar from '../../components/FilterByBar/FilterByBar';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RadioButton } from 'react-native-paper';
import BannerImage from '../../components/BannerImage/BannerImage';
import { useGetBrands } from './brands.hooks';
import { useGetProducts } from '../../hooks/products.hooks';
import i18next from 'i18next';






const FilteredProductsByBrandScreen = ({ route }) => {

    const selectedBrand = route.params.brand;

    const [query, setQuery] = useState("");
    const [activeSorting, setActiveSorting] = useState(); const [activePriceFrom, setActivePriceFrom] = useState(0);
    const [activePriceTo, setActivePriceFromTo] = useState(500);


    const { data: productsData, isError: isOroductsError, isLoading: isProductsLoading, refetch: refetchProducts } = useGetProducts(
        {
            brandId: `${selectedBrand?.id}`,
            sortBy: activeSorting,
            priceFrom: activePriceFrom !== 0 ? `${activePriceFrom}` : undefined,
            priceTo: activePriceTo !== 500 ? `${activePriceTo}` : undefined,
            query: query
        });



    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <PageHeader headerLabel={
                selectedBrand?.name[i18next.language] || selectedBrand?.name['ar']
            } />
            <View style={{ paddingHorizontal: 15, marginVertical: 20, backgroundColor: '#FFF' }}>
                <SearchInput handleQueryChange={setQuery} />
            </View>
            <ScrollView contentContainerStyle={{}}>
                <BannerImage image={selectedBrand.image || 'https://placehold.co/600x600.png'} />

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
                </View>

                <View style={{ flex: 1, direction: 'rtl' }}>
                    <FlatList
                        numColumns={2}  // Set two columns per row
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                        data={productsData?.products}
                        //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid
                        renderItem={({ item, index }) => <ProductCard product={item} />} />

                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

});


export default FilteredProductsByBrandScreen