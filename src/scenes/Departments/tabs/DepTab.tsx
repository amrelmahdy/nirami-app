import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, RefreshControl } from "react-native";
import ImageBanner from "../../../components/ImageBanner/ImageBanner";
import { getIconUrl } from "../../../assets/icons";
import { Images } from "../../../assets";
// import { FlatList, ScrollView } from "react-native-gesture-handler";
import CategoryCard from "../../../components/CategoryCard/CategoryCard";



function DepTab({ departments, department, refetch }: any) {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        await refetch?.();
        setRefreshing(false);
    }, []);

    return (
        <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>

            <ImageBanner image={{ uri: department.image }} />
            <View style={{ marginTop: 20, direction: 'rtl', marginHorizontal: 15 }}>
                <FlatList
                    scrollEnabled={false}
                    data={department?.categories}
                    numColumns={2}  // Set two columns per row
                    columnWrapperStyle={styles.columnWrapper} // Added style for row
                    keyExtractor={(item, index) => index.toString()} style={{ width: '100%' }}
                    renderItem={({ item, index }) => <CategoryCard category={item} />}

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
    },
    scrollView: {
        // flex: 1,
        // backgroundColor: 'pink',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
})


export default DepTab