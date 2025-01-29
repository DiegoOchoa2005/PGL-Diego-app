import {
  Button,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../styles/Colors";
const screenHeigth = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("window").width;

const Camera = ({ closeCamera }: any) => {
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<boolean>(false);

  const toggleFacing = () =>
    setFacing((face) => (face === "back" ? "front" : "back"));

  const toggleFlash = () => {
    setFlash((flash) => !flash);
  };
  if (!permission?.granted) {
    return (
      <Pressable
        style={styles.PermissionButton}
        onPress={requestCameraPermission}
      >
        <Text style={styles.touchableText}>Permitir cámara</Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.borderButtons}>
        <Pressable onPress={() => toggleFlash()}>
          <Ionicons name={"flash"} size={32} style={styles.iconButton} />
        </Pressable>
        <Pressable onPress={() => toggleFacing()}>
          <Ionicons
            name={"camera-reverse"}
            size={40}
            style={styles.iconButton}
          />
        </Pressable>
        <Pressable onPress={() => closeCamera()}>
          <Entypo
            style={styles.iconButton}
            name="circle-with-cross"
            size={30}
          />
        </Pressable>
      </View>
      <CameraView
        style={styles.camera}
        enableTorch={flash}
        facing={facing}
        mode="picture"
      ></CameraView>
      <View style={styles.borderButtons}>
        <Pressable onPress={() => closeCamera()}>
          <Entypo style={styles.iconButton} name="circle" size={50} />
        </Pressable>
      </View>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  PermissionButton: {
    position: "absolute",
    top: screenHeigth / 1.92,
    left: screenWidth / 4.3,
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    zIndex: 1,
  },
  touchableText: {
    color: theme.light.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
  },
  iconButton: {
    color: "white",
    marginVertical: "auto",
    textAlign: "center",
    padding: 10,
    marginHorizontal: "auto",
  },
  borderButtons: {
    height: 100,
    backgroundColor: theme.light.borderColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cameraTopButtons: {},
});
