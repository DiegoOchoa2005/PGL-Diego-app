import React, { useContext, useEffect, useState } from "react";
import {
  ImageSourcePropType,
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import theme from "../styles/Colors";
import { Audio } from "expo-av";

export type CardProps = {
  avatar: ImageSourcePropType;
  title: string;
  description: string;
};

export const Card = ({ avatar, title, description }: CardProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const loadSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../sounds/baby.mp3")
      );
      setSound(sound);
    } catch (error) {
      console.error("Error al cargar el sonido:", error);
    }
  };
  const playSound = async () => {
    await loadSound();
    if (sound != null) {
      await sound.playAsync();
    }
  };

  const handleSounds = async () => {
    await loadSound();
    await playSound();
  };

  return (
    <View style={styles.cardContainer}>
      <Pressable
        style={styles.cardAvatar}
        onPress={() => {
          handleSounds();
        }}
      >
        <Image style={styles.avatar} source={avatar} />
      </Pressable>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    width: 380,
    height: "auto",
    maxWidth: 380,
  },
  cardInfo: {
    display: "flex",
    flexDirection: "column",
    borderStyle: "dashed",
    borderWidth: 1,
    marginHorizontal: "auto",
    marginTop: 6,
    marginBottom: 6,
    padding: 5,
    borderRadius: 10,
    maxWidth: 390,
    maxHeight: 110,
    backgroundColor: theme.light.backgroundSecondary,
    borderColor: theme.light.borderColor,
  },
  cardAvatar: {
    marginHorizontal: "auto",
    paddingTop: 10,
  },
  cardTitle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: theme.light.textPrimary,
    borderColor: theme.light.borderColor,
  },
  cardDescription: {
    padding: 5,
    fontSize: 16,
    textAlign: "justify",
    color: theme.light.textSecondary,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
