import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Slot } from "expo-router";

const _layout = () => {
  return (
    <View style={styles.container}>
      <Slot />
    </View>
  );
};

export default _layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
