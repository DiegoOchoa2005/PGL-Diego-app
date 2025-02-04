import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../styles/Colors";
import { cameraService } from "../services/cameraService";
import ThemeContext from "../context/ThemeContext";
const screenHeigth = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("window").width;

export type CameraProps = {
  closeCamera: () => void;
  userToken: string;
  setLoading: (loading: boolean) => void;
};

const Camera = ({ userToken, closeCamera, setLoading }: CameraProps) => {
  const theme = useContext(ThemeContext);
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [flash, setFlash] = useState<boolean>(false);

  const toggleFacing = () =>
    setFacing((face) => (face === "back" ? "front" : "back"));

  const toggleFlash = () => {
    setFlash((flash) => !flash);
  };

  const takePicture = async () => {
    try {
      const picture = await cameraRef.current?.takePictureAsync({
        base64: true,
      });
      if (picture != null && picture.base64 != null) {
        await cameraService.saveImage(userToken, picture);
        setLoading(true);
        closeCamera();
        setTimeout(() => setLoading(false), 2000);
      } else {
        alert("Ocurrió un error sacando una foto.");
      }
    } catch (error) {
      console.log("Error al tomar la foto:", error);
    }
  };
  if (!permission?.granted) {
    return (
      <Pressable
        style={[
          styles.PermissionButton,
          {
            backgroundColor: theme.backgroundSecondary,
            borderColor: theme.borderColor,
          },
        ]}
        onPress={requestCameraPermission}
      >
        <Text
          style={[
            styles.touchableText,
            {
              color: theme.textPrimary,
            },
          ]}
        >
          Permitir cámara
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.borderButtons, { backgroundColor: theme.borderColor }]}
      >
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
        ref={cameraRef}
        onCameraReady={() => {
          console.log("Camera is ready!");
        }}
      ></CameraView>
      <View
        style={[styles.borderButtons, { backgroundColor: theme.borderColor }]}
      >
        <Pressable
          onPress={() => {
            takePicture();
          }}
        >
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
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "dashed",
    zIndex: 1,
  },
  touchableText: {
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  cameraTopButtons: {},
});
