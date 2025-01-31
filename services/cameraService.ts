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

const saveImage = async (userToken: string, image: any) => {
  try {
    await axios.post(
      `${API_PORT}/images/save`,
      {
        height: image.height,
        width: image.width,
        encodedData: image.base64!,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.log("Error al guardar la imagen:", error);
  }
};

export const cameraService = {
  getAllImages,
  saveImage,
};
