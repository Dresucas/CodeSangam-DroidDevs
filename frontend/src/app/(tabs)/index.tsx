import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Mirror Archive</Text>
        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => router.push("/settings")}
        >
          <Ionicons name="settings-outline" size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Apple Hero Banner Card */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
            }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
          />
          <LinearGradient
            colors={["rgba(15, 23, 42, 0.15)", "rgba(15, 23, 42, 0.75)"]}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.bannerText}>
            <Text style={styles.bannerHeading}>
              Your Photos.{"\n"}Organized.
            </Text>
          </View>
        </View>

        {/* 2-Column Primary Grid */}
        <View style={styles.gridRow}>
          {/* All Photos Card */}
          <TouchableOpacity
            style={[styles.card, styles.gridCard]}
            activeOpacity={0.8}
            onPress={() => router.push("/gallery")}
          >
            <View style={[styles.iconPill, { backgroundColor: "#EEF2FF" }]}>
              <Feather name="image" size={20} color="#4F46E5" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>All Photos</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.countText}>2,458</Text>
                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
              </View>
            </View>
          </TouchableOpacity>

          {/* Smart Albums Card */}
          <TouchableOpacity
            style={[styles.card, styles.gridCard]}
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)/albums")}
          >
            <View style={[styles.iconPill, { backgroundColor: "#ECFDF5" }]}>
              <Ionicons name="folder-outline" size={20} color="#10B981" />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitle}>Smart Albums</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.countText}>12</Text>
                <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Duplicates Full-Width Card */}
        <TouchableOpacity
          style={[styles.card, styles.fullWidthCard]}
          activeOpacity={0.8}
          onPress={() => router.push("/(tabs)/duplicates")}
        >
          <View style={styles.duplicatesLeft}>
            <View style={[styles.iconPill, { backgroundColor: "#F0F9FF" }]}>
              <Ionicons name="copy-outline" size={20} color="#0284C7" />
            </View>
            <View style={{ marginLeft: 14 }}>
              <Text style={styles.cardTitle}>Duplicates</Text>
              <Text style={styles.countText}>48 items found</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
        </TouchableOpacity>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.05)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 4,
  },
  bannerContainer: {
    height: 180,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 22,
    marginBottom: 16,
  },
  bannerText: {
    zIndex: 2,
  },
  bannerHeading: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FFFFFF",
    lineHeight: 28,
  },
  gridRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  gridCard: {
    flex: 1,
    height: 132,
    justifyContent: "space-between",
  },
  iconPill: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cardInfo: {
    marginTop: 12,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  countText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  fullWidthCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  duplicatesLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
});