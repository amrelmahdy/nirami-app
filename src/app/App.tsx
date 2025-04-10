import React from 'react';
import Navigation from '../navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

function App(): React.JSX.Element {
    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1, }}>
                <BottomSheetModalProvider>
                    <Navigation />
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>

    );
}



export default App;
