// test/dataFetching.test.js
import request from "supertest";
import { server } from "../server/server.js";
import assert from "assert"; // Use assert instead of expect

describe("Taboola Widgets Endpoint Tests", () => {
  after(function () {
    server.close(); // Ensure the server is closed after all tests
  });

  // Test for successful data fetching from the API
  describe("Successful Data Fetch", () => {
    it("should return status 200 and JSON data when API call is successful", async () => {
      const res = await request(server).get("/taboola/widgets");
      assert.strictEqual(res.statusCode, 200);
    });
  });

  // Separate test for checking if the body.list contains exactly 6 objects
  describe("Data Validation", () => {
    it("should return exactly 6 objects in body.list", async () => {
      const res = await request(server).get("/taboola/widgets");

      // Assert that body.list exists and contains exactly 6 objects
      assert.ok(Array.isArray(res.body.list));
      assert.strictEqual(res.body.list.length, 6);
    });
  });

  // Test with an invalid API key
  describe("Invalid API Key", () => {
    it("should return status 500 with an invalid API key", async () => {
      const res = await request(server).get("/test/widgets").query({
        apikey: "invalid_568_88key55api_5381",
      });
      assert.strictEqual(res.statusCode, 500);
    });
  });

  // Test with an invalid API key and check logging
  describe("Logging Check for Invalid API Key", () => {
    it("should log an error message when the API key is invalid", async () => {
      const res = await request(server).get("/test/widgets").query({
        apikey: "invalid_568_88key55api_5381",
      });
      assert.strictEqual(res.text, "Error fetching data from Taboola API");
    });
  });
});
