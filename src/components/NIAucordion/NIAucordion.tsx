import { StyleSheet, View } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import { Icon } from "react-native-paper";
import { getIconUrl } from "../../assets/icons";
import { FONT_FAMILIES, Images } from "../../assets";
import NIText from "../NIText/NIText";
import { useState } from "react";

const NIAucordion = ({ sections }) => {


    const [activeSections, setActiveSections] = useState([]);


    const updateSections = (activeSections) => {
        setActiveSections(activeSections);
    };

    return (
        <Accordion
            activeSections={activeSections}
            underlayColor="transparent"
            sections={sections}
            renderHeader={(section) => {
                const indexOfActiveSection = sections.findIndex(s => s.key === section.key);


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
        />
    );
}

const styles = StyleSheet.create({

});


export default NIAucordion;