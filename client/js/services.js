// client\js\services.js
console.log("services.js loaded");

export const getWidgetFromAPI = async (_id = "") => {
  try {
    console.log(_id);
    const endpoint = "http://localhost:3000/taboola/widgets";
    let response = await axios.get(endpoint, {
      params: { id: _id },
    });
    console.log("Data fetched successfully:", response);
    return response;
  } catch (error) {
    console.error("Error fetching widget data:", error);
  }
};
