import React from "react";
import { StyleSheet, Text, View } from "react-native";

/**
 *  The main application component for expo
 * @returns The rendered application component.
 */
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
});
