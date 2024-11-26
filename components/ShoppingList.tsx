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
import Product, { ProductProps } from "./Product";
import FormModal from "./Modal";
const screenWidth = Dimensions.get("window").width;
const screenHeigth = Dimensions.get("screen").height;
const ShoppingList = () => {
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [productList, setProductList] = useState<ProductProps[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const calculateTotalPrice = () => {
    const total = productList.reduce((sum, product) => {
      if (product.isInShoppingCart) {
        return sum + product.pricePerUnit * product.ammount;
      }
      return sum;
    }, 0);
    setTotalPrice(total);
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [productList]);

  const toggleInCart = (id: string) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === id
          ? { ...product, isInShoppingCart: !product.isInShoppingCart }
          : product
      )
    );
  };

  const addProductToList = (newProduct: ProductProps) => {
    setProductList([...productList, newProduct]);
  };

  const removeProductFromList = (id: string) => {
    setProductList(productList.filter((product) => product.id !== id));
  };

  return (
    <View style={styles.container}>
      {isModalVisible ? (
        <>
          <FormModal
            isVisible={isModalVisible}
            toggleModal={toggleModal}
            addProduct={addProductToList}
          />
        </>
      ) : (
        <></>
      )}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de Compras</Text>
      </View>
      <View style={styles.shoppingListContainer}>
        {productList.length === 0 ? (
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
              data={productList}
              renderItem={({ item }) => (
                <Product
                  id={item.id}
                  productName={item.productName}
                  category={item.category}
                  ammount={item.ammount}
                  pricePerUnit={item.pricePerUnit}
                  isInShoppingCart={item.isInShoppingCart}
                  toggleInCart={toggleInCart}
                  removeFromList={() => removeProductFromList(item.id)}
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
        <Pressable style={styles.pressable} onPress={toggleModal}>
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
