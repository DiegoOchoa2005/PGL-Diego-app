import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { Link } from "expo-router";
import ThemeContext from "../context/ThemeContext";

const WelcomePage = () => {
  const theme = useContext(ThemeContext);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}
    >
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: theme.backgroundPrimary,
            borderColor: theme.borderColor,
          },
        ]}
      >
        <View
          style={[
            styles.welcomeView,
            {
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <Text style={[styles.welcomeTitle, { color: theme.textPrimary }]}>
            Bienvenido a mi app!
          </Text>
          <Text
            style={[styles.welcomeDescription, { color: theme.textSecondary }]}
          >
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
        <Pressable
          style={[
            styles.pressable,
            {
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <Link
            href={"../portfolio"}
            style={[styles.pressableText, { color: theme.textPrimary }]}
          >
            Portafolio
          </Link>
        </Pressable>
        <Pressable
          style={[
            styles.pressableShoppingList,
            {
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <Link
            href={"../shoppinglist"}
            style={[styles.pressableText, { color: theme.textPrimary }]}
          >
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
  },
  wrapper: {
    margin: 10,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    height: "95%",
  },
  welcomeView: {
    marginTop: "auto",
    marginBottom: 30,
    marginHorizontal: "auto",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "90%",
  },
  welcomeTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 20,
  },
  welcomeDescription: {
    textAlign: "center",
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
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "60%",
  },
  pressableShoppingList: {
    marginHorizontal: "auto",
    marginBottom: "auto",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "90%",
  },
  pressableText: {
    fontSize: 34,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
  },
});
