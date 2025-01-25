import { StyleSheet } from "react-native";
import React from "react";
import ThemeProvider from "../../provider/ThemeProvider";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppLayout = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <Drawer
          screenOptions={{
            headerStatusBarHeight: -25,
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              title: "App :3",
              drawerLabel: "Home",
            }}
          />
          <Drawer.Screen
            name="portfolio"
            options={{
              title: "App :3",
              drawerLabel: "Portfolio",
            }}
          />
          <Drawer.Screen
            name="shoppinglist/index"
            options={{
              title: "App :3",
              drawerLabel: "Lista de compras",
            }}
          />
        </Drawer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
