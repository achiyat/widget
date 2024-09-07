// client\js\services
console.log("services.js loaded");

export const getWidgetFromAPI = async () => {
  try {
    const endpoint = "http://localhost:3000/taboola/widgets";
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching widget data:", error);
  }
};
