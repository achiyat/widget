// client\js\index.js
import { getWidgetFromAPI } from "./services.js";
console.log("Script loaded");

// Design dictionary
const design = {
  article: renderArticleDesign,
  list: renderListDesign,
  layers: renderLayerDesign,
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const recommendations = await getWidgetFromAPI();
    if (recommendations) {
      // Choose a design type: 'article', 'list', or 'layers'
      const designType = "article";
      renderWidget(recommendations, designType);
    }
  } catch (error) {
    console.error("Error loading recommendations:", error);
  }
});

export const renderWidget = (data, designType) => {
  const widgetContainer = document.getElementById("widget-container");

  // Clear existing content
  widgetContainer.innerHTML = "";

  data.list.forEach((item) => {
    const recommendationItem = document.createElement("div");

    // Apply the selected design type
    design[designType](item, recommendationItem);

    // Event listener for click behavior
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
};

// Design 1: "Article" style (3 articles per row)
export function renderArticleDesign(item, container) {
  container.classList.add("article-design");

  // Media (image, gif, video) - top of the card
  const mediaElement = getMediaElement(item.thumbnail[0].url);
  mediaElement.classList.add("media");
  container.appendChild(mediaElement);

  // Content container for the title and branding - bottom of the card
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  // Article name (inside the content container)
  const title = document.createElement("p");
  title.textContent = truncateText(item.name);
  title.classList.add("article-title");
  contentContainer.appendChild(title);

  // Branding (inside the content container)
  const branding = document.createElement("p");
  branding.textContent = item.branding;
  branding.classList.add("branding");
  contentContainer.appendChild(branding);

  // Append content container to the main container
  container.appendChild(contentContainer);
}

// Design 2: "List" style (2 articles per row)
export function renderListDesign(item, container) {
  container.classList.add("list-design");

  // Media on the left
  const mediaElement = getMediaElement(item.thumbnail[0].url);
  mediaElement.classList.add("media");
  container.appendChild(mediaElement);

  // Content on the right
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  const title = document.createElement("p");
  title.textContent = truncateText(item.name, 50);
  title.classList.add("article-title");
  contentDiv.appendChild(title);

  const branding = document.createElement("p");
  branding.textContent = item.branding;
  branding.classList.add("branding");
  contentDiv.appendChild(branding);

  container.appendChild(contentDiv);
}

// Design 3: "Layers" style (3 articles per row)
export function renderLayerDesign(item, container) {
  container.classList.add("layer-design");

  // Create a container for the image and title
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("media-container");

  // Media (image or video)
  const mediaElement = getMediaElement(item.thumbnail[0]?.url || "");

  if (mediaElement) {
    mediaElement.classList.add("media");
    mediaContainer.appendChild(mediaElement);
  }

  // Title overlay (this will stay at the bottom of the mediaContainer)
  const titleOverlay = document.createElement("div");
  titleOverlay.classList.add("title-overlay");

  const title = document.createElement("p");
  title.textContent = truncateText(item.name);
  title.classList.add("article-title");
  titleOverlay.appendChild(title);

  mediaContainer.appendChild(titleOverlay);

  // Append the media container (wrapping both image and title) to the main container
  container.appendChild(mediaContainer);

  // Branding and time (at the bottom of the card)
  const branding = document.createElement("p");
  branding.textContent = `${item.branding} | ${getTimeAgo(item.created)}`;
  branding.classList.add("branding");

  // Append branding to the main container
  container.appendChild(branding);
}

// Function to get the media element based on file type
export const getMediaElement = (url) => {
  const extension = url.split(".").pop();
  let element;

  if (extension === "mp4") {
    element = document.createElement("video");
    element.src = url;
    element.autoplay = true; // start playing
    element.loop = true;
    element.muted = true; // Mute the video
    element.playsInline = true; // Ensures it plays inline on mobile browsers
  } else {
    element = document.createElement("img");
    element.src = url;
    element.alt = "media";
  }

  return element;
};

// Function to truncate text after a specified number of characters
export const truncateText = (text, maxLength = 60) => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

// Function to calculate time ago
export const getTimeAgo = (createdDate) => {
  const now = new Date();
  const created = new Date(createdDate);
  const diffInSeconds = Math.floor((now - created) / 1000);

  if (diffInSeconds < 3600) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else if (diffInSeconds < 86400) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  } else {
    const weeks = Math.floor(diffInSeconds / 604800);
    return `${weeks} weeks ago`;
  }
};
