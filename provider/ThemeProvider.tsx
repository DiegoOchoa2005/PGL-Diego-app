import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { EventRegister } from "react-native-event-listeners";
import Colors from "../styles/Colors";
type ThemeProviderProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const listener = EventRegister.addEventListener("changeTheme", (data) => {
      setDarkMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeEventListener(listener.toString());
    };
  }, [darkMode]);
  return (
    <ThemeContext.Provider
      value={darkMode === true ? Colors.dark : Colors.light}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

const styles = StyleSheet.create({});
