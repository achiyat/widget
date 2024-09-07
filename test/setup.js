// test/setup.js
import { JSDOM } from "jsdom";

const { window } = new JSDOM("<!doctype html><html><body></body></html>");
global.window = window;
global.document = window.document;
global.HTMLElement = window.HTMLElement;
global.DocumentFragment = window.DocumentFragment;
global.Node = window.Node;
global.customElements = window.customElements;
