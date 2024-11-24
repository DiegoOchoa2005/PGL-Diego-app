import { Image, StyleSheet, Text, View } from "react-native";
import theme from "../styles/Colors";
import Entypo from "@expo/vector-icons/Entypo";
export type Product = {
  id?: string;
  productName: string;
  category: string;
  ammount: number;
  pricePerUnit: number;
  isInShoppingCart: boolean;
};

const Product = ({
  productName,
  category,
  ammount,
  pricePerUnit,
  isInShoppingCart,
}: Product) => {
  const checkCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "bakery":
        return require("../assets/img/shoppingImages/bakery.png");
      case "fishes":
        return require("../assets/img/shoppingImages/fishes.png");
      case "sweets":
        return require("../assets/img/shoppingImages/sweets.png");

      default:
        break;
    }
  };
  const checkIfIsInShoppingCart = (isInShoppingCart: boolean) => {
    switch (isInShoppingCart) {
      case true:
        return (
          <Entypo name="check" size={20} color={theme.light.textPrimary} />
        );
      case false:
        return (
          <Entypo
            name="circle-with-cross"
            size={20}
            color={theme.light.textPrimary}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.productBox}>
        <View style={styles.productInfo}>
          <Text style={styles.productText}>{productName}</Text>
          <Text style={styles.productText}>Cantidad: {ammount}</Text>
          <Text style={styles.productText}>Precio C/U: {pricePerUnit}€</Text>
          <Text style={styles.productText}>
            Carrito: {checkIfIsInShoppingCart(isInShoppingCart)}
          </Text>
        </View>
        <View style={styles.productCategory}>
          <Image source={checkCategory(category)} style={styles.categoryImg} />
        </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  productBox: {
    display: "flex",
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    width: "100%",
    borderStyle: "dashed",
    borderRadius: 15,
    marginVertical: 5,
    backgroundColor: theme.light.backgroundSecondary,
  },
  productInfo: {
    marginHorizontal: "auto",
    maxWidth: "60%",
    width: "60%",
    padding: 10,
  },
  productText: {
    fontSize: 18,
  },
  productCategory: {
    justifyContent: "center",
    width: "40%",
  },
  categoryImg: {
    width: 100,
    height: 100,
    marginHorizontal: "auto",
    borderRadius: 10,
    borderWidth: 1,
  },
});
