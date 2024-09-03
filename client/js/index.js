// client\js\index.js
import { getWidgetFromAPI } from "./services.js";
console.log("Script loaded");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const recommendations = await getWidgetFromAPI();
    if (recommendations) {
      renderWidget(recommendations);
    }
  } catch (error) {
    console.error("Error loading recommendations:", error);
  }
});

function renderWidget(data) {
  const widgetContainer = document.getElementById("widget-container");
  console.log(data.list);
  data.list.forEach((item) => {
    const recommendationItem = document.createElement("div");
    recommendationItem.classList.add("recommendation-item");

    const thumbnail = document.createElement("img");
    thumbnail.src = item.thumbnail[0].url;
    thumbnail.alt = item.name;

    const caption = document.createElement("p");
    caption.textContent = item.name;

    recommendationItem.appendChild(thumbnail);
    recommendationItem.appendChild(caption);

    if (item.origin === "sponsored") {
      recommendationItem.addEventListener("click", () => {
        window.open(item.url, "_blank");
      });
    } else {
      recommendationItem.addEventListener("click", () => {
        window.location.href = item.url;
      });
    }

    widgetContainer.appendChild(recommendationItem);
  });
}
