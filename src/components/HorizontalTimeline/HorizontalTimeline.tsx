import React, { useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import NiScreen from "../NIScreen/NiScreen";
import NIText from "../NIText/NIText";
import { List } from "react-native-paper";


function Timeline({ steps, disabled = false }) {

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);



    const [activeStep, setActiveStep] = useState(1);
    const totalSteps = steps.length;

    const windowWidth = Dimensions.get("window").width;
    const circleSize = 20;
    const marginBetweenSteps = 16;

    const getLineWidth = () => {
        const totalCircleWidth = circleSize * totalSteps;
        const totalSpacing = marginBetweenSteps * (totalSteps - 1);
        const totalHorizontalPadding = 40;
        const totalLineSpace =
            windowWidth - totalCircleWidth - totalSpacing - totalHorizontalPadding;
        return totalLineSpace / (totalSteps - 1);
    };


    const handleOnPrevious = () => {
        setActiveStep((prev) => Math.max(1, prev - 1))
    };

    const handleOnNext = () => {
        setActiveStep((prev) => Math.min(totalSteps, prev + 1))
    };

    const renderStep = (step: number) => {
        const isActive = activeStep >= step;
        return (
            <View key={step} style={styles.stepWrapper}>
                {step !== 1 && (
                    <View
                        style={[
                            styles.line,
                            { width: getLineWidth(), marginHorizontal: marginBetweenSteps / 30 },
                            isActive && styles.activeLine,
                        ]}
                    />
                )}
                <TouchableOpacity disabled={disabled} onPress={() => setActiveStep(step)} style={styles.circleWrapper}>
                    <View style={[styles.circle, isActive && styles.activeCircle]}>
                        <Text style={[styles.label, isActive && styles.activeLabel]}>{step}</Text>
                    </View>
                    <NIText
                        style={[
                            styles.stepLabel,
                            {
                                left: -(circleSize) - 10,
                                width: circleSize * 4,
                                height: 20,
                                fontSize: 12,
                            },
                        ]}
                    >
                        {steps[step - 1]?.title}
                    </NIText>
                </TouchableOpacity>
            </View>
        );
    };

    const renderContent = () => {
         return steps[activeStep-1].content;
        // return <Text style={styles.card}>{steps[activeStep - 1]?.content}</Text>;
    };

    return (
        <View style={{ flex: 1, paddingHorizontal: 0 }}>
            <View style={styles.container}>

                <View style={styles.stepContainer}>
                    {[...Array(totalSteps)].map((_, idx) => renderStep(idx + 1))}
                </View>
                <View style={styles.contentContainer}>{renderContent()}</View>


                {/* <View style={{ flexDirection: "row", marginTop: 0 }}> */}




                {/* <TouchableOpacity
                            onPress={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                            disabled={activeStep === 1}
                            style={{
                                marginHorizontal: 10,
                                opacity: activeStep === 1 ? 0.5 : 1,
                            }}
                        >
                            <Text>Previous</Text>
                        </TouchableOpacity>



                        <TouchableOpacity
                            onPress={() => setActiveStep((prev) => Math.min(totalSteps, prev + 1))}
                            disabled={activeStep === totalSteps}
                            style={{
                                marginHorizontal: 10,
                                opacity: activeStep === totalSteps ? 0.5 : 1,
                            }}
                        >
                            <Text>Next</Text>
                        </TouchableOpacity> */}



                {/* </View> */}
            </View>
        </View>
    );
}

const circleSize = 20;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",

        // 
    },
    stepContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        justifyContent: "center",
        direction: "rtl",
    },
    stepWrapper: {
        flexDirection: "row",
        alignItems: "center",
        position: "relative",
    },
    circleWrapper: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    circle: {
        width: circleSize,
        height: circleSize,
        borderRadius: circleSize / 2,
        backgroundColor: "#c3c3c3",
        justifyContent: "center",
        alignItems: "center",

    },
    activeCircle: {
        backgroundColor: "#000",
    },
    label: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },
    activeLabel: {
        color: "white",
    },
    line: {
        height: 2,
        backgroundColor: "#c3c3c3",
        zIndex: 0,
    },
    activeLine: {
        backgroundColor: "#000",
    },
    stepLabel: {
        position: "absolute",
        top: circleSize + 6,
        fontSize: 12,
        color: "#333",
        textAlign: "center",
    },
    contentContainer: {
        flex: 1,
        width: "100%",
        marginTop: 30,
        alignItems: "center",
    },
    card: {
        fontSize: 16,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 5,
    },
});

export default Timeline;
