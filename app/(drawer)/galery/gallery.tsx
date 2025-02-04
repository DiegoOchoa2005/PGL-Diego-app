import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ImageData } from "../../../type/ImageData";

import theme from "../../../styles/Colors";
import { asyncStorageService } from "../../../services/asyncStorageService";
import { cameraService } from "../../../services/cameraService";
import Camera from "../../../components/Camera";
import ImageList from "../../../components/ImageList";
import Loading from "../../../components/Loading";
import { useFocusEffect } from "expo-router";
import ThemeContext from "../../../context/ThemeContext";

const cameraPage = () => {
  const theme = useContext(ThemeContext);
  const [images, setImages] = useState<ImageData[]>([]);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [userToken, setUserToken] = useState("");
  const [loading, setLoading] = useState(true);
  const getImages = async () => {
    const token = await asyncStorageService.getItem();
    const camImages = await cameraService.getAllImages(token!);

    setUserToken(token!);
    if (camImages.length > 0) {
      setImages(camImages);
    }
  };
  const openCamera = async () => {
    setIsCameraOpen(true);
  };
  const closeCamera = async () => {
    setIsCameraOpen(false);
    await getImages();
  };
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getImages();
      setTimeout(() => setLoading(false), 1000);

      return () => {};
    }, [])
  );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.backgroundSecondary,
        },
      ]}
    >
      <Loading visible={loading} />

      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: theme.backgroundPrimary,
            borderColor: theme.borderColor,
          },
        ]}
      >
        {isCameraOpen ? (
          <Camera
            userToken={userToken}
            closeCamera={closeCamera}
            setLoading={setLoading}
          />
        ) : images.length === 0 ? (
          <View style={styles.noImagesContainer}>
            <View style={styles.noImagesContent}>
              <Text
                style={[
                  styles.titleMessage,
                  {
                    color: theme.textPrimary,
                  },
                ]}
              >
                No hay imágenes
              </Text>
              <Image
                style={styles.chibiImage}
                source={require("../../../assets/img/otherimages/anastasiatriste.png")}
              />
              <TouchableOpacity
                style={[
                  styles.touchable,
                  {
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: theme.borderColor,
                  },
                ]}
                onPress={openCamera}
              >
                <Text
                  style={[
                    styles.touchableText,
                    {
                      color: theme.textPrimary,
                    },
                  ]}
                >
                  Tomar foto
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <ImageList list={images} />
            <TouchableOpacity
              style={[
                styles.touchable,
                {
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.borderColor,
                },
              ]}
              onPress={openCamera}
            >
              <Text
                style={[
                  styles.touchableText,
                  {
                    color: theme.textPrimary,
                  },
                ]}
              >
                Tomar foto
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default cameraPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    margin: 10,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    height: "95%",
  },
  titleMessage: {
    fontSize: 30,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  noImagesContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  noImagesContent: {
    marginVertical: "auto",
    width: "100%",
    alignItems: "center",
  },
  chibiImage: {
    height: 200,
    width: 200,
  },
  touchable: {
    marginHorizontal: "auto",
    marginTop: 25,
    marginBottom: "auto",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "50%",
  },
  touchableText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
});
