import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ar from './languages/ar';
import en from './languages/en';
import AsyncStorage from '@react-native-async-storage/async-storage';



// Custom language detector
const languageDetector: any = {
    type: 'languageDetector',
    async: true,
    detect: (callback: (lang: string) => void) => {
        AsyncStorage.getItem('user-language').then((lang) => {
            callback(lang || 'ar');
        });
    },
    init: () => { },
    cacheUserLanguage: (lang: string) => {
        AsyncStorage.setItem('user-language', lang);
    },
};


i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en,
            ar,
        },
        fallbackLng: 'ar',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;