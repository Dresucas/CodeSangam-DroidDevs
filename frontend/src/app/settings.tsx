import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsScreen() {
  const router = useRouter();

  const handleStoragePress = () => {
    Alert.alert(
      "Storage Breakdown",
      "Cached thumbnails: 340 MB\nAI embeddings & tags: 120 MB\nFull archives: 740 MB\n\nTotal: 1.2 GB used"
    );
  };

  const handleScanPreferences = () => {
    Alert.alert(
      "Scan Preferences",
      "Scanning runs locally using on-device models only when plugged into power and connected to Wi-Fi."
    );
  };

  const handleAboutPress = () => {
    Alert.alert("Mirror Archive", "Version 1.0.0 (Build 2026.10)\nBuilt with Expo & React Native.");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Section Header */}
        <Text style={styles.sectionTitle}>App Settings</Text>

        {/* Grouped Apple-Style Card */}
        <View style={styles.groupedCard}>
          {/* Row 1: Storage Usage */}
          <TouchableOpacity
            style={styles.rowItem}
            activeOpacity={0.7}
            onPress={handleStoragePress}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: "#EEF2FF" }]}>
                <Ionicons name="folder-outline" size={18} color="#4F46E5" />
              </View>
              <View style={styles.labelCol}>
                <Text style={styles.rowTitle}>Storage Usage</Text>
                <Text style={styles.rowSubtitle}>1.2 GB used</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Row 2: Scan Preferences */}
          <TouchableOpacity
            style={styles.rowItem}
            activeOpacity={0.7}
            onPress={handleScanPreferences}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: "#F0F9FF" }]}>
                <Ionicons name="wifi-outline" size={18} color="#0284C7" />
              </View>
              <View style={styles.labelCol}>
                <Text style={styles.rowTitle}>Scan Preferences</Text>
                <Text style={styles.rowSubtitle}>Wi-Fi only</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Row 3: About */}
          <TouchableOpacity
            style={styles.rowItem}
            activeOpacity={0.7}
            onPress={handleAboutPress}
          >
            <View style={styles.rowLeft}>
              <View style={[styles.iconBox, { backgroundColor: "#F8FAFC" }]}>
                <Ionicons name="information-circle-outline" size={18} color="#64748B" />
              </View>
              <View style={styles.labelCol}>
                <Text style={styles.rowTitle}>About</Text>
                <Text style={styles.rowSubtitle}>Version 1.0.0</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(0,0,0,0.06)",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 6,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.4,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 12,
    marginLeft: 4,
  },
  groupedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    overflow: "hidden",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  labelCol: {
    justifyContent: "center",
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  rowSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  divider: {
    height: 0.5,
    backgroundColor: "#F1F5F9",
    marginLeft: 66,
  },
});