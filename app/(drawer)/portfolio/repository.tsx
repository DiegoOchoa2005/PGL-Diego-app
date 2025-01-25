import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import theme from "../../../styles/Colors";
import { Audio } from "expo-av";

const screenWidth = Dimensions.get("window").width;
const screenHeigth = Dimensions.get("window").height;
const RepositoryPage = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [sandyImage, setImage] = useState(
    require("../../../assets/img/sandyInteractive/normalSandy.png")
  );
  const [originalImage, setOriginalImage] = useState(true);
  const handleSandyImage = () => {
    if (originalImage) {
      playSound();
      setImage(
        require("../../../assets/img/sandyInteractive/sandySlapped.png")
      );
    } else {
      setImage(require("../../../assets/img/sandyInteractive/normalSandy.png"));
    }
    setOriginalImage(!originalImage);
  };
  useEffect(() => {
    const loadSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../../../sounds/cachetada.mp3")
        );
        setSound(sound);
      } catch (error) {
        console.error("Error al cargar el sonido:", error);
      }
    };

    loadSound();
  }, []);

  const playSound = async () => {
    try {
      if (sound != null) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };
  return (
    <View style={styles.qrContainer}>
      <View style={[styles.repoContainer]}>
        <View style={styles.qrCode}>
          <QRCode
            size={110}
            value="https://github.com/DiegoOchoa2005/pgl-portfolio-app"
            logo={require("../../../assets/img/boxImages/sandyLogo.png")}
            logoSize={20}
          />
        </View>
        <View style={styles.cuteDraw}>
          <TouchableOpacity
            onPress={() => {
              handleSandyImage();
              playSound();
            }}
            activeOpacity={1}
          >
            <Image style={styles.sandyImage} source={sandyImage} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RepositoryPage;

const styles = StyleSheet.create({
  qrContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    height: screenHeigth - 140,
    maxWidth: screenWidth,
    maxHeight: screenHeigth - 130,
    backgroundColor: theme.light.backgroundPrimary,
  },
  repoContainer: {
    display: "flex",
    height: screenHeigth,
    width: screenWidth,
  },
  qrCode: {
    alignItems: "center",
    alignContent: "center",
    marginTop: 70,
  },
  cuteDraw: {
    alignItems: "center",
  },
  sandyImage: {
    height: 370,
    width: screenWidth,
  },
});
