// test/serverResponse.test.js
import request from "supertest";
import { server } from "../server/server.js";
import assert from "assert"; // Use assert instead of expect

// General Server Response Tests
describe("General Server Response Tests", () => {
  after(function () {
    server.close(); // Ensure the server is closed after all tests
  });

  // Test for server startup and port configuration
  describe("Server Startup and Port Configuration", () => {
    it("should run the server on the specified port", async () => {
      const res = await request(server).get("/");
      assert.strictEqual(res.statusCode, 200);
    });
  });

  // Test for the home page route
  describe("Home Page Route (/)", () => {
    it("should respond with status 200 and return HTML content", async () => {
      const res = await request(server).get("/");
      assert.match(res.headers["content-type"], /html/);
    });
  });

  // Test for invalid routes (404)
  describe("Invalid Route Handling", () => {
    it("should return a 404 status for non-existent routes", async () => {
      const res = await request(server).get("/non-existent-route");
      assert.strictEqual(res.statusCode, 404);
    });
  });

  // Test for CORS headers
  describe("CORS Configuration", () => {
    it("should include CORS headers", async () => {
      const res = await request(server).get("/");
      assert.strictEqual(res.headers["access-control-allow-origin"], "*");
    });
  });
});
