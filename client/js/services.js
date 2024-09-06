import { responseData } from "./responseData.js";

// client\js\services
console.log("services.js loaded");

export const getWidgetFromAPI = async () => {
  try {
    const endpoint = "http://localhost:3000/taboola/widgets";
    let response = await axios.get(endpoint);
    console.log("Data fetched successfully:", response);
    // return response.data;
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error fetching widget data:", error);
  }
};
