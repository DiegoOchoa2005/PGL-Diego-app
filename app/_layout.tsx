import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import ThemeProvider from "../provider/ThemeProvider";
import Toast from "react-native-toast-message";

const AppLayout = () => {
  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Slot />
        <Toast position="bottom" bottomOffset={20} />
      </View>
    </ThemeProvider>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
