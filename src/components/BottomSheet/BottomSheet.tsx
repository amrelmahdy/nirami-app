import React, { useCallback } from 'react';
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

interface BottomSheetProps {
    bottomSheetModalRef: RefObject<BottomSheetModal | null>;
    onClose?: () => void;
    children: ReactNode;
    title: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
    bottomSheetModalRef,
    onClose = () => { },
    title,
    children,
}) => {
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
        <BottomSheetModal
            ref={bottomSheetModalRef}
            onChange={handleSheetChanges}
            enableDynamicSizing
            backdropComponent={renderBackdrop}
        >
            <BottomSheetView style={styles.sheetContainer}>
                <View style={styles.header}>
                    <TouchableOpacity>
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
                <View style={styles.content}>
                    {children}
                </View>
            </BottomSheetView>
        </BottomSheetModal>
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
