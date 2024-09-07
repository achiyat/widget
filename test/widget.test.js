// test/widget.test.js
import assert from "assert";
import { JSDOM } from "jsdom";
import {
  renderWidget,
  renderArticleDesign,
  renderListDesign,
  renderLayerDesign,
  getMediaElement,
  truncateText,
  getTimeAgo,
} from "../client/js/index.js";
import { mockData } from "../client/js/mockData.js";

const { window } = new JSDOM(
  `<html><body><div id="widget-container"></div></body></html>`
);
const { document } = window;
global.document = document;
global.window = window;

// DOM Manipulation Tests
describe("DOM Manipulation Tests", () => {
  it("Element Creation based on design type", async () => {
    const widgetContainer = document.getElementById("widget-container");
    await renderWidget(mockData, "list");

    // Check for container elements
    assert.ok(widgetContainer);
    assert.ok(widgetContainer.querySelectorAll(".list-design").length > 0);
  });

  it("Class Application for design types", async () => {
    const widgetContainer = document.getElementById("widget-container");
    await renderWidget(mockData, "article");
    assert.ok(document.querySelector(".article-design"));
  });
});

// Design Function Tests
describe("Design Function Tests", () => {
  it("renderArticleDesign creates correct elements", () => {
    const container = document.createElement("div");
    renderArticleDesign(mockData.list[0], container);
    assert.ok(container.querySelector(".media"));
    assert.ok(container.querySelector(".content-container"));
    assert.strictEqual(
      container.querySelector(".article-title").textContent,
      truncateText(mockData.list[0].name)
    );
    assert.strictEqual(
      container.querySelector(".branding").textContent,
      mockData.list[0].branding
    );
  });

  it("renderListDesign creates correct elements", () => {
    const container = document.createElement("div");
    renderListDesign(mockData.list[0], container);
    assert.ok(container.querySelector(".media"));
    assert.ok(container.querySelector(".content"));
    assert.strictEqual(
      container.querySelector(".article-title").textContent,
      truncateText(mockData.list[0].name, 50)
    );
    assert.strictEqual(
      container.querySelector(".branding").textContent,
      mockData.list[0].branding
    );
  });

  it("renderLayerDesign creates correct elements", () => {
    const container = document.createElement("div");
    renderLayerDesign(mockData.list[0], container);
    assert.ok(container.querySelector(".media-container"));
    assert.ok(container.querySelector(".title-overlay"));
    assert.strictEqual(
      container.querySelector(".branding").textContent,
      `${mockData.list[0].branding} | ${getTimeAgo(mockData.list[0].created)}`
    );
  });
});

// Media Handling Tests
describe("Media Handling Tests", () => {
  it("Image Handling", () => {
    const imgUrl = "http://example.com/image.jpg";
    const element = getMediaElement(imgUrl);
    assert.strictEqual(element.tagName, "IMG");
    assert.strictEqual(element.src, imgUrl);
    assert.strictEqual(element.alt, "media");
  });

  it("Video Handling", () => {
    const videoUrl = "http://example.com/video.mp4";
    const element = getMediaElement(videoUrl);
    assert.strictEqual(element.tagName, "VIDEO");
    assert.strictEqual(element.src, videoUrl);
    assert.ok(element.autoplay);
    assert.ok(element.loop);
    assert.ok(element.muted);
    assert.ok(element.playsInline);
  });
});

// Text Handling Tests
describe("Text Handling Tests", () => {
  it("Text Truncation", () => {
    const longText = "This is a very long text that should be truncated";
    const truncatedText = truncateText(longText, 20);
    assert.strictEqual(truncatedText, "This is a very long ...");
  });
});

// Styling and Layout Tests
describe("Styling and Layout Tests", () => {
  it("CSS Styles", async () => {
    await renderWidget(mockData, "article");
    const item = document.querySelector(".article-design");
    const computedStyle = window.getComputedStyle(item);
    assert.strictEqual(computedStyle.display, "block"); // Check computed style instead of inline
  });
});
