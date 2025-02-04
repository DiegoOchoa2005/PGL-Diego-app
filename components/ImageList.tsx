import {
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { ImageData } from "../type/ImageData";

export type imageListProps = {
  list: ImageData[];
};
const ImageList = ({ list }: imageListProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <View style={styles.images}>
        <FlatList
          data={list}
          numColumns={3}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedImage(item.encodedData)}>
              <Image
                style={styles.imageItem}
                source={{
                  uri: `data:image/jpg;base64,${item.encodedData}`,
                }}
              />
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Pressable
            style={styles.modalBackground}
            onPress={() => setSelectedImage(null)}
          >
            <Image
              style={styles.fullImage}
              source={{
                uri: `data:image/jpg;base64,${selectedImage}`,
              }}
            />
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default ImageList;

const styles = StyleSheet.create({
  images: {
    height: "80%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageItem: {
    height: 100,
    width: 100,
    margin: 5, // 📌 Espaciado entre imágenes
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // 📌 Fondo oscuro semi-transparente
  },
  modalBackground: {
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});
