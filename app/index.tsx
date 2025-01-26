import React, { useEffect, useState } from "react";

import { StyleSheet, View } from "react-native";
import theme from "../styles/Colors";

import { asyncStorageService } from "../services/asyncStorageService";
import { router } from "expo-router";

const AppPage = () => {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);
  const handlePages = async () => {
    const token = await asyncStorageService.getItem();
    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };
  useEffect(() => {
    handlePages();
  }, []);
  useEffect(() => {
    if (isLogged !== null) {
      if (isLogged) {
        router.push("../(drawer)/welcome/welcome");
      } else {
        router.push("../login/login");
      }
    }
  }, [isLogged]);
  return <View style={styles.container}></View>;
};

export default AppPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.backgroundSecondary,
  },
});
