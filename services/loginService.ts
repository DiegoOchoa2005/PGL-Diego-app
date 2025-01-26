import axios, { AxiosError } from "axios";
import { User } from "../type/UserType";
import { API_PORT } from "../ports/api.port";
import Toast from "react-native-toast-message";
import { asyncStorageService } from "./asyncStorageService";

const loginUser = async (user: User) => {
  let status = 500;
  try {
    const response = await axios.post(
      `${API_PORT}/auth/login`,
      {
        email: user.email,
        pswd: user.pswd,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    const token = response.data.object.token;
    await asyncStorageService.storeData(token);
    Toast.show({
      type: "success",
      text1: "¡Bienvenido!",
      text2: "Has iniciado sesión correctamente 😁",
    });

    return response.status;
  } catch (error) {
    if (error instanceof AxiosError && error.status === 401) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Usuario o contraseña incorrectos 😢",
      });
      status = error.status;
    } else if (error instanceof AxiosError && error.status === 400) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Hubo un error al iniciar sesión, revise los datos 😢",
      });
      status = error.status;
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error del servidor 💀",
      });
    }
    return status;
  }
};

export const loginService = {
  loginUser,
};
