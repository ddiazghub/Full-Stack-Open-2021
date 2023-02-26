import supertest from "supertest";
import app from "../app";
import apiTestHelper from "../utils/api_test_helper";
import User from "../models/user";
import { connection } from "mongoose";
import IUser from "../types/interfaces/iuser";
import * as bcrypt from "bcrypt";

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(apiTestHelper.initialUsers);
});

test("Bcrypt works", async () => {
  const password: string = "secretpassword";
  const hash: string = await bcrypt.hash(password, 10);
  
  expect(await bcrypt.compare(password, hash)).toBe(true);
  expect(await bcrypt.compare("someotherpassword", hash)).toBe(false);
});

describe("Route GET /api/users works correctly", () => {
  test("Response headers are correct", async () => {
    await api.get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  }, 15000);

  test("The correct number of users is returned", async () => {
    const response = await api.get("/api/users");
    expect(response.body).toHaveLength(apiTestHelper.initialUsers.length);
  });
});

describe("Route POST /api/users works correctly", () => {
  test("Response headers and returned user info are correct", async () => {
    const userToAdd: IUser = {
      name: "Some user",
      username: "seconduser",
      password: "mysecret",
      blogs: []
    };

    const response = await api.post("/api/users")
      .send(userToAdd)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  
    const addedUser = response.body as IUser;

    expect(addedUser.name).toBe(userToAdd.name);
    expect(addedUser.username).toBe(userToAdd.username);
    expect(await User.find({})).toHaveLength(apiTestHelper.initialUsers.length + 1);
  }, 15000);

  test("Invalid users are not created", async () => {
    const invalidUsers = [
      {
        name: "Some user",
        password: "mysecret"
      },
      {
        username: "someone"
      },
      {
        username: "root",
        password: "something"
      },
      {
        username: "x",
        password: "something else"
      },
      {
        username: "xyze",
        password: "dk"
      }
    ];

    for (const user of invalidUsers) {
      const response = await api.post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/);
      
      expect(response.body.error).toBeDefined();
    }

    expect(await User.find({})).toHaveLength(apiTestHelper.initialUsers.length);
  });
});

afterAll(async () => {
  await connection.close();
});