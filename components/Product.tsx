import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import theme from "../styles/Colors";
import Entypo from "@expo/vector-icons/Entypo";
export type ProductProps = {
  id: string;
  productName: string;
  category: string;
  ammount: number;
  pricePerUnit: number;
  isInShoppingCart: boolean;
  removeFromList: () => void;
};

const Product = ({
  productName,
  category,
  ammount,
  pricePerUnit,
  isInShoppingCart,
  removeFromList,
}: ProductProps) => {
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
          <Pressable style={styles.pressableDelete} onPress={removeFromList}>
            <Text style={styles.deleteText}>
              Eliminar{" "}
              <Entypo name="trash" size={20} color={theme.light.textPrimary} />
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },
  productBox: {
    display: "flex",
    flexWrap: "wrap",
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
    width: 80,
    height: 80,
    marginHorizontal: "auto",
    borderRadius: 10,
    borderWidth: 1,
  },
  pressableDelete: {
    marginLeft: "auto",
    marginTop: 10,
    marginRight: 10,
    backgroundColor: theme.light.backgroundPrimary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
  },
  deleteText: {
    fontSize: 18,
    padding: 10,
  },
});
