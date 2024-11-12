import React from "react";
import WelcomePage from "../components/Welcome";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import theme from "../styles/Colors";
const AppPage = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <WelcomePage />
    </View>
  );
};

export default AppPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.backgroundSecondary,
  },
});
