import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import ThemeProvider from "../provider/ThemeProvider";

const _layout = () => {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Slot />
      </View>
    </ThemeProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});