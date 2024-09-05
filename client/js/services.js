// client\js\services.js
console.log("services.js loaded");

export const getWidgetFromAPI = async () => {
  try {
    const endpoint = "http://localhost:3000/taboola/widgets";
    let response = await axios.get(endpoint);
    console.log("Data fetched successfully:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching widget data:", error);
  }
};
