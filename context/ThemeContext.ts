import { createContext } from "react";
type ThemeContextType = {
  backgroundPrimary: string;
  backgroundSecondary: string;
  textPrimary: string;
  textSecondary: string;
  borderColor: string;
};

const ThemeContext = createContext<ThemeContextType>({
  backgroundPrimary: "",
  backgroundSecondary: "",
  textPrimary: "",
  textSecondary: "",
  borderColor: "",
});
export default ThemeContext;
