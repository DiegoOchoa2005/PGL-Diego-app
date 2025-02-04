import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import theme from "../styles/Colors";

type LoadingProps = {
  visible: boolean;
};

const Loading = ({ visible }: LoadingProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.light.borderColor,
  },
});
