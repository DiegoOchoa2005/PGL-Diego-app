import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import Box from "../../../components/Box";
import { boxes } from "../../../data/BoxData";
import { Dimensions } from "react-native";
import theme from "../../../styles/Colors";
import ThemeContext from "../../../context/ThemeContext";
const screenHeigth = Dimensions.get("screen").height;
const HobbiesPage = () => {
  const theme = useContext(ThemeContext);
  return (
    <View style={{ backgroundColor: theme.backgroundPrimary, height: "100%" }}>
      <Text style={styles.boxTitleInfo}>Me gustan cosas como:</Text>
      <View style={styles.boxList}>
        <FlatList
          data={boxes}
          renderItem={({ item }) => (
            <Box description={item.description} image={item.image} />
          )}
          keyExtractor={(_item, index: number) => `${index}`}
        />
      </View>
    </View>
  );
};

export default HobbiesPage;

const styles = StyleSheet.create({
  boxList: {
    height: screenHeigth - 420,
    marginHorizontal: "auto",
  },
  boxTitleInfo: {
    fontWeight: "bold",
    textTransform: "uppercase",
    fontSize: 18,
    textAlign: "center",
  },
});
