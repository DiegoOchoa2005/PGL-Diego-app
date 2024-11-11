import React, { useContext } from "react";
import {
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

const Box = ({ description, image }: BoxProps) => {
  const theme = useContext(ThemeContext);
  return (
    <View style={[styles.container, { borderColor: theme.borderColor }]}>
      <View
        style={[styles.boxInfo, { backgroundColor: theme.backgroundPrimary }]}
      >
        <View
          style={[
            styles.boxTextContainer,
            {
              backgroundColor: theme.backgroundSecondary,
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
    margin: 4,
    marginHorizontal: 8,
  },
  boxTextContainer: {
    padding: 10,
    marginLeft: "auto",
    width: "auto",
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
