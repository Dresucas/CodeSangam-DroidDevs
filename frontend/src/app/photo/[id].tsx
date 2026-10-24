import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const MOCK_PHOTOS: Record<
  string,
  { uri: string; name: string; date: string; size: string; labels: { name: string; score: number }[] }
> = {
  "1": {
    uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&q=85",
    name: "IMG_20261024_095200.jpg",
    date: "24 Oct 2026",
    size: "3.2 MB",
    labels: [
      { name: "Mountain", score: 0.96 },
      { name: "Lake", score: 0.91 },
      { name: "Nature", score: 0.88 },
      { name: "Outdoor", score: 0.74 },
      { name: "Landscape", score: 0.65 },
    ],
  },
  "default": {
    uri: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=1000&q=85",
    name: "IMG_20261024_143200.jpg",
    date: "24 Oct 2026",
    size: "2.4 MB",
    labels: [
      { name: "Dog", score: 0.92 },
      { name: "Animal", score: 0.85 },
      { name: "Outdoor", score: 0.68 },
      { name: "Grass", score: 0.43 },
      { name: "Pet", score: 0.37 },
    ],
  },
};

export default function PhotoDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [isStarred, setIsStarred] = useState(false);
  const [sheetExpanded, setSheetExpanded] = useState(true);

  const photo = (id && MOCK_PHOTOS[id]) ? MOCK_PHOTOS[id] : MOCK_PHOTOS["default"];

  return (
    <View style={styles.container}>
      {/* Full-Screen Photo Canvas */}
      <View style={styles.imageCanvas}>
        <Image
          source={{ uri: photo.uri }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />

        {/* Top Floating App Bar */}
        <SafeAreaView style={styles.topBar}>
          <TouchableOpacity
            style={styles.blurPill}
            onPress={() => router.back()}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.counterBadge}>
            <Text style={styles.counterText}>1 / 2,458</Text>
          </View>

          <TouchableOpacity style={styles.blurPill} activeOpacity={0.75}>
            <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* Screen 6 & 7: Apple-Style Bottom Sheet */}
      <View
        style={[
          styles.bottomSheet,
          !sheetExpanded && styles.bottomSheetCollapsed,
        ]}
      >
        {/* Interactive Drag Handle (tap to expand/collapse) */}
        <TouchableOpacity
          style={styles.handleHitbox}
          onPress={() => setSheetExpanded(!sheetExpanded)}
          activeOpacity={0.7}
        >
          <View style={styles.dragHandle} />
        </TouchableOpacity>

        {/* Sheet Title Bar */}
        <View style={styles.sheetHeader}>
          <TouchableOpacity
            style={styles.titleRow}
            onPress={() => setSheetExpanded(!sheetExpanded)}
            activeOpacity={0.8}
          >
            <Ionicons name="sparkles" size={18} color="#4F46E5" />
            <Text style={styles.sheetTitle}>AI Labels</Text>
            <Ionicons
              name={sheetExpanded ? "chevron-down" : "chevron-up"}
              size={16}
              color="#94A3B8"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsStarred(!isStarred)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isStarred ? "star" : "star-outline"}
              size={22}
              color={isStarred ? "#EAB308" : "#94A3B8"}
            />
          </TouchableOpacity>
        </View>

        {/* Screen 7: AI Labels List (visible when expanded) */}
        {sheetExpanded && (
          <ScrollView
            style={styles.labelsScrollView}
            showsVerticalScrollIndicator={false}
          >
            {photo.labels.map((item, index) => (
              <View key={index} style={styles.labelRow}>
                <View style={styles.tagBadge}>
                  <Ionicons name="add" size={14} color="#0284C7" />
                  <Text style={styles.labelText}>{item.name}</Text>
                </View>
                <Text style={styles.confidenceText}>
                  {item.score.toFixed(2)}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}

        {/* Screen 6: Metadata Footer Bar */}
        <View style={styles.metaFooter}>
          <Text style={styles.fileName}>{photo.name}</Text>
          <Text style={styles.fileDetails}>
            {photo.date} • {photo.size}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  imageCanvas: {
    flex: 1,
    position: "relative",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    zIndex: 10,
  },
  blurPill: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
  },
  counterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
  },
  counterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 22,
    paddingTop: 8,
    paddingBottom: 28,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 10,
  },
  bottomSheetCollapsed: {
    paddingBottom: 20,
  },
  handleHitbox: {
    width: "100%",
    paddingVertical: 6,
    alignItems: "center",
  },
  dragHandle: {
    width: 38,
    height: 4.5,
    backgroundColor: "#CBD5E1",
    borderRadius: 3,
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },
  labelsScrollView: {
    maxHeight: SCREEN_HEIGHT * 0.28,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 9,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F1F5F9",
  },
  tagBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F9FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 4,
  },
  labelText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0284C7",
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748B",
  },
  metaFooter: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  fileName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
  },
  fileDetails: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
});