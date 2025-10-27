import React, { useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Alert,
    Image,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {
    ThemedText as Text,
    ThemedButton,
} from "@/components";
import {
    BorderRadius,
    FontSizes,
    FontWeights,
    Layout,
    FontFamilies,
} from "@/constants/theme";
import { useThemeColor } from "@/hooks/use-theme-color";

type DietType =
    | "MEDITERRANEAN"
    | "VEGAN"
    | "VEGETARIAN"
    | "PESCATARIAN"
    | "FLEXITARIAN"
    | "KETO"
    | "PALEO"
    | "LOW_CARB"
    | "LOW_FAT"
    | "HIGH_PROTEIN"
    | "WHOLE30"
    | "INTERMITTENT_FASTING"
    | "DAIRY_FREE"
    | "GLUTEN_FREE";

const dietTypes: {
    id: DietType;
    label: string;
    imageUrl: string;
}[] = [
        {
            id: "MEDITERRANEAN",
            label: "Mediterranean",
            imageUrl: "https://www.figma.com/api/mcp/asset/6c46de14-8d38-4e4e-946f-4903f65451fc",
        },
        {
            id: "KETO",
            label: "Ketogenic",
            imageUrl: "https://www.figma.com/api/mcp/asset/19c0ebdb-2d27-4c03-82f2-e4a2a6cd67c9",
        },
        {
            id: "VEGAN",
            label: "Vegan",
            imageUrl: "https://www.figma.com/api/mcp/asset/951d0bbe-6f67-4229-8fb1-78b8979ebca8",
        },
        {
            id: "VEGETARIAN",
            label: "Vegetarian",
            imageUrl: "https://www.figma.com/api/mcp/asset/201080e0-b30d-4117-be61-1f96fe035e24",
        },
        {
            id: "PALEO",
            label: "Paleo",
            imageUrl: "https://www.figma.com/api/mcp/asset/11f1fcdc-e9c1-4667-83a2-1e142ab332cf",
        },
        {
            id: "GLUTEN_FREE",
            label: "Gluten-Free",
            imageUrl: "https://www.figma.com/api/mcp/asset/d5c0c8e5-aa7c-4d28-a36a-dbc0348f19e8",
        },
        {
            id: "DAIRY_FREE",
            label: "Dairy-Free",
            imageUrl: "https://www.figma.com/api/mcp/asset/66426869-6b32-4122-9667-1f5215cff5cf",
        },
        {
            id: "LOW_CARB",
            label: "Low-Carb",
            imageUrl: "https://www.figma.com/api/mcp/asset/828c6f9f-5212-47d7-8115-f2249fbb432c",
        },
        {
            id: "WHOLE30",
            label: "Whole30",
            imageUrl: "https://www.figma.com/api/mcp/asset/ba5572fd-8d63-4429-837d-04e1ef0c088f",
        },
        {
            id: "PESCATARIAN",
            label: "Pescatarian",
            imageUrl: "https://www.figma.com/api/mcp/asset/6c46de14-8d38-4e4e-946f-4903f65451fc",
        },
        {
            id: "FLEXITARIAN",
            label: "Flexitarian",
            imageUrl: "https://www.figma.com/api/mcp/asset/951d0bbe-6f67-4229-8fb1-78b8979ebca8",
        },
        {
            id: "LOW_FAT",
            label: "Low-Fat",
            imageUrl: "https://www.figma.com/api/mcp/asset/ba5572fd-8d63-4429-837d-04e1ef0c088f",
        },
        {
            id: "HIGH_PROTEIN",
            label: "High-Protein",
            imageUrl: "https://www.figma.com/api/mcp/asset/11f1fcdc-e9c1-4667-83a2-1e142ab332cf",
        },
        {
            id: "INTERMITTENT_FASTING",
            label: "Intermittent Fasting",
            imageUrl: "https://www.figma.com/api/mcp/asset/828c6f9f-5212-47d7-8115-f2249fbb432c",
        },
    ];

const Step4Screen = () => {
    const [selectedDiets, setSelectedDiets] = useState<DietType[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const backgroundColor = useThemeColor({}, "background");
    const primary = useThemeColor({}, "primary");
    const text = useThemeColor({}, "text");
    const textSecondary = useThemeColor({}, "textSecondary");
    const placeholder = useThemeColor({}, "placeholder");

    const toggleDiet = (dietId: DietType) => {
        if (selectedDiets.includes(dietId)) {
            setSelectedDiets(selectedDiets.filter((id) => id !== dietId));
        } else {
            setSelectedDiets([...selectedDiets, dietId]);
        }
    };

    const filteredDietTypes = dietTypes.filter((diet) =>
        diet.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleContinue = () => {
        // Can proceed without selection (optional field)
        // Complete onboarding and navigate to main app
        router.replace("/(tabs)");
    };

    const handleAISuggest = () => {
        Alert.alert(
            "AI Suggestion",
            "Based on your goals and activity level, we recommend: Mediterranean, High-Protein, and Gluten-Free diets.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Apply",
                    onPress: () => {
                        setSelectedDiets(["MEDITERRANEAN", "HIGH_PROTEIN", "GLUTEN_FREE"]);
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]}>
            <View style={styles.content}>
                {/* Progress Header */}
                <View style={styles.progressHeader}>
                    <Text type="subtitle" style={styles.progressText}>
                        Step 4 of 5
                    </Text>
                </View>

                {/* Title */}
                <View style={styles.titleContainer}>
                    <Text type="title" style={styles.title}>
                        Any Dietary Preferences?
                    </Text>
                    <Text type="subtitle" style={[styles.titleSubtitle, { color: textSecondary }]}>
                        Select one or more options you prefer
                    </Text>
                </View>

                {/* Diet Styles Section */}
                <View style={styles.dietStylesSection}>
                    <Text type="sectionHeader" style={styles.sectionTitle}>
                        Diet Styles
                    </Text>
                </View>

                {/* Search Field */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchField}>
                        <Ionicons name="search" size={18} color={placeholder} />
                        <TextInput
                            placeholder="Search diet styles..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={[styles.searchInput, { color: text }]}
                            placeholderTextColor={placeholder}
                        />
                        {searchQuery.length > 0 ? (
                            <TouchableOpacity onPress={() => setSearchQuery("")}>
                                <Ionicons name="close-circle" size={18} color={placeholder} />
                            </TouchableOpacity>
                        ) : (
                            <Ionicons name="mic" size={18} color={placeholder} />
                        )}
                    </View>
                </View>

                 <ScrollView
                     contentContainerStyle={styles.scrollContent}
                     showsVerticalScrollIndicator={false}
                 >
                     {/* Diet Grid */}
                     <View style={styles.dietGrid}>
                         {filteredDietTypes.map((diet) => {
                             const isSelected = selectedDiets.includes(diet.id);
                             return (
                                 <TouchableOpacity
                                     key={diet.id}
                                     style={styles.dietCard}
                                     onPress={() => toggleDiet(diet.id)}
                                     activeOpacity={0.7}
                                 >
                                     <View style={styles.dietImageContainer}>
                                         <Image
                                             source={{ uri: diet.imageUrl }}
                                             style={styles.dietImage}
                                             resizeMode="cover"
                                         />
                                         
                                     </View>
                                     <View style={styles.dietLabelContainer}>
                                         <Text style={[styles.dietLabel, { color: text }]}>
                                             {diet.label}
                                         </Text>
                                     </View>
                                     {isSelected && (
                                             <View style={[styles.selectedBadge, { backgroundColor: "#fff" }]}>
                                                 <View style={[styles.checkmarkCircle, { backgroundColor: primary }]}>
                                                     <Ionicons name="checkmark" size={14} color="#fff" />
                                                 </View>
                                             </View>
                                         )}
                                 </TouchableOpacity>
                             );
                         })}
                     </View>

                     {/* AI Suggestion Link */}
                     <TouchableOpacity
                         style={styles.aiSuggestionContainer}
                         onPress={handleAISuggest}
                         activeOpacity={0.7}
                     >
                         <Text
                             type="sectionHeader"
                             style={[styles.aiSuggestionText, { color: textSecondary }]}
                         >
                             I am not sure suggest for me
                         </Text>
                     </TouchableOpacity>
                 </ScrollView>


                {/* Continue Button */}
                <View style={[styles.footer, { backgroundColor }]}>
                    <ThemedButton
                        type="primary"
                        title="Next"
                        onPress={handleContinue}
                        style={styles.continueButton}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    progressHeader: {
        alignItems: "center",
        paddingVertical: Layout.spacing.md,
    },
    progressText: {
        letterSpacing: -0.34,
    },
     scrollContent: {
         paddingBottom: 120,
     },
    titleContainer: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 4,
    },
    title: {
        letterSpacing: -0.56,
        marginBottom: Layout.spacing.xs,
    },
    titleSubtitle: {
        lineHeight: 20,
        letterSpacing: -0.075,
    },
    dietStylesSection: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 4,
    },
    sectionTitle: {
        letterSpacing: -0.44,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    searchField: {
        backgroundColor: "rgba(37, 126, 79, 0.09)",
        borderRadius: 360,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 13,
        paddingVertical: 10.5,
        gap: 8,
    },
    searchInput: {
        flex: 1,
        fontFamily: FontFamilies.regular,
        fontSize: FontSizes.lg,
        lineHeight: 23,
        padding: 0,
    },
    dietGrid: {
        paddingHorizontal: 16,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "flex-start",
    },
    dietCard: {
        width: 108,
        alignItems: "center",
        gap: 8,
        position: "relative",
    },
    dietImageContainer: {
        width: 90,
        height: 90,
        borderRadius: 54,
        overflow: "hidden",
        
    },
    dietImage: {
        width: 90,
        height: 90,
    },
    selectedBadge: {
        position: "absolute",
        top: 2,
        right: 7.5,
        borderRadius: 15,
        padding: 3,
    },
    checkmarkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    dietLabelContainer: {
        width: "100%",
        alignItems: "center",
    },
    dietLabel: {
        fontFamily: FontFamilies.medium,
        fontSize: 13,
        textAlign: "center",
    },
    aiSuggestionContainer: {
        alignItems: "center",
        paddingVertical: 16,
        marginTop: 8,
    },
    aiSuggestionText: {
        letterSpacing: -0.36,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: Layout.padding.horizontal,
        paddingBottom: Layout.spacing.xxl,
        paddingTop: Layout.spacing.lg,
    },
    continueButton: {
        width: "100%",
        height: 50,
    },
});

export default Step4Screen;

