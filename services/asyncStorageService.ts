import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY = "@user";
const getItem = async () => {
  try {
    const value = await AsyncStorage.getItem(KEY);
    return value;
  } catch (error) {
    console.error("Error al obtener el valor de la clave:", error);
  }
};

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem(KEY, value);
    console.log("Valor guardado correctamente", value);
  } catch (e) {
    console.error("Error al guardar el valor:", e);
  }
};

const removeItem = async () => {
  try {
    await AsyncStorage.removeItem(KEY);
    console.log("Valor eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar el valor de la clave:", error);
  }
};

export const asyncStorageService = {
  getItem,
  storeData,
  removeItem,
};
