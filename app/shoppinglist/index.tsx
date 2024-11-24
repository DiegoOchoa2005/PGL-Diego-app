import { StyleSheet, View } from "react-native";
import ShoppingList from "../../components/ShoppingList";

const ShoppingListPage = () => {
  return (
    <View style={styles.container}>
      <ShoppingList />
    </View>
  );
};

export default ShoppingListPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
