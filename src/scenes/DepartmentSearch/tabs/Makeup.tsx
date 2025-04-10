import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import ImageBanner from "../../../components/ImageBanner/ImageBanner";
import { getIconUrl } from "../../../assets/icons";
import { Images } from "../../../assets";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import DepartmentCard from "../../../components/DepartmentCard/DepartmentCard";



const departments = [
    {
        name: 'مكياج الوجه',
        image: "https://placehold.co/600x400.png"
    },
    {
        name: 'مكياج الحواجب',
        image: "https://placehold.co/600x400.png"
    },
    {
        name: 'مكياج العيون',
        image: "https://placehold.co/600x400.png"
    },
    {
        name: 'مكياج الخدود',
        image: "https://placehold.co/600x400.png"
    },
    {
        name: 'مكياج الشفاه',
        image: "https://placehold.co/600x400.png"
    },
    {
        name: 'فرش المكياج',
        image: "https://placehold.co/600x400.png"
    }

]


function Makeup() {


    return (
        <ScrollView>
            <ImageBanner image={getIconUrl(Images, 'skin_care_tab_bg')} />
            <View style={{ marginTop: 20 }}>
                <FlatList
                    scrollEnabled={false}
                    data={departments}
                    numColumns={2}  // Set two columns per row
                    keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                    renderItem={({ item, index }) => <DepartmentCard department={item} />}

                />
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    slide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    }
})


export default Makeup