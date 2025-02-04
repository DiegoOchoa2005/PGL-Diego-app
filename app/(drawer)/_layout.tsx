import { StyleSheet } from "react-native";
import React from "react";

import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import theme from "../../styles/Colors";
import { asyncStorageService } from "../../services/asyncStorageService";
import { router } from "expo-router";
import ThemeSwitch from "../../components/ThemeSwitch";
const AppLayout = () => {
  const handleRemoveToken = async () => {
    await asyncStorageService.removeItem();
    router.navigate("/");
  };
  const CustomDrawerContent = (props: any) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <ThemeSwitch />
        <DrawerItem
          style={styles.logOut}
          label="Cerrar sesión 😢"
          labelStyle={styles.logOutLabel}
          onPress={() => handleRemoveToken()}
        />
      </DrawerContentScrollView>
    );
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        screenOptions={{
          headerStatusBarHeight: -25,
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="welcome/welcome"
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
        <Drawer.Screen
          name="galery/gallery"
          options={{
            title: "App :3",
            drawerLabel: "Galería",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logOut: {
    marginTop: 20,
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
  },
  logOutLabel: {
    color: theme.light.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
    padding: 5,
    textAlign: "center",
  },
});
