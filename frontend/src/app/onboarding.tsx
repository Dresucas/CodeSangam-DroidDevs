import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function OnboardingScreen() {
  const router = useRouter();

  const features = [
    {
      id: "1",
      icon: <Feather name="image" size={20} color="#4F46E5" />,
      bg: "#EEF2FF",
      title: "Smart Albums",
      description: "Automatically categorize your photos with AI.",
    },
    {
      id: "2",
      icon: <Ionicons name="copy-outline" size={20} color="#0284C7" />,
      bg: "#F0F9FF",
      title: "Find Duplicates",
      description: "Remove similar and exact duplicate images.",
    },
    {
      id: "3",
      icon: <Ionicons name="sparkles-outline" size={20} color="#7C3AED" />,
      bg: "#F5F3FF",
      title: "All in One Place",
      description: "Your gallery, smarter.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Top Hero Graphic */}
        <View style={styles.heroSection}>
          <View style={styles.graphicCircle}>
            <View style={styles.stackedCardBack} />
            <View style={styles.stackedCardFront}>
              <Feather name="image" size={38} color="#4F46E5" />
            </View>
          </View>

          <Text style={styles.heading}>Organize your{"\n"}photos with AI</Text>
        </View>

        {/* Features List */}
        <View style={styles.featureList}>
          {features.map((item) => (
            <View key={item.id} style={styles.featureItem}>
              <View style={[styles.iconPill, { backgroundColor: item.bg }]}>
                {item.icon}
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>{item.title}</Text>
                <Text style={styles.featureDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Primary Action Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => router.push("/permissions")}
        >
          <Text style={styles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 20,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 36,
  },
  graphicCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    position: "relative",
  },
  stackedCardBack: {
    position: "absolute",
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#C7D2FE",
    transform: [{ rotate: "14deg" }, { translateX: 8 }],
  },
  stackedCardFront: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "center",
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  featureList: {
    gap: 24,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconPill: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
    paddingTop: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: "#64748B",
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 28,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: "#FFFFFF",
  },
  primaryButton: {
    backgroundColor: "#4F46E5",
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});