import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";
import Constants, { AppOwnership } from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

export default function PermissionScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const requestPhotoPermission = async () => {
    setLoading(true);

    try {
      // 1. If inside Expo Go, skip calling the native library to prevent the Android rejection warning
      if (Constants.appOwnership === AppOwnership.Expo) {
        router.replace("/(tabs)");
        return;
      }

      // 2. If in a compiled standalone or development build, request real OS permission
      const { status, canAskAgain } = await MediaLibrary.requestPermissionsAsync(
        false,
        ["photo"]
      );

      if (status === "granted" || status === "limited") {
        router.replace("/(tabs)");
      } else if (!canAskAgain) {
        Alert.alert(
          "Permission Required",
          "Mirror Archive needs photo access. Please enable it in Settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
      } else {
        Alert.alert(
          "Access Denied",
          "Photo library access is required to organize your gallery."
        );
      }
    } catch {
      // Graceful fallback for simulator / non-standard environments
      router.replace("/(tabs)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Centered Graphic */}
        <View style={styles.graphicContainer}>
          <View style={styles.circleBg}>
            <View style={styles.folderWrapper}>
              <Ionicons name="folder" size={64} color="#4F46E5" />
              <View style={styles.shieldBadge}>
                <Ionicons name="shield-checkmark" size={18} color="#10B981" />
              </View>
            </View>
          </View>
        </View>

        {/* Text Section */}
        <View style={styles.textSection}>
          <Text style={styles.heading}>Allow Photo Access</Text>
          <Text style={styles.description}>
            Mirror Archive needs access to your photos to scan and organize them.
            {"\n\n"}
            You can choose limited access if you prefer.
          </Text>
        </View>
      </View>

      {/* Button Actions */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={requestPhotoPermission}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>Allow Access</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.7}
          onPress={() => Linking.openSettings()}
        >
          <Text style={styles.secondaryButtonText}>Manual Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  graphicContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  circleBg: {
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  folderWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  shieldBadge: {
    position: "absolute",
    bottom: -2,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ECFDF5",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textSection: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
  heading: {
    fontSize: 26,
    fontWeight: "800",
    color: "#0F172A",
    letterSpacing: -0.5,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    lineHeight: 22,
  },
  footer: {
    paddingHorizontal: 28,
    paddingBottom: 28,
    gap: 12,
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
  secondaryButton: {
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4F46E5",
  },
});