import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons, Feather } from "@expo/vector-icons";

interface DuplicateItem {
  id: string;
  uri: string;
  size: string;
  sizeInBytes: number;
  isOriginal: boolean;
}

interface DuplicateGroup {
  id: string;
  title: string;
  matchType: "Exact Match" | "Similar Angle" | "Burst Shot";
  items: DuplicateItem[];
}

const INITIAL_DUPLICATES: DuplicateGroup[] = [
  {
    id: "group-1",
    title: "Mountain Vista",
    matchType: "Burst Shot",
    items: [
      {
        id: "p1",
        uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&q=80",
        size: "3.4 MB",
        sizeInBytes: 3400000,
        isOriginal: true,
      },
      {
        id: "p2",
        uri: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&q=80",
        size: "3.1 MB",
        sizeInBytes: 3100000,
        isOriginal: false,
      },
      {
        id: "p3",
        uri: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=500&q=80",
        size: "3.2 MB",
        sizeInBytes: 3200000,
        isOriginal: false,
      },
    ],
  },
  {
    id: "group-2",
    title: "Pet Portrait",
    matchType: "Similar Angle",
    items: [
      {
        id: "p4",
        uri: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&q=80",
        size: "2.6 MB",
        sizeInBytes: 2600000,
        isOriginal: true,
      },
      {
        id: "p5",
        uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
        size: "2.5 MB",
        sizeInBytes: 2500000,
        isOriginal: false,
      },
    ],
  },
  {
    id: "group-3",
    title: "City Architecture",
    matchType: "Exact Match",
    items: [
      {
        id: "p6",
        uri: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80",
        size: "4.1 MB",
        sizeInBytes: 4100000,
        isOriginal: true,
      },
      {
        id: "p7",
        uri: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80",
        size: "4.1 MB",
        sizeInBytes: 4100000,
        isOriginal: false,
      },
    ],
  },
];

