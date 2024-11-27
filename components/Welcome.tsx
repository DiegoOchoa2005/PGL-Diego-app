import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import theme from "../styles/Colors";
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
          <Image
            source={require("../assets/img/boxImages/sandyWelcome.png")}
            style={styles.image}
          />
        </View>
        <Pressable style={styles.pressable}>
          <Link href={"./portfolio"} style={styles.pressableText}>
            Portafolio
          </Link>
        </Pressable>
        <Pressable style={styles.pressableShoppingList}>
          <Link href={"./shoppinglist"} style={styles.pressableText}>
            Lista de compras
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
    backgroundColor: theme.light.backgroundSecondary,
  },
  wrapper: {
    margin: 10,
    marginTop: 30,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.light.backgroundPrimary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    height: "95%",
  },
  welcomeView: {
    marginTop: "auto",
    marginBottom: 30,
    marginHorizontal: "auto",
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    width: "90%",
  },

  welcomeTitle: {
    textAlign: "center",
    color: theme.light.textPrimary,
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
  },
  welcomeDescription: {
    textAlign: "center",
    color: theme.light.textSecondary,
    fontSize: 18,
    fontStyle: "italic",
    padding: 20,
    paddingTop: 0,
  },
  imageView: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 300,
    width: 300,
  },
  pressable: {
    marginHorizontal: "auto",
    marginBottom: 20,
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    width: "60%",
  },
  pressableShoppingList: {
    marginHorizontal: "auto",
    marginBottom: "auto",
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    width: "90%",
  },
  pressableText: {
    color: theme.light.textPrimary,
    fontSize: 34,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
  },
});
