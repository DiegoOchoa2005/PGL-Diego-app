import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-native-modal";
import theme from "../styles/Colors";
import { Picker } from "@react-native-picker/picker";
import { ProductProps } from "./Product";
import uuid from "react-native-uuid";
import ThemeContext from "../context/ThemeContext";

type ModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
  addProduct: (newProduct: ProductProps) => void;
  editProduct: (productToModify: ProductProps) => void;
  wantsToEdit: boolean;
  handleEdit: (newValue: boolean) => void;
  productID: string;
  productList: ProductProps[];
};

const FormModal = ({
  isVisible,
  toggleModal,
  addProduct,
  editProduct,
  wantsToEdit,
  handleEdit,
  productID,
  productList,
}: ModalProps) => {
  const theme = useContext(ThemeContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [ammount, setAmmount] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");

  const loadProductValue = () => {
    productList.forEach((product) => {
      if (product.id === productID) {
        setName(product.productName);
        setCategory(product.category);
        setAmmount(product.ammount.toString());
        setPricePerUnit(product.pricePerUnit.toString());
      }
    });
  };

  const cancelOperation = () => {
    toggleModal(), handleEdit(false);
  };

  useEffect(() => {
    wantsToEdit ? loadProductValue() : {};
  }, []);

  const handleProductListModification = () => {
    wantsToEdit
      ? editProduct({
          id: productID,
          productName: name,
          category: category,
          ammount: Number(ammount),
          pricePerUnit: Number(pricePerUnit),
          isInShoppingCart: false,
        })
      : addProduct({
          id: uuid.v4(),
          productName: name,
          category: category,
          ammount: Number(ammount),
          pricePerUnit: Number(pricePerUnit),
          isInShoppingCart: false,
        });
    handleEdit(false);
    toggleModal();
  };

  const checkAllInputs =
    name.trim().length === 0 ||
    category.trim().length === 0 ||
    ammount.trim().length === 0 ||
    pricePerUnit.trim().length === 0;

  const handleImage = checkAllInputs
    ? require("../assets/img/otherimages/xiaohyperdino.png")
    : require("../assets/img/otherimages/xiaohyperdino2.png");

  const handleProductName = (name: string) => {
    setName(name);
  };

  const handleCategory = (category: string) => {
    setCategory(category);
  };

  const handleProductAmmount = (inputValue: string) => {
    setAmmount(inputValue.replace(/[^0-9]/g, ""));
  };

  const handleProductPrice = (inputValue: string) => {
    if (inputValue.startsWith(".") || inputValue.startsWith(",")) {
      setPricePerUnit("");
    } else {
      setPricePerUnit(inputValue.replaceAll(",", "."));
    }
  };

  return (
    <Modal
      style={{
        width: "100%",
        alignSelf: "center",
      }}
      isVisible={isVisible}
      animationIn={"tada"}
      animationInTiming={2000}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.backgroundSecondary,
              borderColor: theme.borderColor,
            },
          ]}
        >
          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: theme.backgroundPrimary,
                borderColor: theme.borderColor,
              },
            ]}
          >
            <View
              style={[
                styles.modalHeader,
                {
                  backgroundColor: theme.backgroundSecondary,
                  borderColor: theme.borderColor,
                },
              ]}
            >
              <Text
                style={[styles.modalHeaderText, { color: theme.textPrimary }]}
              >
                DATOS DEL PRODUCTO
              </Text>
            </View>
            <View style={styles.modalInputs}>
              <View style={styles.nameContainer}>
                <Text
                  style={[styles.productLabels, { color: theme.textPrimary }]}
                >
                  Nombre:
                </Text>
                <TextInput
                  style={[
                    styles.productNameInput,
                    {
                      backgroundColor: theme.backgroundSecondary,
                      borderColor: theme.borderColor,
                    },
                  ]}
                  placeholder="Doritos con mayonesa..."
                  placeholderTextColor={theme.textPrimary}
                  onChangeText={handleProductName}
                  value={name}
                />
              </View>
              <View style={styles.categoryAndAmmountContainer}>
                <View style={styles.productCategoryContainer}>
                  <Text
                    style={[styles.productLabels, { color: theme.textPrimary }]}
                  >
                    Categoría:
                  </Text>
                  <View
                    style={[
                      styles.pickerContainer,
                      {
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.borderColor,
                      },
                    ]}
                  >
                    <Picker
                      selectedValue={category}
                      onValueChange={(itemValue) => handleCategory(itemValue)}
                    >
                      <Picker.Item
                        label="Categoría.."
                        style={{ color: theme.textPrimary }}
                        value=""
                        enabled={false}
                      />
                      <Picker.Item label="Panadería" value="Bakery" />
                      <Picker.Item label="Enlatados" value="Canned" />
                      <Picker.Item label="Carnicería" value="Meats" />
                      <Picker.Item label="Pescadería" value="Fishes" />
                      <Picker.Item
                        label="Verduras o Frutas"
                        value="VegsOrFruits"
                      />
                      <Picker.Item label="Dulces" value="Sweets" />
                      <Picker.Item label="Otros" value="Others" />
                    </Picker>
                  </View>
                </View>
                <View style={styles.productAmmountContainer}>
                  <Text
                    style={[styles.productLabels, { color: theme.textPrimary }]}
                  >
                    Cantidad:
                  </Text>
                  <TextInput
                    placeholder="Cantidad..."
                    placeholderTextColor={theme.textPrimary}
                    keyboardType="numeric"
                    onChangeText={handleProductAmmount}
                    value={ammount}
                    style={[
                      styles.productAmmountInput,
                      {
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.borderColor,
                      },
                    ]}
                    maxLength={3}
                  />
                </View>
              </View>
              <View style={styles.pricePerUnitAndImageContainer}>
                <View style={styles.pricePerUnitContainer}>
                  <Text
                    style={[styles.productLabels, { color: theme.textPrimary }]}
                  >
                    Precio c/u:
                  </Text>
                  <TextInput
                    placeholder="0.00€..."
                    placeholderTextColor={theme.textPrimary}
                    style={[
                      styles.productNameInput,
                      {
                        backgroundColor: theme.backgroundSecondary,
                        borderColor: theme.borderColor,
                      },
                    ]}
                    keyboardType="decimal-pad"
                    onChangeText={handleProductPrice}
                    value={pricePerUnit}
                    maxLength={6}
                  />
                </View>
                <View style={styles.imageContainer}>
                  <Image source={handleImage} style={styles.image} />
                </View>
              </View>
            </View>
            <View style={styles.modalButtons}>
              <Pressable
                style={[
                  styles.pressable,
                  {
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: theme.borderColor,
                  },
                ]}
                onPress={cancelOperation}
              >
                <Text
                  style={[
                    styles.pressableText,
                    {
                      color: theme.textPrimary,
                    },
                  ]}
                >
                  SALIR
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.pressable,
                  checkAllInputs ? { opacity: 0.7 } : {},
                  {
                    backgroundColor: theme.backgroundSecondary,
                    borderColor: theme.borderColor,
                  },
                ]}
                onPress={handleProductListModification}
                disabled={checkAllInputs}
              >
                <Text
                  style={[
                    styles.pressableText,
                    {
                      color: theme.textPrimary,
                    },
                  ]}
                >
                  CONFIRMAR
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FormModal;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    width: "90%",
  },
  modalContent: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
  },
  modalHeader: {
    width: "90%",
    height: 80,
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    marginTop: 5,
  },
  modalHeaderText: {
    marginVertical: "auto",
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  modalInputs: {
    width: "100%",
    alignItems: "center",
  },
  nameContainer: {
    width: "90%",
    marginTop: 10,
  },
  productLabels: {
    fontSize: 18,
    fontWeight: "bold",

    fontStyle: "italic",
    marginLeft: 15,
  },
  productNameInput: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
  },

  categoryAndAmmountContainer: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },
  productCategoryContainer: {
    width: "60%",
  },
  pickerContainer: {
    borderRadius: 10,
    borderWidth: 1,

    height: 50,
    width: "100%",
  },
  productAmmountContainer: {
    width: "35%",
    marginLeft: "auto",
  },
  productAmmountInput: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    height: 50,
  },
  pricePerUnitAndImageContainer: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
  },
  pricePerUnitContainer: {
    width: "50%",
    marginVertical: "auto",
  },
  imageContainer: {
    width: "50%",
    marginTop: 10,
  },
  image: {
    width: 170,
    height: 170,
  },
  pressable: {
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "45%",
    paddingVertical: 5,
  },
  pressableText: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
