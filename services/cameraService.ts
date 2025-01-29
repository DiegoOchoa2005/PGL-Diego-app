// hacer el servicio de get-all de las imágenes

import { API_PORT } from "../ports/api.port";
import axios from "axios";

const getAllImages = async (userToken: string) => {
  try {
    const response = await axios.get(`${API_PORT}/images/get-all`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data.object;
  } catch (error) {
    console.log("Error al obtener las imágenes:", error);
    return [];
  }
};

export const cameraService = {
  getAllImages,
};
