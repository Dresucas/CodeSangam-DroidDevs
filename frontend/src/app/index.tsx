import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Background Scenic Landscape Wallpaper */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=85",
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Atmospheric Twilight Gradient Overlay */}
      <LinearGradient
        colors={[
          "rgba(15, 23, 42, 0.4)",
          "rgba(107, 33, 168, 0.25)",
          "rgba(15, 23, 42, 0.75)",
        ]}
        locations={[0, 0.55, 1]}
        style={StyleSheet.absoluteFillObject}
      />

      {/* Centered Brand Presentation */}
      <View style={styles.content}>
        {/* Apple-style Frosted Glass Icon Badge */}
        <View style={styles.iconBadge}>
          <Feather name="image" size={38} color="#FFFFFF" />
        </View>

        {/* Title */}
        <Text style={styles.appName}>Mirror Archive</Text>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Your Photos. Organized.{"\n"}Smarter.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width,
    height,
    position: "absolute",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
    zIndex: 10,
  },
  iconBadge: {
    width: 82,
    height: 82,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.18)",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.35)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: -0.5,
    marginBottom: 8,
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.82)",
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: 0.2,
  },
});