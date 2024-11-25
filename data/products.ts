import uuid from "react-native-uuid";
import { ProductProps } from "../components/Product";
export const products: ProductProps[] = [
  {
    id: uuid.v4(),
    productName: "Pan",
    category: "Bakery",
    ammount: 2,
    pricePerUnit: 2.5,
    isInShoppingCart: true,
  },
  {
    id: uuid.v4(),
    productName: "Atun",
    category: "Fishes",
    ammount: 2,
    pricePerUnit: 1.5,
    isInShoppingCart: false,
  },
  {
    id: uuid.v4(),
    productName: "Chocolate",
    category: "Sweets",
    ammount: 2,
    pricePerUnit: 3.5,
    isInShoppingCart: true,
  },
];
