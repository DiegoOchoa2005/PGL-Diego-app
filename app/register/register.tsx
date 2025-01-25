import {
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
const screenWidth = Dimensions.get("window").width;
const screenHeigth = Dimensions.get("screen").height;
const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFullName = (fullName: string) => {
    setFullName(fullName);
  };

  const handleEmail = (email: string) => {
    setEmail(email);
  };

  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const checkAllInputs =
    fullName.trim().length === 0 ||
    email.trim().length === 0 ||
    password.trim().length === 0 ||
    console.log(password);
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
            value={fullName}
          />
          <Text style={styles.labelInputs}>Email</Text>
          <TextInput
            placeholder="Email"
            style={styles.textInputs}
            keyboardType="email-address"
            onChangeText={(email) => handleEmail(email)}
            value={email}
          />
          <Text style={styles.labelInputs}>Contraseña</Text>
          <TextInput
            placeholder="Contraseña"
            style={styles.textInputs}
            secureTextEntry={true}
            onChangeText={(pass) => handlePassword(pass)}
            value={password}
          />
          <Pressable
            style={[
              styles.registerButton,
              {
                opacity: checkAllInputs ? 0.5 : 1,
              },
            ]}
            disabled={checkAllInputs!}
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
