import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import theme from "../../styles/Colors";
import { registerService } from "../../services/registerService";
import { User } from "../../type/UserType";
import Toast from "react-native-toast-message";
import { Redirect, router, useRouter } from "expo-router";
const screenWidth = Dimensions.get("window").width;
const screenHeigth = Dimensions.get("screen").height;
const initialUserData: User = {
  fullName: "",
  email: "",
  pswd: "",
};
const RegisterPage = () => {
  const [userData, setUserData] = useState<User>(initialUserData);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

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
    try {
      const response = await registerService.registerUser(userData);
      if (response === 201) {
        router.navigate("../login/login");
      }
    } catch (error) {}
  };

  const checkAllInputs =
    userData.fullName.length === 0 ||
    userData.email.trim().length === 0 ||
    userData.pswd.trim().length === 0 ||
    !isEmailValid ||
    !isPasswordValid;

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.title}>
          <Text
            style={{
              fontSize: 40,
              textAlign: "left",
              paddingLeft: 20,
              fontWeight: "bold",
            }}
          >
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
            <Text style={[styles.labelInputs, { width: "50%" }]}>
              Nombre Completo
            </Text>
          </View>

          <TextInput
            placeholder="Nombre Completo"
            style={styles.textInputs}
            onChangeText={(fullName) => handleFullName(fullName)}
            value={userData.fullName}
          />
          <Text style={styles.labelInputs}>Email</Text>

          <TextInput
            placeholder="Email"
            style={[
              styles.textInputs,
              { borderColor: isEmailValid ? theme.light.borderColor : "red" },
            ]}
            keyboardType="email-address"
            onChangeText={(email) => handleEmail(email)}
            value={userData.email}
          />

          <Text style={styles.labelInputs}>Contraseña</Text>
          <TextInput
            placeholder="Contraseña"
            style={[
              styles.textInputs,
              {
                borderColor: isPasswordValid ? theme.light.borderColor : "red",
              },
            ]}
            onChangeText={(pass) => handlePassword(pass)}
            value={userData.pswd}
          />
          <Pressable
            style={[
              styles.registerButton,
              { opacity: checkAllInputs ? 0.5 : 1 },
            ]}
            disabled={checkAllInputs}
            onPress={sendUserData}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                padding: 20,
                textAlign: "center",
              }}
            >
              Registrarse
            </Text>
          </Pressable>
        </View>
        <Toast position="bottom" bottomOffset={20} />
      </View>
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.light.backgroundSecondary,
  },
  wrapper: {
    margin: 10,
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.light.backgroundPrimary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    height: "95%",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    marginTop: screenHeigth / 9,
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
    borderColor: theme.light.borderColor,
    borderWidth: 1,
    borderStyle: "solid",
    width: "90%",
    height: 40,
    backgroundColor: theme.light.backgroundSecondary,
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
    backgroundColor: theme.light.backgroundSecondary,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: theme.light.borderColor,
    width: "45%",
  },
});
