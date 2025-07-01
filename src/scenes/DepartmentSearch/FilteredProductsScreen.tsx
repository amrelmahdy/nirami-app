import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { FONT_FAMILIES } from '../../assets';
import HomeScreen from '../Home/HomeScreen';
import PageHeader from '../../components/PageHeader/PageHeader';
import SearchInput from '../../components/SearchInput/SearchInput';
import Makeup from './tabs/Makeup';
import SkinCare from './tabs/SkinCare';
import FilterBar from '../../components/FilterBar/FilterBar';
import FilterGroupBar from '../../components/FilterGroupBar/FilterGroupBar';
import ProductCard from '../../components/ProductCard/ProductCard';
import FilterByBar from '../../components/FilterByBar/FilterByBar';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RadioButton } from 'react-native-paper';
import { useGetDepartments } from '../../hooks/departments.hooks';
import { useGetCategories } from '../../hooks/categories.hooks';
import { useGetGroups } from '../../hooks/groups.hooks';
import { useGetProducts } from '../../hooks/products.hooks';
import { useGetBrands } from '../Brands/brands.hooks';





const FilteredProductsScreen = ({ route }) => {




    const selectedCategory = route.params.category;


    const [activeCategory, setActiveCategory] = useState(selectedCategory.id);
    const [activeGroup, setActiveGroup] = useState("1");
    const [activeBrands, setActiveBrands] = useState();
    const [activeSorting, setActiveSorting] = useState();
    const [activePrice, setActivePrice] = useState();
    const [activePriceFrom, setActivePriceFrom] = useState(0);
    const [activePriceTo, setActivePriceFromTo] = useState(500);



    const { data: categoriesList, isError: isCategoriesError, isLoading: isCategoriesLoading } = useGetCategories({ departmentId: selectedCategory.department });

    const { data: groupsList, isError: isGroupsError, isLoading: isGroupsLoading, refetch: refetchGroups } = useGetGroups({ categoryId: activeCategory });

    const { data: productsData, isError: isProductsError, isLoading: isProductsLoading, refetch: refetchProducts } = useGetProducts({ groupId: activeGroup, categoryId: activeCategory, brandId: activeBrands, sortBy: activeSorting, priceFrom: activePriceFrom !== 0 ? `${activePriceFrom}` : undefined, priceTo:  activePriceTo !== 500 ? `${activePriceTo}` : undefined });

    const { data: brandsList, isError: isBrandsError, isLoading: isBrandsLoading, refetch: refetchBrands } = useGetBrands();



    console.log("productsList", productsData, activeGroup)


    const handleOnSetActiveCategory = (categoryId: string) => {
        setActiveCategory(categoryId);
        setActiveGroup("1");
        //refetchGroups();

        // Fetch groups based on the selected category
        // fetchGroups(categoryId);
    }



    const sortBottomSheetRef = useRef<BottomSheetModal>(null);
    const colorBottomSheetRef = useRef<BottomSheetModal>(null);
    const brandBottomSheetRef = useRef<BottomSheetModal>(null);
    const pricsBottomSheetRef = useRef<BottomSheetModal>(null);

    // callbacks




    // When categories (departments) are fetched
    useEffect(() => {
        if (categoriesList && categoriesList.length > 0) {
            // console.log('Fetched Categories:', categoriesList);

            // Example: auto-select the first category
            //setActiveCategory(categoriesList[0]?.id);


            // You can perform more actions here
        }
    }, [categoriesList]);

    // When groups are fetched
    useEffect(() => {
        if (groupsList && groupsList.length > 0) {
            console.log('Fetched Groups:', groupsList);

            // Example: auto-select the first group
            // setActiveGroup(groupsList ? [0].id);

            // More logic here
        }
    }, [groupsList]);



    console.tron("activeCategory", activeCategory)
    console.tron("activeGroup", activeGroup)


    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <PageHeader headerLabel={selectedCategory?.name?.ar} withBorder={false} />

            <FilterBar onItemPress={handleOnSetActiveCategory} activeId={activeCategory} filters={categoriesList} />

            <FilterGroupBar onItemPress={setActiveGroup} activeId={activeGroup} filters={groupsList} />





            <View>
                <FilterByBar
                    appliedFilters={productsData?.appliedFilters}
                    brands={brandsList}
                    setActiveBrands={setActiveBrands}
                    activeBrands={activeBrands}
                    setActiveSorting={setActiveSorting}
                    activeSorting={activeSorting}
                    setActivePrice={setActivePrice}
                    activePrice={activePrice}
                    setActivePriceFrom={setActivePriceFrom}
                    activePriceFrom={activePriceFrom}
                    setActivePriceTo={setActivePriceFromTo}
                    activePriceTo={activePriceTo}
                />
            </View>

            <View style={{ flex: 1, direction: 'rtl' }}>
                <FlatList
                refreshing={isProductsLoading}
                    onRefresh={refetchProducts}
                    numColumns={2}  // Set two columns per row
                    keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                    data={productsData?.products}
                    contentContainerStyle={{}}  // Add padding around the grid
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => <ProductCard product={item} />} />
            </View>



            {/* <View style={{ paddingHorizontal: 15, marginVertical: 20, backgroundColor: '#FFF' }}>
            <SearchInput />
        </View>

        <Tab.Navigator
            initialRouteName='TAB1'
            screenOptions={{
                tabBarLabelStyle: { fontSize: 18, fontFamily: FONT_FAMILIES.ALMARAI_REGULAR },
                // tabBarItemStyle: { width: 100 },
                // tabBarStyle: { backgroundColor: 'powderblue' },
            }}
        >
            <Tab.Screen name='TAB1' options={{ tabBarLabel: 'العناية' }} component={SkinCare} />
            <Tab.Screen name='TAB2' options={{ tabBarLabel: 'المكياج' }} component={Makeup} />
        </Tab.Navigator> */}
        </View>
    );
}

const styles = StyleSheet.create({

});


export default FilteredProductsScreen