import list_helper from "../utils/list_helper";
/*
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
];

test("Dummy returns one", () => {
  expect(list_helper.dummy([])).toBe(1);
});

describe("Total likes", () => {
  test("of empty list are zero", () => {
    expect(list_helper.totalLikes([])).toBe(0);
  });

  test("when list has only one blog equals the likes of that blog", () => {
    expect(list_helper.totalLikes([blogs[0]])).toBe(blogs[0].likes);
  });

  test("of bigger list is calculated correctly", () => {
    expect(list_helper.totalLikes([...blogs])).toBe(36);
  });
});

describe("Favorite blog", () => {
  test("of empty list is null", () => {
    expect(list_helper.favoriteBlog([])).toBe(null);
  });

  test("when list has one blog is that blog", () => {
    expect(list_helper.favoriteBlog([blogs[0]])).toEqual({ author: blogs[0].author, likes: blogs[0].likes, title: blogs[0].title });
  });

  test("of bigger list is the blog with the most likes", () => {
    expect(list_helper.favoriteBlog(blogs)).toEqual({ author: blogs[2].author, likes: blogs[2].likes, title: blogs[2].title });
  });
});

describe("Author with most blogs", () => {
  test("of empty list is null", () => {
    expect(list_helper.mostBlogs([])).toBe(null);
  });

  test("when list has one blog is the author of that blog", () => {
    expect(list_helper.mostBlogs([blogs[0]])).toEqual({ name: blogs[0].author, blogs: 1 });
  });

  test("of bigger list is calculated correctly", () => {
    expect(list_helper.mostBlogs(blogs)).toEqual({ name: "Robert C. Martin", blogs: 3 });
  });
});

describe("Author with most likes", () => {
  test("of empty list is null", () => {
    expect(list_helper.mostLikes([])).toBe(null);
  });
  
  test("when list has one blog is calculated correctly", () => {
    expect(list_helper.mostLikes([blogs[0]])).toEqual({ name: blogs[0].author, likes: blogs[0].likes });
  });

  test("of bigger list is calculated correctly", () => {
    expect(list_helper.mostLikes(blogs)).toEqual({ name: "Edsger W. Dijkstra", likes: 17 });
  });
});*/