export default function DuplicatesScreen() {
  const router = useRouter();
  const [groups, setGroups] = useState<DuplicateGroup[]>(INITIAL_DUPLICATES);

  // Pre-select all non-original duplicates for instant cleanup
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    const defaultSelected: string[] = [];
    INITIAL_DUPLICATES.forEach((group) => {
      group.items.forEach((item) => {
        if (!item.isOriginal) {
          defaultSelected.push(item.id);
        }
      });
    });
    return defaultSelected;
  });

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate total selected storage
  const selectedBytes = groups.reduce((acc, group) => {
    return (
      acc +
      group.items
        .filter((item) => selectedIds.includes(item.id))
        .reduce((sub, item) => sub + item.sizeInBytes, 0)
    );
  }, 0);

  const selectedMb = (selectedBytes / (1024 * 1024)).toFixed(1);

  const handleDelete = () => {
    if (selectedIds.length === 0) return;

    Alert.alert(
      "Delete Selected Photos?",
      `Are you sure you want to permanently remove ${selectedIds.length} duplicate items to recover ~${selectedMb} MB?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // Remove deleted items from groups
            const updatedGroups = groups
              .map((group) => ({
                ...group,
                items: group.items.filter((item) => !selectedIds.includes(item.id)),
              }))
              .filter((group) => group.items.length > 1);

            setGroups(updatedGroups);
            setSelectedIds([]);
            Alert.alert("Success", `Freed ${selectedMb} MB of local storage.`);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Duplicates</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{groups.length} Sets</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.iconButton}
          activeOpacity={0.7}
          onPress={() => router.push("/settings")}
        >
          <Ionicons name="settings-outline" size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {groups.length === 0 ? (
        // Clean Library Empty State
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="checkmark-done-circle" size={54} color="#10B981" />
          </View>
          <Text style={styles.emptyTitle}>All Clean!</Text>
          <Text style={styles.emptySubtitle}>
            No redundant duplicate images or burst shots found in your archive.
          </Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary Banner Card */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconBox}>
              <Ionicons name="sparkles" size={20} color="#4F46E5" />
            </View>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryHeading}>Smart Deduplication</Text>
              <Text style={styles.summarySub}>
                AI selected the sharpest shot in each group. Review and remove copies below.
              </Text>
            </View>
          </View>

          {/* Duplicate Groups List */}
          {groups.map((group) => (
            <View key={group.id} style={styles.groupCard}>
              {/* Group Meta Header */}
              <View style={styles.groupHeader}>
                <View>
                  <Text style={styles.groupTitle}>{group.title}</Text>
                  <Text style={styles.groupSubtitle}>
                    {group.items.length} photos • {group.matchType}
                  </Text>
                </View>
                <View style={styles.matchTypePill}>
                  <Text style={styles.matchTypeText}>{group.matchType}</Text>
                </View>
              </View>

              {/* Photo Items Row */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.photosRow}
              >
                {group.items.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[
                        styles.photoCard,
                        isSelected && styles.photoCardSelected,
                      ]}
                      activeOpacity={0.85}
                      onPress={() => toggleSelect(item.id)}
                    >
                      <Image source={{ uri: item.uri }} style={styles.photoImg} />

                      {/* Best Shot Badge vs Selection Checkmark */}
                      {item.isOriginal ? (
                        <View style={styles.keepBadge}>
                          <Ionicons name="shield-checkmark" size={12} color="#FFFFFF" />
                          <Text style={styles.keepText}>Keep</Text>
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.checkbox,
                            isSelected && styles.checkboxActive,
                          ]}
                        >
                          {isSelected && (
                            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                          )}
                        </View>
                      )}

                      {/* File Size Tag */}
                      <View style={styles.sizeTag}>
                        <Text style={styles.sizeText}>{item.size}</Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      )}

      {/* Persistent Floating Bottom Action Bar */}
      {groups.length > 0 && (
        <View style={styles.bottomBar}>
          <View style={styles.bottomBarInfo}>
            <Text style={styles.bottomBarCount}>
              {selectedIds.length} photos selected
            </Text>
            <Text style={styles.bottomBarSavings}>
              Recover ~{selectedMb} MB
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.deleteButton,
              selectedIds.length === 0 && styles.deleteButtonDisabled,
            ]}
            activeOpacity={0.85}
            onPress={handleDelete}
            disabled={selectedIds.length === 0}
          >
            <Feather name="trash-2" size={18} color="#FFFFFF" />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 120, // Padding so list doesn't get covered by floating footer
  },
  summaryCard: {
    backgroundColor: "#EEF2FF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 16,
  },
  summaryIconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  summarySub: {
    fontSize: 12,
    color: "#475569",
    marginTop: 2,
    lineHeight: 17,
  },
  groupCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.04)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  groupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F172A",
  },
  groupSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 2,
  },
  matchTypePill: {
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  matchTypeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#475569",
  },
  photosRow: {
    flexDirection: "row",
    gap: 10,
  },
  photoCard: {
    width: 118,
    height: 150,
    borderRadius: 14,
    overflow: "hidden",
    position: "relative",
    borderWidth: 2,
    borderColor: "transparent",
  },
  photoCardSelected: {
    borderColor: "#EF4444",
  },
  photoImg: {
    width: "100%",
    height: "100%",
  },
  keepBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#10B981",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  keepText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  checkbox: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
  },
  checkboxActive: {
    backgroundColor: "#EF4444",
    borderColor: "#EF4444",
  },
  sizeTag: {
    position: "absolute",
    bottom: 6,
    left: 6,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  sizeText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  bottomBar: {
    position: "absolute",
    bottom: 74, // Above the tab bar height
    left: 20,
    right: 20,
    backgroundColor: "#0F172A",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 8,
  },
  bottomBarInfo: {
    justifyContent: "center",
  },
  bottomBarCount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  bottomBarSavings: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 1,
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  deleteButtonDisabled: {
    opacity: 0.5,
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  emptyStateContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ECFDF5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 20,
  },
});