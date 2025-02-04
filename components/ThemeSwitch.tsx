import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { EventRegister } from "react-native-event-listeners";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeSwitch = () => {
  const theme = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleSwitch = (value: boolean) => {
    setIsDarkMode(value);
    EventRegister.emit("changeTheme", value);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}
    >
      <Text style={[styles.label, { color: theme.textPrimary }]}>
        {isDarkMode ? "Modo Oscuro" : "Modo Claro"}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isDarkMode ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isDarkMode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ThemeSwitch;
