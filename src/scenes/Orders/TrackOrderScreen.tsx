import React, { useEffect, useRef } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView, Text } from "react-native-gesture-handler";
import NavigationAdapter from '../../navigation/NavigationAdapter'
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import { getIconUrl } from "../../assets/icons";
import { FONT_FAMILIES, Images } from "../../assets";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import Carousel, {
  ICarouselInstance,
  Pagination,
} from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { TextInput, Icon, Divider, shadow, ActivityIndicator } from "react-native-paper";
import ProductCard from "../../components/ProductCard/ProductCard";
import PageHeader from "../../components/PageHeader/PageHeader";
import NiScreen from "../../components/NIScreen/NiScreen";
import cartData from './../../stubs/cart.json'
import CartItem from "../../components/CartItem/CartItem";
import NIText from "../../components/NIText/NIText";
import NIButton from "../../components/NIButton/NIButton";
import { useGetCart } from "../../hooks/cart.hooks";
import navigationAdapter from "../../navigation/NavigationAdapter";
import { useGetOrderDetails, useGetOrdres } from "../../hooks/orders.hooks";
import { VerticalStatusProgress } from 'react-native-vertical-status-progress';
import Timeline from './../../components/Timeline/Timeline';
import { mapOrderStatus } from "../../utils/helpers";




type TrackOrderScreenProps = {
    route: {
        params?: {
            orderId: string;
        };
    }
};


function TrackOrderScreen({ route }: TrackOrderScreenProps) {

  // type orderId string

  const { orderId } = route.params as { orderId: string }; // Get the orderId from route params

  const { data: order, isLoading: orderIsLoading, isError: orderIstError, refetch } = useGetOrderDetails(orderId);



  console.log('shipped>>>', order); // "shipping"
  // const insets = useSafeAreaInsets();

  // const carouselRef = useRef(null);
  // const data = [...new Array(6).keys()];
  // const width = Dimensions.get("window").width;
  // const progress = useSharedValue<number>(0);

  const orderTimelineData = [
    // {
    //   title: { content: 'Step 1' },
    //   description: { content: 'Description for step 1' },
    //   time: { content: '9:00 AM' },
    //   lineStyle:{  backgroundColor: '#333', width: 3 },

    // },
    {
      title: {
        content: <NIText>تم الطلب</NIText>,
        style: { fontSize: 16, textAlign: 'right' },

      },
      description: {
        content: <NIText> </NIText>,
        style: { fontSize: 14, textAlign: 'left' },
      },
      time: '6:00 PM',
      // lineStyle: { backgroundColor: '#333', width: 3 },
      active:
        (order?.status && mapOrderStatus(order.status) === 'new') ||
        (order?.status && mapOrderStatus(order.status) === 'processing') ||
        (order?.status && mapOrderStatus(order.status) === 'shipping') ||
        (order?.status && mapOrderStatus(order.status) === 'out_for_delivery') ||
        (order?.status && mapOrderStatus(order.status) === 'delivered')

    },
    {
      title: {
        content: <NIText>جاري الشحن</NIText>,
        style: { fontSize: 16, textAlign: 'right' }
      },
      description: {
        content: <NIText> </NIText>,
        style: { fontSize: 14, textAlign: 'right' },
      },
      time: '6:00 PM',
      active:

        mapOrderStatus(order?.status) === 'shipping' ||
        mapOrderStatus(order?.status) === 'out_for_delivery' ||
        order?.status && mapOrderStatus(order.status) === 'delivered'
    },
    {
      title: {
        content: <NIText>خرج للتوصيل</NIText>,
        style: { fontSize: 16, textAlign: 'right' }
      },
      description: {
        content: <NIText> </NIText>,
        style: { fontSize: 14, textAlign: 'right' },
      },
      time: '6:00 PM',
      active:
        mapOrderStatus(order?.status) === 'out_for_delivery' ||
        mapOrderStatus(order?.status) === 'delivered'

    },
    {
      title: {
        content: <NIText>تم التوصيل</NIText>,
        style: { fontSize: 16, textAlign: 'right' }
      },
      description: {
        content: <NIText> </NIText>,
        style: { fontSize: 14, textAlign: 'right' },
      },
      time: '6:00 PM',
      active: mapOrderStatus(order?.status) === 'delivered'
    }
  ];

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <NiScreen title="متابعة الطلب" style={{ flex: 1, justifyContent: 'center' }}>


      {orderIsLoading && <ActivityIndicator />}

      {order &&
        !orderIsLoading &&
        !orderIstError &&
        order.items
        &&
        <>
          <View style={{ marginHorizontal: 35, paddingVertical: 20, }}>
            <NIText style={styles.header}>تتبع الطلب</NIText>
          </View>

          <View style={styles.container}>
            <Timeline
              timeContainerStyle={{ display: 'none' }}
              contentContainerStyle={{
                // shadowOffset: { width: I18nManager.isRTL ? 8 : -8, height: 0 },
                shadowColor: "transparent",
                // shadowOpacity: 0.2,
              }}
              data={orderTimelineData}
              separator
              timeStyle={styles.timeStyle}
              titleStyle={styles.titleStyle}
              descriptionStyle={styles.descriptionStyle}
              // lineColor="yellow"

              iconStyle={{ backgroundColor: '#333' }}
              isRtl={true} // 👈 Important
              // iconContainerStyle={{ color: 'red' }}
              //lineStyle={{ height: 1, backgroundColor: 'red' }}
              eventStyle={{
                // backgroundColor: '#fff',
                // borderRadius: 8,
                // padding: 10,
                // marginVertical: 5,
                // ...shadow(2),
              }}
            />

          </View>
          <Divider style={{ marginVertical: 0 }} />
        </>
      }
    </NiScreen>

    // <>
    //     {/* <SafeAreaView style={{ borderBottomWidth: 1, borderColor: '#bfbfbf', paddingTop: 0, paddingBottom: 0, paddingHorizontal: 15  }}> */}
    //     {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: insets.top, paddingBottom: 20,borderBottomWidth: 1, borderColor: '#bfbfbf',  paddingHorizontal: 15 }}>
    //             <View></View>
    //             <Text style={{ fontFamily: FONT_FAMILIES.ALMARAI_BOLD }}>المفضلة</Text>
    //             <View>
    //                 <TouchableOpacity onPress={() => NavigationAdapter.goBack()}>
    //                     <Icon source={getIconUrl(Images, 'ic_weui_arrow_outlined')} size={24} />
    //                 </TouchableOpacity>
    //             </View>
    //         </View> */}

    //     <PageHeader headerLabel="المفضلة" />
    //     {/* </SafeAreaView> */}
    //     <ScrollView style={{}}>

    //         <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 15, marginBottom: 50 }}>
    //             <FlatList
    //                 numColumns={2}  // Set two columns per row
    //                 keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
    //                 data={products}
    //                 //contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}  // Add padding around the grid

    //                 renderItem={({ item, index }) => <ProductCard product={item} />} />
    //         </View>
    //     </ScrollView>
    // </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    direction: 'rtl', // 👈 Important for layout
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'right',
    height: 25
  },
  timeStyle: {
    fontSize: 12,
    color: '#888',
    textAlign: 'left', // still left to match timeline alignment
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#333'
  },
  descriptionStyle: {
    fontSize: 14,
    color: 'blue',
    textAlign: 'right',
  },
});
export default TrackOrderScreen