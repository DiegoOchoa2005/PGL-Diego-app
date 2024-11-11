import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

const WelcomePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.welcomeView}>
          <Text style={styles.welcomeTitle}>Bienvenido a mi app!</Text>
          <Text style={styles.welcomeDescription}>
            Haz clic en el botón de abajo para poder acceder, disfruta tu viaje
            ^^!
          </Text>
        </View>
        <View style={styles.imageView}>
          <Image source={require("../assets/icon.png")} style={styles.image} />
        </View>
        <Pressable style={styles.pressable}>
          <Link href={"./profiles"} style={styles.pressableText}>
            Clickeame
          </Link>
        </Pressable>
      </View>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  wrapper: {
    margin: 10,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    height: "95%",
  },
  welcomeView: {
    marginTop: "auto",
    marginBottom: 30,
    marginHorizontal: "auto",
    backgroundColor: "green",
    width: "90%",
  },

  welcomeTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
  },
  welcomeDescription: {
    textAlign: "center",
    color: "white",
    fontSize: 18,
    fontStyle: "italic",
    padding: 20,
    paddingTop: 0,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
  },
  image: {
    height: 200,
    width: 200,
  },
  pressable: {
    marginBottom: "auto",
    marginHorizontal: "auto",
    backgroundColor: "green",
    borderRadius: 10,
  },
  pressableText: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
    padding: 20,
  },
});
