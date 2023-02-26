import supertest from "supertest";
import app from "../app";
import apiTestHelper from "../utils/api_test_helper";
import User from "../models/user";
import { connection } from "mongoose";
import IUser from "../types/interfaces/iuser";
import * as bcrypt from "bcrypt";
import ICredentials from "../types/interfaces/icredentials";

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(apiTestHelper.initialUsers);
});

describe("Route POST /api/login works correctly", () => {
  test("Response headers are correct with token and user data returned on the response body", async () => {
    const credentials: ICredentials = {
      username: "root",
      password: "secret"
    };

    const response = await api.post("/api/login")
      .send(credentials)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body.token).toBeDefined();
    expect(response.body.username).toBe(credentials.username);
    expect(response.body.name).toBe("admin");
  }, 15000);

  test("Invalid login data is rejected", async () => {
    const invalidCredentials = [
      {
        username: "nonexistent user",
        password: "15124523"
      },
      {
        username: "root",
        password: "wrong password"
      },
      {
        password: "I forgot my username"
      },
      {
        username: "hackerman"
      },
      {

      }
    ];

    for (let credentials of invalidCredentials) {
      const response = await api.post("/api/login")
        .send(credentials)
        .expect(401);
      
      expect(response.body.error).toBeDefined();
    }
  });
});

afterAll(async () => {
  await connection.close();
});