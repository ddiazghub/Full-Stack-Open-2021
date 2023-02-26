import IBlog from "../types/interfaces/iblog";
import Blog from "../models/blog";
import IUser from "../types/interfaces/iuser";
import User from "../models/user";

const initialUsers = [
  {
    _id: "61caa8c8525bda73f2513ae8",
    name: "admin",
    username: "root",
    passwordHash: "$2b$10$NcQO.DQEWJX2DhPEwCS7O.Fk8CFHneHasFdjYFQyikJdvLgrdJMqG", // secret
    blogs: []
  },
  {
    _id: "61caa8c8525bda73f2513ae5",
    name: "someone",
    username: "user",
    passwordHash: "$2b$10$6mhnvhswg0RJDzuYnBgqE.omePXqFpqECNZGqEnSfzbjG3Abq9wai", // password
    blogs: []
  }
];

const initialBlogs: IBlog[] = [
  {
    id: "61caa8c8525bda73f2513ae1",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "61caa8c8525bda73f2513ae8"
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "61caa8c8525bda73f2513ae8"
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "61caa8c8525bda73f2513ae8"
  }
];

const blogsInDb = async (): Promise<number> => {
  const blogs = await Blog.find({});
  return blogs.length;
};

export default {
  initialBlogs,
  blogsInDb,
  initialUsers
};