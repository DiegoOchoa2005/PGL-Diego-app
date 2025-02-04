import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useContext } from "react";
import theme from "../styles/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import ThemeContext from "../context/ThemeContext";

export type ProductProps = {
  id: string;
  productName: string;
  category: string;
  ammount: number;
  pricePerUnit: number;
  isInShoppingCart: boolean;
  toggleInCart?: (id: string) => void;
  toggleModal?: () => void;
  removeFromList?: () => void;
  handleEdit?: (newValue: boolean) => void;
  setId?: (id: string) => void;
};

const Product = ({
  id,
  productName,
  category,
  ammount,
  pricePerUnit,
  isInShoppingCart,
  removeFromList,
  toggleInCart,
  toggleModal,
  handleEdit,
  setId,
}: ProductProps) => {
  const theme = useContext(ThemeContext);

  const checkCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case "bakery":
        return require("../assets/img/shoppingImages/bakery.png");
      case "fishes":
        return require("../assets/img/shoppingImages/fishes.png");
      case "sweets":
        return require("../assets/img/shoppingImages/sweets.png");
      case "meats":
        return require("../assets/img/shoppingImages/meats.png");
      case "canned":
        return require("../assets/img/shoppingImages/canned.png");
      case "vegsorfruits":
        return require("../assets/img/shoppingImages/vegsorfruits.png");
      case "others":
        return require("../assets/img/shoppingImages/amayaothers.png");
      default:
        return require("../assets/img/shoppingImages/amayaothers.png");
    }
  };

  const handleIcon = () => {
    return isInShoppingCart ? (
      <Entypo
        style={styles.icon}
        name="check"
        size={20}
        color={theme.textPrimary}
      />
    ) : (
      <Entypo
        style={styles.icon}
        name="circle-with-cross"
        size={20}
        color={theme.textPrimary}
      />
    );
  };

  const wantsToEdit = () => {
    toggleModal!();
    handleEdit!(true);
    setId!(id);
  };

  return (
    <Pressable
      onPress={() => {
        toggleInCart!(id);
      }}
    >
      <View style={[styles.container]}>
        <View
          style={[
            styles.productBox,
            {
              borderColor: theme.borderColor,
              backgroundColor: theme.backgroundSecondary,
            },
          ]}
        >
          <View style={styles.productInfo}>
            <Text
              style={[
                styles.productText,
                isInShoppingCart
                  ? {
                      textDecorationLine: "line-through",
                      fontWeight: "bold",
                      color: "green",
                    }
                  : { color: theme.textPrimary },
              ]}
            >
              {productName}
            </Text>
            <Text style={[styles.productText, { color: theme.textPrimary }]}>
              Cantidad: {ammount}
            </Text>
            <Text style={[styles.productText, { color: theme.textPrimary }]}>
              Precio C/U: {pricePerUnit}€
            </Text>
            <View style={styles.shoppingStatus}>
              <Text style={[styles.productText, { color: theme.textPrimary }]}>
                Carrito:{" "}
              </Text>
              {handleIcon()}
            </View>
          </View>
          <View style={styles.productCategory}>
            <Image
              source={checkCategory(category)}
              style={[styles.categoryImg, { borderColor: theme.borderColor }]}
            />
          </View>
          <View style={styles.pressableButtons}>
            <Pressable
              style={[
                styles.pressableEdit,
                {
                  borderColor: theme.borderColor,
                  backgroundColor: theme.backgroundPrimary,
                },
              ]}
              onPress={wantsToEdit}
            >
              <Entypo
                style={styles.pressableIcon}
                name="edit"
                size={20}
                color={theme.textPrimary}
              />
            </Pressable>
            <Pressable
              style={[
                styles.pressableDelete,
                {
                  borderColor: theme.borderColor,
                  backgroundColor: theme.backgroundPrimary,
                },
              ]}
              onPress={removeFromList}
            >
              <AntDesign
                style={styles.pressableIcon}
                name="closecircleo"
                size={24}
                color={theme.textPrimary}
              />
            </Pressable>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginVertical: 5,
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
  shoppingStatus: {
    display: "flex",
    flexDirection: "row",
    width: "40%",
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
  pressableButtons: {
    flexDirection: "row",
    width: "100%",
  },
  pressableDelete: {
    marginRight: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  pressableEdit: {
    marginLeft: "auto",
    marginRight: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  icon: {
    marginTop: 2,
  },
  pressableIcon: {
    textAlign: "center",
    padding: 10,
  },
});
