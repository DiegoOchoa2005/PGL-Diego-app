import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { registerService } from "../../services/registerService";
import { User } from "../../type/UserType";
import { router } from "expo-router";
import { Image as Gif } from "expo-image";
import { KURUKURU, WU_AI_NI } from "../../assets/gifs/chibis";
import handleSounds from "../../sounds/SoundHandler";
import ThemeContext from "../../context/ThemeContext";

const screenHeigth = Dimensions.get("screen").height;
const initialUserData: User = {
  fullName: "",
  email: "",
  pswd: "",
};

const RegisterPage = () => {
  const theme = useContext(ThemeContext);
  const [userData, setUserData] = useState<User>(initialUserData);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;

  const handleFullName = (fullName: string) => {
    setUserData({
      ...userData,
      fullName: fullName,
    });
  };

  const handleEmail = (email: string) => {
    setUserData({
      ...userData,
      email: email,
    });
    setIsEmailValid(emailRegex.test(email));
  };

  const handlePassword = (password: string) => {
    setUserData({
      ...userData,
      pswd: password,
    });
    setIsPasswordValid(passwordRegex.test(password));
  };

  const sendUserData = async () => {
    const response = await registerService.registerUser(userData);
    setTimeout(() => {
      if (response === 201) {
        router.navigate("../login/login");
      }
    }, 2500);
  };

  const checkAllInputs =
    userData.fullName.length === 0 ||
    userData.email.trim().length === 0 ||
    userData.pswd.trim().length === 0 ||
    !isEmailValid ||
    !isPasswordValid;

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundSecondary }]}
    >
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: theme.backgroundPrimary,
            borderColor: theme.borderColor,
          },
        ]}
      >
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: theme.textPrimary }]}>
            Registro
          </Text>
        </View>
        <View style={styles.inputs}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image
              source={require("../../assets/img/otherimages/anastisachibi.png")}
              style={[
                styles.image,
                { position: "absolute", right: 20, bottom: -10 },
              ]}
            />
            <Text
              style={[
                styles.labelInputs,
                { color: theme.textPrimary, width: "50%" },
              ]}
            >
              Nombre Completo
            </Text>
          </View>

          <TextInput
            placeholder="Nombre Completo"
            style={[
              styles.textInputs,
              {
                borderColor: theme.borderColor,
                backgroundColor: theme.backgroundSecondary,
              },
            ]}
            onChangeText={(fullName) => handleFullName(fullName)}
            value={userData.fullName}
          />
          <Text style={[styles.labelInputs, { color: theme.textPrimary }]}>
            Email
          </Text>

          <TextInput
            placeholder="Email"
            style={[
              styles.textInputs,
              {
                borderColor: isEmailValid ? theme.borderColor : "red",
                backgroundColor: theme.backgroundSecondary,
              },
            ]}
            keyboardType="email-address"
            onChangeText={(email) => handleEmail(email)}
            value={userData.email}
          />

          <Text style={[styles.labelInputs, { color: theme.textPrimary }]}>
            Contraseña
          </Text>
          <TextInput
            placeholder="Contraseña"
            style={[
              styles.textInputs,
              {
                borderColor: isPasswordValid ? theme.borderColor : "red",
                backgroundColor: theme.backgroundSecondary,
              },
            ]}
            onChangeText={(pass) => handlePassword(pass)}
            value={userData.pswd}
            secureTextEntry={true}
          />
          <Pressable
            style={[
              styles.registerButton,
              {
                opacity: checkAllInputs ? 0.5 : 1,
                backgroundColor: theme.backgroundSecondary,
              },
            ]}
            disabled={checkAllInputs}
            onPress={sendUserData}
          >
            <Text
              style={[styles.registerButtonText, { color: theme.textPrimary }]}
            >
              Registrarse
            </Text>
          </Pressable>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Pressable onPress={() => handleSounds("woaini")}>
              <Gif
                source={{ uri: WU_AI_NI }}
                style={{ width: 200, height: 200 }}
                autoplay
              />
            </Pressable>
            <Pressable onPress={() => handleSounds("kurukuru")}>
              <Gif
                source={{ uri: KURUKURU }}
                style={{ width: 200, height: 200 }}
                autoplay
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    margin: 10,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    height: "95%",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: screenHeigth / 9,
  },
  title: {
    fontSize: 40,
    textAlign: "left",
    paddingLeft: 20,
    fontWeight: "bold",
  },
  inputs: {
    flex: 1,
    flexDirection: "column",
    marginTop: screenHeigth / 8,
  },
  labelInputs: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    paddingLeft: 20,
  },
  textInputs: {
    borderWidth: 1,
    borderStyle: "solid",
    width: "90%",
    height: 40,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
  image: {
    alignSelf: "flex-end",
    height: 175,
    width: 175,
  },
  registerButton: {
    marginHorizontal: "auto",
    marginTop: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "45%",
  },
  registerButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
    textAlign: "center",
  },
});
