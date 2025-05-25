import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useCallback, useRef } from 'react';
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




const filters = [
    {
        id: 1,
        name: 'مكياج الوجه',
        image: "https://placehold.co/100x100.png"
    },
    {
        id: 2,
        name: 'مكياج الحواجب',
        image: "https://placehold.co/100x100.png"
    },
    {
        id: 3,
        name: 'مكياج العيون',
        image: "https://placehold.co/100x100.png"
    },
    {
        id: 4,
        name: 'مكياج الخدود',
        image: "https://placehold.co/100x100.png"
    },
    {
        id: 5,
        name: 'مكياج الشفاه',
        image: "https://placehold.co/100x100.png"
    },
    {
        id: 6,
        name: 'فرش المكياج',
        image: "https://placehold.co/100x100.png"
    }
]


const products = [
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 3.5,
        reviews: [
            {
                value: 5,
                ownerName: "Amr",
                review: "اعجبني جدااااا"
            },
            {
                value: 4.5,
                ownerName: "Ghaidaa",
                review: "خطير اوي"
            },
            {
                value: 1.5,
                ownerName: "Sultan",
                review: "لا معجبنيش خالص"
            }
        ],
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 4.5,
        reviews: [
            {
                value: 5,
                ownerName: "Amr",
                review: "اعجبني جدااااا"
            },
            {
                value: 4.5,
                ownerName: "Ghaidaa",
                review: "خطير اوي"
            },
            {
                value: 1.5,
                ownerName: "Sultan",
                review: "لا معجبنيش خالص"
            }
        ],
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        reviews: [
            {
                value: 5,
                ownerName: "Amr",
                review: "اعجبني جدااااا"
            },
            {
                value: 4.5,
                ownerName: "Ghaidaa",
                review: "خطير اوي"
            },
            {
                value: 1.5,
                ownerName: "Sultan",
                review: "لا معجبنيش خالص"
            }
        ],
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
    {
        name: "آحمر شفاه",
        category: "MAC",
        ratings: 1.5,
        reviews: [
            {
                value: 5,
                ownerName: "Amr",
                review: "اعجبني جدااااا"
            },
            {
                value: 4.5,
                ownerName: "Ghaidaa",
                review: "خطير اوي"
            },
            {
                value: 1.5,
                ownerName: "Sultan",
                review: "لا معجبنيش خالص"
            }
        ],
        price: 133,
        image: "https://placehold.co/600x600.png"

    },
]


const FilteredProductsByBrandScreen = ({ route }) => {

    const selectedBrand = route.params.brand;

    const sortBottomSheetRef = useRef<BottomSheetModal>(null);
    const colorBottomSheetRef = useRef<BottomSheetModal>(null);
    const brandBottomSheetRef = useRef<BottomSheetModal>(null);
    const pricsBottomSheetRef = useRef<BottomSheetModal>(null);

    // callbacks


    console.log("department", selectedBrand)

    return (
        <View style={{ flex: 1, backgroundColor: '#FFF' }}>
            <PageHeader headerLabel={selectedBrand?.name}  />
            <View style={{ paddingHorizontal: 15, marginVertical: 20, backgroundColor: '#FFF' }}>
                <SearchInput />
            </View>
            <ScrollView>
                <BannerImage image='https://placehold.co/600x600.png' />

                <View style={{ marginTop: 20 }}>
                    <FilterByBar withBrandFilter={false} />
                </View>

                <View style={{ flex: 1, paddingHorizontal: 15 }}>
                    <FlatList
                        numColumns={2}  // Set two columns per row
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                        data={products}
                        //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

                        renderItem={({ item, index }) => <ProductCard product={item} />} />
                </View>
            </ScrollView>



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


export default FilteredProductsByBrandScreen