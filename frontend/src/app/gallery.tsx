import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const SPACING = 2;
const ITEM_SIZE = (width - SPACING * 2) / 3;

const TABS = ["Photos", "Albums", "Recent"];

const PHOTOS_DATA = [
  { id: "1", uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80" },
  { id: "2", uri: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80" },
  { id: "3", uri: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80" },
  { id: "4", uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80" },
  { id: "5", uri: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=500&q=80" },
  { id: "6", uri: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80" },
  { id: "7", uri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80" },
  { id: "8", uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80" },
  { id: "9", uri: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" },
  { id: "10", uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80" },
  { id: "11", uri: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=500&q=80" },
  { id: "12", uri: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&q=80" },
];

export default function GalleryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Photos");

  const renderItem = ({ item }: { item: (typeof PHOTOS_DATA)[0] }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.imageWrapper}
      onPress={() => router.push(`/photo/${item.id}`)}
    >
      <Image source={{ uri: item.uri }} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Photos</Text>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="search-outline" size={22} color="#0F172A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="ellipsis-vertical" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Segmented Filter Pills */}
      <View style={styles.filterBar}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={styles.filterTab}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.filterTabText,
                  isActive && styles.filterTabTextActive,
                ]}
              >
                {tab}
              </Text>
              {isActive && <View style={styles.activeUnderline} />}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 3-Column Photo Grid */}
      <FlatList
        data={PHOTOS_DATA}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.gridContent}
      />

      {/* Floating Scan Action Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        activeOpacity={0.85}
        onPress={() => router.push("/(tabs)/albums")}
      >
        <Ionicons name="scan-outline" size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    padding: 6,
  },
  filterBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    paddingHorizontal: 20,
    marginTop: 4,
  },
  filterTab: {
    paddingVertical: 12,
    marginRight: 24,
    position: "relative",
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#94A3B8",
  },
  filterTabTextActive: {
    color: "#4F46E5",
    fontWeight: "700",
  },
  activeUnderline: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: "#4F46E5",
    borderRadius: 2,
  },
  gridContent: {
    paddingTop: 2,
    paddingBottom: 40,
  },
  imageWrapper: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    marginRight: SPACING,
    marginBottom: SPACING,
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  floatingButton: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#4F46E5",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
});