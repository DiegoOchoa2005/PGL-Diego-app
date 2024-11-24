import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import theme from "../styles/Colors";
import { products } from "../data/products";
import Product from "./Product";
const screenWidth = Dimensions.get("window").width;
const screenHeigth = Dimensions.get("screen").height;
const ShoppingList = () => {
  const [totalPrice, setPrice] = useState(0.0);

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.pricePerUnit * product.ammount;
    });
    setPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Compras</Text>
      </View>
      <View style={styles.shoppingListContainer}>
        {products.length === 0 ? (
          <>
            <Text style={styles.statusListText}>La lista esta vacía...</Text>
            <View style={styles.imgContainer}>
              <Image
                source={require("../assets/img/otherimages/anastasiatriste.png")}
                style={styles.img}
              />
            </View>
          </>
        ) : (
          <View style={styles.productList}>
            <FlatList
              data={products}
              renderItem={({ item }) => (
                <Product
                  productName={item.productName}
                  category={item.category}
                  ammount={item.ammount}
                  pricePerUnit={item.pricePerUnit}
                  isInShoppingCart={item.isInShoppingCart}
                />
              )}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        )}
        <View style={styles.totalPrice}>
          <Text style={styles.priceInformation}>
            Precio total: {totalPrice.toFixed(2)}€
          </Text>
        </View>
        <Pressable style={styles.pressable}>
          <Text style={styles.pressableText}>AÑADIR PRODUCTO</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.backgroundSecondary,
    alignItems: "center",
  },
  header: {
    width: screenWidth,
    height: 100,
    backgroundColor: theme.light.backgroundPrimary,
    alignItems: "center",
    justifyContent: "center",
    borderColor: theme.light.borderColor,
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  headerTitle: {
    fontSize: 30,
    textAlign: "center",
    fontStyle: "italic",
    color: theme.light.textPrimary,
    fontWeight: "bold",
  },
  shoppingListContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: "auto",
    alignItems: "center",
    backgroundColor: theme.light.backgroundPrimary,
    height: "80%",
    width: screenWidth - 40,
    borderColor: theme.light.borderColor,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  productList: {
    width: "100%",
    padding: 5,
    height: screenHeigth - 400,
  },
  statusListText: {
    marginTop: "auto",
    fontSize: 34,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
    color: theme.light.textSecondary,
  },
  imgContainer: {
    marginVertical: 20,
  },
  img: {
    height: 250,
    width: 250,
  },
  totalPrice: {
    alignItems: "center",
    width: "80%",
  },
  priceInformation: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.light.textSecondary,
  },
  pressable: {
    marginHorizontal: "auto",
    marginVertical: 20,
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    width: "80%",
  },
  pressableText: {
    color: theme.light.textPrimary,
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
  },
});