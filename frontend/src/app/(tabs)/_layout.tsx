import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4F46E5",
        tabBarInactiveTintColor: "#94A3B8",
        tabBarStyle: {
          position: "absolute",
          borderTopWidth: 0.5,
          borderTopColor: "rgba(0, 0, 0, 0.08)",
          elevation: 0,
          backgroundColor: Platform.OS === "ios" ? "transparent" : "#FFFFFF",
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarBackground: () =>
          Platform.OS === "ios" ? (
            <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="albums"
        options={{
          title: "Albums",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "albums" : "albums-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="duplicates"
        options={{
          title: "Duplicates",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "copy" : "copy-outline"}
              size={22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}