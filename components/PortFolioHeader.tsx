import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "./Card";
const screenWidth = Dimensions.get("window").width;
const screenHeigth = Dimensions.get("window").height;
const PortFolioHeader = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.bodyCard}>
        <Card
          avatar={require("../assets/img/boxImages/avatar.webp")}
          title="Acerca de mi persona"
          description="Soy un estudiante de informática que le gusta romperse la cabeza para lograr lo que quiere, sin tener tiempo para dormir pero si para dibujar."
        />
      </View>
    </View>
  );
};

export default PortFolioHeader;

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth,
    height: screenHeigth - 130,
    maxWidth: screenWidth,
    maxHeight: screenHeigth - 130,
  },
  bodyCard: {
    marginTop: 25,
  },
});
