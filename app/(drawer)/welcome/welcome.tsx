import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WelcomePage from "../../../components/Welcome";
import theme from "../../../styles/Colors";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <WelcomePage />
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.backgroundSecondary,
  },
});
