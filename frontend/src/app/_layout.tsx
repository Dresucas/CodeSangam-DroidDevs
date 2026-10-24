import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "ios_from_right",
          contentStyle: { backgroundColor: "#FFFFFF" },
        }}
      >
  <Stack.Screen name="index" />
<Stack.Screen name="onboarding" />
<Stack.Screen name="permissions" />
<Stack.Screen name="(tabs)" />
<Stack.Screen name="gallery" />
<Stack.Screen name="photo/[id]" options={{ animation: "fade" }} />
<Stack.Screen name="settings" />
      </Stack>
    </>
  );
}