// client\js\index.js
import { getWidgetFromAPI } from "./services.js";
console.log("Script loaded");

// Design dictionary
const design = {
  article: renderArticleDesign,
  list: renderListDesign,
  layers: renderLayerDesign,
};

const typeDesign = {
  article: "article",
  list: "list",
  layers: "layers",
};

// Choose a design type: 'article', 'list', or 'layers'
const DESIGN_TYPE = typeDesign.list;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const widgetData = await getWidgetFromAPI();
    if (widgetData) {
      renderWidget(widgetData, DESIGN_TYPE);
    }
  } catch (error) {
    console.error("Error loading widgetData:", error);
  }
});

export const renderWidget = (data, designType) => {
  const widgetContainer = document.getElementById(window.widgetId);

  // Clear existing content
  widgetContainer.innerHTML = "";

  data.list.forEach((item) => {
    const containerItem = document.createElement("div");

    // Apply the selected design type
    design[designType](item, containerItem);

    // Event listener for click behavior
    containerItem.addEventListener("click", () => {
      if (item.origin === "sponsored") {
        window.open(item.url, "_blank");
      } else {
        window.location.href = item.url;
      }
    });

    widgetContainer.appendChild(containerItem);
  });
};

// Design 1: "Article" style (3 articles per row)
export function renderArticleDesign(item, container) {
  container.classList.add("article-design");

  // Media (image, gif, video) - top of the card
  const mediaElement = createMediaElement(item);
  container.appendChild(mediaElement);

  // Content container for the title and branding - bottom of the card
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content-container");

  // Article name (inside the content container)
  const title = createTitleElement(item);
  contentContainer.appendChild(title);

  // Branding (inside the content container)
  const branding = createBrandingElement(item);
  contentContainer.appendChild(branding);

  // Append content container to the main container
  container.appendChild(contentContainer);
}

// Design 2: "List" style (2 articles per row)
export function renderListDesign(item, container) {
  container.classList.add("list-design");

  // Media on the left
  const mediaElement = createMediaElement(item);
  container.appendChild(mediaElement);

  // Content on the right
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("content");

  const title = createTitleElement(item);
  contentDiv.appendChild(title);

  const branding = createBrandingElement(item);
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
  const mediaElement = createMediaElement(item);
  mediaContainer.appendChild(mediaElement);

  // Title overlay on the image
  const titleOverlay = document.createElement("div");
  titleOverlay.classList.add("title-overlay");

  const title = createTitleElement(item);
  titleOverlay.appendChild(title);

  mediaContainer.appendChild(titleOverlay);

  // Append the media container to the main container (top of the card)
  container.appendChild(mediaContainer);

  // Branding and time (at the bottom of the card)
  const branding = createBrandingElement(item);
  container.appendChild(branding);
}

// Function to get the media element based on file type
export const getMediaElement = (url) => {
  const extension = url.split(".").pop();
  let element;

  if (["mp4", "webm", "ogg"].includes(extension)) {
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

// Function to calculate time ago
const getTimeAgo = (createdDate) => {
  const now = new Date();
  const created = new Date(createdDate);
  const diffInSeconds = Math.floor((now - created) / 1000);

  if (diffInSeconds < 3600) {
    return strTimeAgo(diffInSeconds, 60, "minute");
  } else if (diffInSeconds < 86400) {
    return strTimeAgo(diffInSeconds, 3600, "hour");
  } else if (diffInSeconds < 604800) {
    return strTimeAgo(diffInSeconds, 86400, "day");
  } else if (diffInSeconds < 31536000) {
    return strTimeAgo(diffInSeconds, 604800, "week");
  } else {
    return strTimeAgo(diffInSeconds, 31536000, "year");
  }
};

// Helper function to format the time
const strTimeAgo = (seconds, unitInSeconds, unitName) => {
  const time = Math.floor(seconds / unitInSeconds);
  return `${time} ${unitName}${time !== 1 ? "s" : ""} ago`;
};

const createMediaElement = (item) => {
  const mediaElement = getMediaElement(item.thumbnail[0].url);
  mediaElement.classList.add("media");
  return mediaElement;
};

const createTitleElement = (item) => {
  const title = document.createElement("p");
  title.textContent = item.name;
  title.classList.add("title");
  return title;
};

export const createBrandingElement = (item) => {
  const branding = document.createElement("p");
  if (DESIGN_TYPE === "layers") {
    branding.textContent = `${item.branding} | ${getTimeAgo(item.created)}`;
  } else {
    branding.textContent = item.branding;
  }
  branding.classList.add("branding");
  return branding;
};
