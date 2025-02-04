import React, { useContext } from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import theme from "../styles/Colors";
import ThemeContext from "../context/ThemeContext";

type LoadingProps = {
  visible: boolean;
};

const Loading = ({ visible }: LoadingProps) => {
  const theme = useContext(ThemeContext);
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={[
          styles.container,
          { backgroundColor: theme.backgroundSecondary },
        ]}
      >
        <ActivityIndicator size="large" color={theme.textPrimary} />
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
  },
});
