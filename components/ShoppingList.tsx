import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

import React, { useContext, useEffect, useState } from "react";
import Product, { ProductProps } from "./Product";
import FormModal from "./FormModal";
import ThemeContext from "../context/ThemeContext";

const screenWidth = Dimensions.get("window").width;
const screenHeigth = Dimensions.get("screen").height;

const ShoppingList = () => {
  const theme = useContext(ThemeContext);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [productList, setProductList] = useState<ProductProps[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [wantsToEdit, setWantsToEdit] = useState(false);
  const [productId, setProductId] = useState("");

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

  const toggleInCart = (id: string) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === id
          ? { ...product, isInShoppingCart: !product.isInShoppingCart }
          : product
      )
    );
  };
  const handleEdit = (newValue: boolean) => {
    setWantsToEdit(newValue);
  };

  const handleProductId = (id: string) => {
    setProductId(id);
  };

  const addProductToList = (newProduct: ProductProps) => {
    setProductList([...productList, newProduct]);
  };

  const removeProductFromList = (id: string) => {
    setProductList(productList.filter((product) => product.id !== id));
  };
  const removeAllProducts = () => {
    setProductList([]);
  };
  useEffect(() => {
    calculateTotalPrice();
  }, [productList]);

  const editProduct = (productToEdit: ProductProps) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === productToEdit.id
          ? {
              ...product,
              productName: productToEdit.productName,
              category: productToEdit.category,
              ammount: productToEdit.ammount,
              pricePerUnit: productToEdit.pricePerUnit,
            }
          : product
      )
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}
    >
      {isModalVisible && (
        <FormModal
          isVisible={isModalVisible}
          toggleModal={toggleModal}
          addProduct={addProductToList}
          editProduct={editProduct}
          wantsToEdit={wantsToEdit}
          handleEdit={handleEdit}
          productID={productId}
          productList={productList}
        />
      )}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.backgroundPrimary,
            borderColor: theme.borderColor,
          },
        ]}
      >
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Lista de Compras
        </Text>
      </View>
      <View
        style={[
          styles.shoppingListContainer,
          {
            backgroundColor: theme.backgroundPrimary,
            borderColor: theme.borderColor,
          },
        ]}
      >
        {productList.length === 0 ? (
          <>
            <Text
              style={[styles.statusListText, { color: theme.textSecondary }]}
            >
              La lista está vacía...
            </Text>
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
                  {...item}
                  toggleInCart={toggleInCart}
                  toggleModal={toggleModal}
                  removeFromList={() => removeProductFromList(item.id)}
                  handleEdit={handleEdit}
                  setId={handleProductId}
                />
              )}
              keyExtractor={(item) => `${item.id}`}
            />
          </View>
        )}
        <View style={styles.totalPrice}>
          <Text
            style={[styles.priceInformation, { color: theme.textSecondary }]}
          >
            Precio total: {totalPrice.toFixed(2)}€
          </Text>
        </View>
        <View style={styles.pressableButtons}>
          <Pressable
            style={[
              styles.pressableAddProduct,
              {
                backgroundColor: theme.backgroundSecondary,
                borderColor: theme.borderColor,
              },
            ]}
            onPress={toggleModal}
          >
            <Entypo
              style={[styles.pressableAddIcon, { color: theme.textPrimary }]}
              name="circle-with-plus"
              size={20}
            />
          </Pressable>
          {productList.length > 0 && (
            <Pressable
              style={[
                styles.pressableDeleteAllProducts,
                {
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.borderColor,
                },
              ]}
              onPress={removeAllProducts}
            >
              <Entypo
                style={[
                  styles.pressableDeleteIcon,
                  { color: theme.textPrimary },
                ]}
                name="trash"
                size={20}
              />
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    width: screenWidth,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderStyle: "dashed",
  },
  headerTitle: {
    fontSize: 30,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  shoppingListContainer: {
    display: "flex",
    flexDirection: "column",
    marginVertical: "auto",
    alignItems: "center",
    height: "80%",
    width: screenWidth - 40,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  productList: {
    width: "100%",
    padding: 5,
    height: screenHeigth - 355,
  },
  statusListText: {
    marginTop: "auto",
    fontSize: 34,
    textAlign: "center",
    fontStyle: "italic",
    fontWeight: "bold",
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
    marginVertical: "auto",
  },
  priceInformation: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pressableButtons: {
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    marginVertical: "auto",
  },
  pressableAddProduct: {
    marginHorizontal: "auto",
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "20%",
  },
  pressableDeleteAllProducts: {
    marginHorizontal: "auto",
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "20%",
  },
  pressableDeleteIcon: {
    marginVertical: "auto",
    textAlign: "center",
    padding: 10,
  },
  pressableAddIcon: {
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
});
