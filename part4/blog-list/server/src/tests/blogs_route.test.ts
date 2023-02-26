import supertest from "supertest";
import app from "../app";
import apiTestHelper from "../utils/api_test_helper";
import Blog from "../models/blog";
import { connection } from "mongoose";
import IBlog from "../types/interfaces/iblog";
import User from "../models/user";
import IUserToken from "../types/interfaces/iusertoken";

const api = supertest(app);
let token: string = "";

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(apiTestHelper.initialUsers);
  await Blog.deleteMany({});

  const response = await api.post("/api/login")
    .send({ username: "root", password: "secret" });
  
  token = (response.body as { token: string }).token;

  for (let blog of apiTestHelper.initialBlogs) {
    await api.post("/api/blogs")
      .set('Authorization', `bearer ${token}`)
      .send(blog);
  }
});

test("Route GET /api/blogs works correctly", async () => {
  await api.get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
  
  expect(await apiTestHelper.blogsInDb()).toBe(apiTestHelper.initialBlogs.length);
}, 15000);

test("Blog posts contain the property id", async () => {
  const blogs = await api.get("/api/blogs");
  
  expect(blogs.body[0].id).toBeDefined();
}, 15000);

describe("Route POST /api/blogs works correctly", () => {
  test("Route POST /api/blogs requires login", async () => {
    const blogToAdd = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    };
  
    await api.post("/api/blogs")
      .send(blogToAdd)
      .expect(401);
    
    expect(await apiTestHelper.blogsInDb()).toBe(apiTestHelper.initialBlogs.length);
  }, 15000);
  
  test("Route POST /api/blogs works correctly after login", async () => {
    const blogToAdd = {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    };
  
    await api.post("/api/blogs")
      .set('Authorization', `bearer ${token}`)
      .send(blogToAdd)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    
    expect(await apiTestHelper.blogsInDb()).toBe(apiTestHelper.initialBlogs.length + 1);
  }, 15000);
  
  test("If no likes property is sent in the body to route POST /api/blogs, likes default to 0", async () => {
    const blogToAdd = {
      title: "Something",
      author: "Michael Chan",
      url: "https://reactpatterns.com/"
    };
  
    const response = await api.post("/api/blogs")
      .set('Authorization', `bearer ${token}`)
      .send(blogToAdd)
      .expect(201)
      .expect("Content-Type", /application\/json/);
    
    const blog = response.body as IBlog;
    expect(blog.likes).toBe(0);
  }, 15000);
  
  test("If no title or url properties are sent in the body to route POST /api/blogs, the server responds with code 400", async () => {
    const blogsToAdd = [
      {
        author: "someone",
        url: "something"
      },
      {
        title: "something else",
        author: "someone",
      }
    ];
  
    for (let blog of blogsToAdd) {
      await api.post("/api/blogs")
        .set('Authorization', `bearer ${token}`)
        .send(blog)
        .expect(400);
    }
  }, 15000);
});

describe("Route DELETE /api/blogs/:id works correctly", () => {
  test("Deleting a blog requires login", async () => {
    await api.delete(`/api/blogs/${(await Blog.findOne({}))!.id}`)
      .expect(401);
    
    expect(await apiTestHelper.blogsInDb()).toBe(apiTestHelper.initialBlogs.length);
  }, 15000);
  
  test("Deleting a book can only be done by the user who created it", async () => {
    const response = await api.post("/api/login")
    .send({ username: "user", password: "password" });
  
    const newToken = (response.body as { token: string }).token;

    console.log(await Blog.find({}));
  
    await api.delete(`/api/blogs/${(await Blog.findOne({}))!.id}`)
      .set('Authorization', `bearer ${newToken}`)
      .expect(403);
    
    expect(await apiTestHelper.blogsInDb()).toBe(apiTestHelper.initialBlogs.length);

    await api.delete(`/api/blogs/${(await Blog.findOne({}))!.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204);
    
    expect(await apiTestHelper.blogsInDb()).toBe(apiTestHelper.initialBlogs.length - 1);
  }, 15000);
});

afterAll(async () => {
  await connection.close();
});