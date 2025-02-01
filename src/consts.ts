import { SearchData } from "./types";

export const searchDataInit: SearchData = {
  type: "Round trip",
  originSkyId: "",
  originEntityId: "",
  destinationSkyId: "",
  destinationEntityId: "",
  date: "",
  returnDate: "",
  cabinClass: "economy",
  adults: "1",
};
export const cabinClassDic = {
  economy: "Economy",
  premium_economy: "Premium Economy",
  business: "Business",
  first: "First",
};

export const cabinClassArr = [
  "economy",
  "premium_economy",
  "business",
  "first",
];

export const adultsNumberArr = ["1", "2", "3", "4", "5", "6", "7", "8"];
