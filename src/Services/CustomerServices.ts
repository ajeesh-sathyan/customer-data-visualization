import { ICustomer } from "../Types/CustomerTypes";
import { convertCSVToJson } from "../Utilities/Utils";

export const getCustomers = async (): Promise<ICustomer[]> => {
  try {
    const response = await fetch("/data.csv");
    const csvText = await response.text();
    return convertCSVToJson(csvText) as ICustomer[];
  } catch (error) {
    console.error("Error fetching or parsing CSV file:", error);
    return [];
  }
};
