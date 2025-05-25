import React from 'react';
import Navigation from '../navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n from './../i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'



if (__DEV__) {
  import("./../../ReactotronConfig")
}


function App(): React.JSX.Element {

    const { t } = useTranslation();

    const queryClient = new QueryClient();

    return (
        <SafeAreaProvider>
            <GestureHandlerRootView style={{ flex: 1, }}>
                <QueryClientProvider client={queryClient}>
                    <BottomSheetModalProvider>
                        <I18nextProvider i18n={i18n}>
                            <Navigation />
                        </I18nextProvider>
                    </BottomSheetModalProvider>
                </QueryClientProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>

    );
}



export default App;
