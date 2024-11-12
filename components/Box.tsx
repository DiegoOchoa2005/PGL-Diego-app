import React, { useContext } from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ThemeContext from "../context/ThemeContext";

export type BoxProps = {
  description: string;
  image: ImageSourcePropType;
};
const screenWidth = Dimensions.get("window").width;
const Box = ({ description, image }: BoxProps) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, { borderColor: theme.borderColor }]}>
      <View
        style={[styles.boxInfo, { backgroundColor: theme.backgroundSecondary }]}
      >
        <View
          style={[
            styles.boxTextContainer,
            {
              backgroundColor: theme.backgroundPrimary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <Text style={[styles.boxText, { color: theme.textPrimary }]}>
            {description}
          </Text>
        </View>
        <View style={styles.boxImage}>
          <Image source={image} style={styles.img} />
        </View>
      </View>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    borderStyle: "dashed",
    borderWidth: 1,
    marginBottom: 4,
    marginTop: 4,
    width: screenWidth - 20,
  },
  boxTextContainer: {
    padding: 10,
    marginLeft: "auto",
    maxWidth: 260,
    borderWidth: 1,
    borderStyle: "dotted",
    borderRadius: 15,
  },
  boxText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  boxInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
  },
  boxImage: {
    borderRadius: 50,
    marginLeft: "auto",
  },

  img: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
});
