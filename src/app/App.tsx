import React from 'react';
import Navigation from '../navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useTranslation, I18nextProvider } from 'react-i18next';
import i18n from './../i18n'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import NIText from '../components/NIText/NIText';
import { View } from 'react-native';



if (__DEV__) {
  import("./../../ReactotronConfig")
}


const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  tomatoToast: ({ text1, text2, props }) => (
    <View style={{ height: 60, width: '100%', backgroundColor: 'tomato', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
      <NIText style={{ color: "#FFF" }}>{text1}</NIText>
      <NIText style={{ color: "#FFF" }}>{text2}</NIText>
      {/* <NIText>{props.uuid}</NIText> */}
    </View>
  )
};


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
                            <Toast config={toastConfig}  />
                        </I18nextProvider>
                    </BottomSheetModalProvider>
                </QueryClientProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>

    );
}



export default App;
