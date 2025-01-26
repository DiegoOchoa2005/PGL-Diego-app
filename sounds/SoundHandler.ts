import { Audio } from "expo-av";
const soundMap: { [key: string]: any } = {
  baby: require("./baby.mp3"),
  cachetada: require("./cachetada.mp3"),
  kurukuru: require("./kurukuru.mp3"),
  "wo ai ni": require("./wo ai ni.mp3"),
};

const loadSound = async (fileName: string) => {
  try {
    const soundFile = soundMap[fileName];
    if (!soundFile) {
      throw new Error(
        `El archivo de sonido "${fileName}" no existe en el mapa.`
      );
    }

    const { sound } = await Audio.Sound.createAsync(soundFile);
    return sound;
  } catch (error) {
    console.error("Error al cargar el sonido:", error);
  }
};

const playSound = async (fileName: string) => {
  const sound = await loadSound(fileName);
  if (sound != null) {
    await sound.playAsync();
  }
};

const handleSounds = async (fileName: string) => {
  await playSound(fileName);
};

export default handleSounds;
