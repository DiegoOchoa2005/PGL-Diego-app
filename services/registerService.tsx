import axios, { AxiosError } from "axios";
import { User } from "../type/UserType";
import Toast from "react-native-toast-message";

const API_PORT = "http://192.168.1.129:5000";

const registerUser = async (user: User) => {
  let status = 0;
  try {
    const response = await axios.post(
      `${API_PORT}/auth/register`,
      {
        fullname: user.fullName,
        email: user.email,
        pswd: user.pswd,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status === 201) {
      Toast.show({
        type: "success",
        text1: "Registro exitoso",
        text2: "¡Bienvenido!",
      });
    }
    return response.status;
  } catch (error) {
    if (error instanceof AxiosError && error.status === 409) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ya existe un usuario con estos datos",
      });
      status = error.status;
    } else if (error instanceof AxiosError && error.status === 400) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Hubo un error en el registro!",
      });
      status = error.status;
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error inesperado",
      });
    }
  }
  return status;
};

export const registerService = {
  registerUser,
};
