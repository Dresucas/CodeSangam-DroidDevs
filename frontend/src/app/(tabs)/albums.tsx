import React from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_GAP = 12;
const CARD_WIDTH = (width - 40 - CARD_GAP) / 2;

interface SmartAlbum {
  id: string;
  name: string;
  count: number;
  coverUri: string;
  categoryIcon: keyof typeof Ionicons.glyphMap;
}

const SMART_ALBUMS: SmartAlbum[] = [
  {
    id: "nature",
    name: "Nature & Travel",
    count: 342,
    coverUri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80",
    categoryIcon: "leaf-outline",
  },
  {
    id: "animals",
    name: "Pets & Animals",
    count: 189,
    coverUri: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
    categoryIcon: "paw-outline",
  },
  {
    id: "architecture",
    name: "Architecture",
    count: 114,
    coverUri: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80",
    categoryIcon: "business-outline",
  },
  {
    id: "food",
    name: "Food & Drinks",
    count: 94,
    coverUri: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    categoryIcon: "restaurant-outline",
  },
  {
    id: "portraits",
    name: "Portraits & People",
    count: 245,
    coverUri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    categoryIcon: "people-outline",
  },
  {
    id: "documents",
    name: "Receipts & Notes",
    count: 67,
    coverUri: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    categoryIcon: "document-text-outline",
  },
];

export default function AlbumsScreen() {
  const router = useRouter();

  const renderAlbumItem = ({ item }: { item: SmartAlbum }) => (
    <TouchableOpacity
      style={styles.albumCard}
      activeOpacity={0.85}
      onPress={() => router.push(`/gallery?filter=${item.id}`)}
    >
      {/* Cover Image Background */}
      <Image source={{ uri: item.coverUri }} style={styles.albumCover} resizeMode="cover" />

      {/* Apple-Style Dusk Gradient */}
      <LinearGradient
        colors={["rgba(15, 23, 42, 0.05)", "rgba(15, 23, 42, 0.8)"]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Top Floating Category Pill */}
      <View style={styles.categoryPill}>
        <Ionicons name={item.categoryIcon} size={14} color="#FFFFFF" />
      </View>

      {/* Bottom Title & Counter */}
      <View style={styles.albumInfo}>
        <Text style={styles.albumTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.albumCount}>{item.count} items</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Smart Albums</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{SMART_ALBUMS.length}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.iconButton} activeOpacity={0.7}>
          <Ionicons name="search-outline" size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* 2-Column Album Grid */}
      <FlatList
        data={SMART_ALBUMS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderAlbumItem}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.gridContent}
        showsVerticalScrollIndicator={false}
      />
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0F172A",
    letterSpacing: -0.5,
  },
  badge: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4F46E5",
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
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
  gridContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 100, // Extra space for floating bottom tab bar
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: CARD_GAP,
  },
  albumCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.25,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
    justifyContent: "space-between",
    padding: 14,
    backgroundColor: "#CBD5E1",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  albumCover: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryPill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  albumInfo: {
    zIndex: 2,
  },
  albumTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.2,
    marginBottom: 2,
  },
  albumCount: {
    fontSize: 12,
    color: "#E2E8F0",
    fontWeight: "500",
  },
});