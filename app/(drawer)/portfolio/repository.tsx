import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import handleSounds from "../../../sounds/SoundHandler";
import ThemeContext from "../../../context/ThemeContext";

const screenWidth = Dimensions.get("window").width;
const screenHeigth = Dimensions.get("window").height;

const RepositoryPage = () => {
  const theme = useContext(ThemeContext);
  const [sandyImage, setImage] = useState(
    require("../../../assets/img/sandyInteractive/normalSandy.png")
  );
  const [originalImage, setOriginalImage] = useState(true);

  const handleSandyImage = () => {
    if (originalImage) {
      handleSounds("slap");
      setImage(
        require("../../../assets/img/sandyInteractive/sandySlapped.png")
      );
    } else {
      setImage(require("../../../assets/img/sandyInteractive/normalSandy.png"));
    }
    setOriginalImage(!originalImage);
  };

  return (
    <View
      style={[styles.qrContainer, { backgroundColor: theme.backgroundPrimary }]}
    >
      <View style={styles.repoContainer}>
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
