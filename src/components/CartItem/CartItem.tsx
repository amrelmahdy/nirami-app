import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Rating } from "react-native-ratings";
import { getIconUrl } from "../../assets/icons";
import { Images } from "../../assets";
import { Icon } from "react-native-paper";
import navigationAdapter from "../../navigation/NavigationAdapter";
import NAVIGATION_ROUTES from "../../navigation/NavigationRoutes";
import NIText from "../NIText/NIText";


type CartItem = {
    id: string,
    name: string,
    image: string,
}


type CartItemProps = {
    item: CartItem
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    return (
        <TouchableOpacity
            style={{
                // flex: 1,
                // borderWidth: 1,
                // borderColor: '#bebebe',
                // borderRadius: 2,
                // overflow: 'hidden',
                // padding: 15,
                marginRight: 15, // Adds spacing between cards
                marginBottom: 20,
                // width: Dimensions.get('screen').width / 2 - 23, // Slightly smaller for better fit in grid 
                // shadowColor: "#000", 
                // shadowOpacity: 0.1, 
                // shadowRadius: 5, 
                // elevation: 5 
            }}
            activeOpacity={0.8} // Slight click effect
            onPress={() => {
                // navigationAdapter.navigate(NAVIGATION_ROUTES.FILTERED_PRODUCTS_BY_BRAND, { brand })
            }}
        >

            <View style={{ flex: 1, paddingVertical: 10, flexDirection: 'row-reverse', borderWidth: 1, borderColor: '#efefef', borderRadius: 10 }}>
                <View style={{ width: "30%", justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 80, height: undefined, aspectRatio: 1, resizeMode: "cover" }}
                    />
                </View>



                <View style={{ width: "70%", justifyContent: 'space-between', paddingHorizontal: 5 }}>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                        <NIText>{item.brand}</NIText>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginBottom: 5 }}>
                            <Icon source={getIconUrl(Images, 'saudi_riyal_symbol')} size={15} />
                            <Text style={{ fontSize: 13, fontWeight: "bold", color: "#000", textAlign: 'right', }}>{item.price}</Text>
                        </View>
                    </View>

                    <View style={{ marginBottom: 5 }}>
                        <NIText>{item.name}</NIText>
                    </View>


                    {item.variant && <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                        <View style={{ width: 10, height: 10, backgroundColor: item.variant.hexCode }} />
                        <NIText style={{ marginRight: 10, height: 20 }}>{item.variant.colorName}</NIText>
                    </View>}



                    <View style={{ justifyContent: 'space-between', flexDirection: 'row-reverse', marginTop: 10, alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
                            <TouchableOpacity style={{ backgroundColor: '#f3f3f3', height: 25, width: 25, padding: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon source={getIconUrl(Images, 'ic_plus')} size={16} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 15, verticalAlign: 'middle', marginHorizontal: 10 }}>0</Text>
                            <TouchableOpacity style={{ backgroundColor: '#f3f3f3', height: 25, width: 25, padding: 15, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon source={getIconUrl(Images, 'ic_minus')} size={16} />
                            </TouchableOpacity>

                        </View>
                        <View style={{}}>
                            <TouchableOpacity>
                                <Icon source={getIconUrl(Images, 'ic_circle_close')} size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default CartItem