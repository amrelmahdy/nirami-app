import React, { useCallback, useMemo } from 'react';
import {
    GestureResponderEvent,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';

import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import type { ReactNode, RefObject } from 'react';
import NIText from '../NIText/NIText';
import { Icon } from 'react-native-paper';
import { getIconUrl } from '../../assets/icons';
import { Images } from '../../assets';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface BottomSheetProps {
    bottomSheetModalRef: RefObject<BottomSheetModal | null>;
    onClose?: () => void;
    onReset?: () => void;
    children: ReactNode;
    title?: string;
    withHeader?: boolean;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
    bottomSheetModalRef,
    onClose = () => { },
    onReset = () => { },
    title,
    withHeader = true,
    children,
}) => {


    // variables
  const snapPoints = useMemo(() => ["25%"], []);


    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const renderBackdrop = useCallback((props: any) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            pressBehavior="close"
        />
    ), []);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
                enableDynamicSizing
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
                enableContentPanningGesture={false} // 👈 optional
            >

                <BottomSheetView  style={styles.sheetContainer}>
                    {withHeader && <View style={styles.header}>
                        <TouchableOpacity onPress={() => {
                            onReset?.();
                            bottomSheetModalRef.current?.close();
                            onClose?.();
                        }}>
                            <NIText>استعادة</NIText>
                        </TouchableOpacity>
                        <NIText>{title}</NIText>
                        <TouchableOpacity onPress={() => {
                            bottomSheetModalRef.current?.close();
                            onClose?.()
                        }}>
                            <Icon source={getIconUrl(Images, 'ic_angle_bottom')} size={15} />
                        </TouchableOpacity>
                    </View>
                    }
                    <View style={styles.content}>
                        {children}
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    sheetContainer: {
        flex: 1,
        zIndex: 100,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 10,
        borderBottomColor: '#f7f7f7',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 10,
        height: 55,
    },
    content: {
        width: '100%',
        paddingBottom: 20,
    },
});

export default BottomSheet;
