import React, { useCallback, useEffect, useRef, useState } from 'react';
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

    // Sync user state with currentUser changes
    useEffect(() => {
        if (currentUser) {
            setUser({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                email: currentUser.email || '',
                phone: currentUser.phone || '',
                dataOfBirth: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : new Date(),
                gender: currentUser.gender || 'male',
            });
        }
    }, [currentUser]);

    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    console.log(activeSections)



    return (
        <NIScreen title={t("about_us")} style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingHorizontal: 20 }}>

                <NIAucordion sections={SECTIONS} />
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

