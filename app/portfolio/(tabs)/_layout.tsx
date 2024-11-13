import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import PortFolioHeader from "../../../components/PortFolioHeader";
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
      }}
    >
      <Tabs.Screen
        name="hobbies"
        options={{
          title: "Hobbies",
          tabBarIcon: () => <Entypo name="book" />,
          header: () => <PortFolioHeader />,
        }}
      />
      <Tabs.Screen
        name="repository"
        options={{
          title: "Repository",
          tabBarIcon: () => <Entypo name="github" />,
          header: () => <PortFolioHeader />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({});
