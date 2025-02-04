import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import WelcomePage from "../../../components/Welcome";
import ThemeContext from "../../../context/ThemeContext";

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
  },
});
