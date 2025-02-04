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
import { User } from "../../type/UserType";
import { router } from "expo-router";
import { loginService } from "../../services/loginService";
import ThemeContext from "../../context/ThemeContext";

const screenHeigth = Dimensions.get("screen").height;
const initialUserData: User = {
  fullName: "",
  email: "",
  pswd: "",
};

const LoginPage = () => {
  const theme = useContext(ThemeContext);
  const [userData, setUserData] = useState<User>(initialUserData);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{10,}$/;

  const checkAllInputs =
    userData.email.trim().length === 0 ||
    userData.pswd.trim().length === 0 ||
    !isEmailValid ||
    !isPasswordValid;

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
    const response = await loginService.loginUser(userData);
    setTimeout(() => {
      if (response === 200 || response === 201) {
        router.navigate("../(drawer)/welcome/welcome");
      }
    }, 2500);
  };

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
            Iniciar{"\n"}Sesión{"\n"}\{"(•◡•)"}/
          </Text>
        </View>
        <View style={styles.inputs}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Image
              source={require("../../assets//img/otherimages/Nagisa.png")}
              style={[
                styles.image,
                { position: "absolute", right: -80, bottom: -5 },
              ]}
            />
            <Text style={[styles.labelInputs, { color: theme.textPrimary }]}>
              Email
            </Text>
          </View>
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
          <View style={styles.links}>
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
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  padding: 20,
                  textAlign: "center",
                  color: theme.textPrimary,
                }}
              >
                Entrar
              </Text>
            </Pressable>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                padding: 20,
                textAlign: "center",
                color: theme.textSecondary,
              }}
              onPress={() => router.navigate("../register/register")}
            >
              No tienes cuenta corazón?{"\n"}Pulsa aquí para registrarte
              {"\n(^-^)"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;

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
    marginTop: screenHeigth / 3,
  },
  title: {
    position: "absolute",
    top: screenHeigth / -6,
    fontSize: 60,
    textAlign: "center",
    paddingLeft: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  inputs: {
    flex: 1,
    flexDirection: "column",
    marginTop: screenHeigth / 8,
  },
  image: {
    height: 300,
    width: 300,
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
  links: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  registerButton: {
    marginHorizontal: "auto",
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "dashed",
    width: "45%",
  },
});
