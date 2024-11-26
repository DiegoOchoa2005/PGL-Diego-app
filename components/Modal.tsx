import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import Modal from "react-native-modal";
import theme from "../styles/Colors";
import { Picker } from "@react-native-picker/picker";
import { ProductProps } from "./Product";
import uuid from "react-native-uuid";

type ModalProps = {
  isVisible: boolean;
  toggleModal: () => void;
  addProduct: (newProduct: ProductProps) => void;
};

const FormModal = ({ isVisible, toggleModal, addProduct }: ModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [ammount, setAmmount] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");

  const checkAllInputs =
    name.trim().length === 0 ||
    category.trim().length === 0 ||
    ammount.trim().length === 0 ||
    pricePerUnit.trim().length === 0;

  const handleImage = checkAllInputs
    ? require("../assets/img/otherimages/anastasiatriste.png")
    : require("../assets/img/boxImages/sandyWelcome.png");

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
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>DATOS DEL PRODUCTO</Text>
            </View>
            <View style={styles.modalInputs}>
              <View style={styles.nameContainer}>
                <Text style={styles.productLabels}>Nombre:</Text>
                <TextInput
                  style={styles.productNameInput}
                  placeholder="Doritos con mayonesa..."
                  onChangeText={handleProductName}
                  value={name}
                />
              </View>
              <View style={styles.categoryAndAmmountContainer}>
                <View style={styles.productCategoryContainer}>
                  <Text style={styles.productLabels}>Categoría:</Text>
                  <View style={styles.pickerContainer}>
                    <Picker
                      selectedValue={category}
                      onValueChange={(itemValue) => handleCategory(itemValue)}
                    >
                      <Picker.Item
                        label="Categoría.."
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
                  <Text style={styles.productLabels}>Cantidad:</Text>
                  <TextInput
                    placeholder="Cantidad..."
                    keyboardType="numeric"
                    onChangeText={handleProductAmmount}
                    value={ammount}
                    style={styles.productAmmountInput}
                    maxLength={3}
                  />
                </View>
              </View>
              <View style={styles.pricePerUnitAndImageContainer}>
                <View style={styles.pricePerUnitContainer}>
                  <Text style={styles.productLabels}>Precio c/u:</Text>
                  <TextInput
                    placeholder="0.00€..."
                    style={styles.productNameInput}
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
              <Pressable style={styles.pressable} onPress={toggleModal}>
                <Text style={styles.pressableText}>SALIR</Text>
              </Pressable>

              <Pressable
                style={[
                  styles.pressable,
                  checkAllInputs ? { opacity: 0.7 } : {},
                ]}
                onPress={() => {
                  toggleModal();
                  addProduct({
                    id: uuid.v4(),
                    productName: name,
                    category: category,
                    ammount: Number(ammount),
                    pricePerUnit: Number(pricePerUnit),
                    isInShoppingCart: false,
                  });
                }}
                disabled={checkAllInputs}
              >
                <Text style={styles.pressableText}>CONFIRMAR</Text>
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
    backgroundColor: theme.light.backgroundSecondary,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: theme.light.borderColor,
    width: "90%",
  },
  modalContent: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    backgroundColor: theme.light.backgroundPrimary,
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
  },
  modalHeader: {
    width: "90%",
    height: 80,
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    backgroundColor: theme.light.backgroundSecondary,
    marginTop: 5,
  },
  modalHeaderText: {
    marginVertical: "auto",
    fontSize: 24,
    fontWeight: "bold",
    color: theme.light.textPrimary,
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
    color: theme.light.textPrimary,
    fontStyle: "italic",
    marginLeft: 15,
  },

  productNameInput: {
    width: "100%",
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.light.borderColor,
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
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.light.borderColor,
    height: 50,
    width: "100%",
  },
  productAmmountContainer: {
    width: "35%",
    marginLeft: "auto",
  },
  productAmmountInput: {
    width: "100%",
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.light.borderColor,
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
  },
  image: {
    width: 150,
    height: 150,
  },
  pressable: {
    marginVertical: 20,
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    width: "45%",
    paddingVertical: 5,
  },
  pressableText: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
