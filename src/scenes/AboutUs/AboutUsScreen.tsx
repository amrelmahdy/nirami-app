import React, { use, useCallback, useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { useGetProducts } from '../../hooks/products.hooks';
import i18next, { t } from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getIconUrl } from '../../assets/icons';
import NIScreen from '../../components/NIScreen/NiScreen';
import NIText from '../../components/NIText/NIText';
import DatePicker from 'react-native-date-picker';
import { useGetCurrentUser } from '../../hooks/user.hooks';
import Accordion from 'react-native-collapsible/Accordion';
import { Icon } from 'react-native-paper';
import { FONT_FAMILIES, Images } from '../../assets';
import NIAucordion from '../../components/NIAucordion/NIAucordion';
import { useGetAllSettings } from '../../hooks/settings.hooks';



type ProfileScreenProps = {
    route: {
        params?: {
            // emailOrPhone?: string;
            // type?: number; 
        };
    }
};




const AboutUsScreen = ({ route }: ProfileScreenProps) => {

    const [date, setDate] = useState(new Date());

    const { data: settings, isLoading, isError } = useGetAllSettings()

    const SECTIONS = [
        {
            key: "about_nirami",
            title: t("about_nirami"),
            content: t("about_us_description"),
        },
        {
            key: "nirami_story",
            title: t("nirami_story"),
            content: t("nirami_story_description"),
        },
    ]


    const [contentSections, setContentSections] = useState(SECTIONS);



    const [activeSections, setActiveSections] = useState([]);

    const { data: currentUser, isError: currentUserError, isLoading: currentUserIsLoading } = useGetCurrentUser();

    const [open, setOpen] = useState(false)

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dataOfBirth: new Date(),
        gender: 'male',
    });


    useEffect(() => {
        if (settings) {
            const updatedSections = SECTIONS.map(section => {
                if (section.key === 'about_nirami') {
                    return {
                        ...section,
                        content: settings.aboutUs?.[i18next.language] || '',
                        html: true,
                    };
                } else if (section.key === 'nirami_story') {
                    return {
                        ...section,
                        content: settings.ourStory?.[i18next.language] || '',
                        html: true,
                    };
                }
                return section;
            });
            setContentSections(updatedSections);
        }
    }, [settings]);



    return (
        <NIScreen title={t("about_us")} style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>

                <NIAucordion sections={contentSections} />
                {/* <Accordion
                    activeSections={activeSections}
                    sections={SECTIONS}
                    renderHeader={(section) => {
                        const indexOfActiveSection = SECTIONS.findIndex(s => s.key === section.key);


                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, justifyContent: 'space-between' }}>
                                {
                                    indexOfActiveSection === activeSections?.[0] ?
                                        <Icon
                                            source={getIconUrl(Images, 'ic_auc_minus')}
                                            size={15} />
                                        :
                                        <Icon
                                            source={getIconUrl(Images, 'ic_auc_plus')}
                                            size={15} />

                                }
                                <NIText style={{ fontSize: 16, height: 30 }}>{section.title}</NIText>
                            </View>
                        );
                    }}
                    // renderSectionTitle={(section) => <View style={styles.content}>
                    //     <Text>{section.content}</Text>
                    // </View>}
                    renderContent={(section) => <View style={styles.content}>
                        <NIText style={{ lineHeight: 22, fontSize: 16, fontFamily: FONT_FAMILIES.ALMARAI_LIGHT }}>{section.content}</NIText>
                    </View>}
                    onChange={updateSections}
                /> */}
            </View>
        </NIScreen>
    );
}

const styles = StyleSheet.create({

});


export default AboutUsScreen

