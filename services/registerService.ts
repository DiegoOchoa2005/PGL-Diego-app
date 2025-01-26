import axios, { AxiosError } from "axios";
import { User } from "../type/UserType";
import Toast from "react-native-toast-message";
import { API_PORT } from "../ports/api.port";

const registerUser = async (user: User) => {
  let status = 500;
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

    Toast.show({
      type: "success",
      text1: "Se ha registrado correctamente",
      text2: "Puedes iniciar sesión mi panita :3",
    });

    return response.status;
  } catch (error) {
    if (error instanceof AxiosError && error.status === 409) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "El usuario ya existe, revise los datos 😢",
      });
      status = error.status;
    } else if (error instanceof AxiosError && error.status === 400) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Hubo un error en el registro, revise los datos 😢",
      });
      status = error.status;
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error del servidor 💀",
      });
    }
  }
  return status;
};

export const registerService = {
  registerUser,
};
