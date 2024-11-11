import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import Box from "../../../components/Box";
import { boxes } from "../../../data/BoxData";
import { Dimensions } from "react-native";
const screenHeigth = Dimensions.get("screen").height;
const HobbiesPage = () => {
  return (
    <View style={styles.boxList}>
      <FlatList
        data={boxes}
        renderItem={({ item }) => (
          <Box description={item.description} image={item.image} />
        )}
        keyExtractor={(_item, index: number) => `${index}`}
      />
    </View>
  );
};

export default HobbiesPage;

const styles = StyleSheet.create({
  boxList: {
    width: 380,
    height: screenHeigth - 386,
    maxWidth: 380,
    maxHeight: screenHeigth - 386,
  },
});
