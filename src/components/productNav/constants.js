import { PRODUCT_CATEGORIES } from "../../store/constants";

export const categoriesDictionary = {
  sandwiches: "сэндвичи",
  shaurma: "шаурма",
  burgers: "бургеры",
  chicken: "курица & картофель",
  salads: "тортилья & салаты",
  drinks: "напитки & десерты",
  pizza: "пицца",
};

export const correctlyOrderedCategories = [
  PRODUCT_CATEGORIES.SHAURMA,
  PRODUCT_CATEGORIES.SANDWICHES,
  PRODUCT_CATEGORIES.BURGERS,
  PRODUCT_CATEGORIES.CHICKEN,
  PRODUCT_CATEGORIES.SALADS,
  PRODUCT_CATEGORIES.DRINKS,
  PRODUCT_CATEGORIES.PIZZA,
];
