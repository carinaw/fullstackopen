const listHelper = require("../utils/list_helper");

describe("return 1 check", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
  });
});

describe("totalLikes", () => {
  test("total likes of multiple posts", () => {
    const blogPosts = [
      {
        title: "WOLVES",
        author: "CA",
        url: "wolves",
        likes: 4,
        id: "65749f96d64b18d62257297f",
      },
      {
        title: "Raw feeding is important",
        author: "AM",
        url: "raw-feeding",
        likes: 3,
        id: "65758a5351784968b521fb13",
      },
      {
        title: "Activation games",
        author: "PK",
        url: "activation-games-2023",
        likes: 3,
        id: "65758a6851784968b521fb15",
      },
    ];

    const result = listHelper.totalLikes(blogPosts);
    expect(result).toBe(10);
  });
});

describe("favoriteBlog", () => {
  test("post with most likes", () => {
    const blogPosts = [
      {
        title: "WOLVES",
        author: "CA",
        url: "wolves",
        likes: 4,
        id: "65749f96d64b18d62257297f",
      },
      {
        title: "Raw feeding is important",
        author: "AM",
        url: "raw-feeding",
        likes: 3,
        id: "65758a5351784968b521fb13",
      },
      {
        title: "Activation games",
        author: "CA",
        url: "activation-games-2023",
        likes: 3,
        id: "65758a6851784968b521fb15",
      },
      {
        title: "Hobby sports",
        author: "NT",
        url: "nose-work-and-such",
        likes: 7,
        id: "65758a6851784968b521f2456",
      },
    ];
    const result = listHelper.favoriteBlog(blogPosts);
    console.log(result);
    expect(result).toEqual(blogPosts[3]);
  });
});

describe("mostBlogs", () => {
  test("author with most blog posts", () => {
    const blogPosts = [
      {
        title: "WOLVES",
        author: "CA",
        url: "wolves",
        likes: 4,
        id: "65749f96d64b18d62257297f",
      },
      {
        title: "Raw feeding is important",
        author: "AM",
        url: "raw-feeding",
        likes: 3,
        id: "65758a5351784968b521fb13",
      },
      {
        title: "Activation games",
        author: "CA",
        url: "activation-games-2023",
        likes: 3,
        id: "65758a6851784968b521fb15",
      },
      {
        title: "Hobby sports",
        author: "NT",
        url: "nose-work-and-such",
        likes: 7,
        id: "65758a6851784968b521f2456",
      },
    ];
    const result = listHelper.mostBlogs(blogPosts);
    console.log(result);
    expect(result).toEqual({ author: "CA", posts: 2 });
  });
});

describe("most liked author", () => {
  test("author with most likes overall", () => {
    const blogPosts = [
      {
        title: "WOLVES",
        author: "CA",
        url: "wolves",
        likes: 4,
        id: "65749f96d64b18d62257297f",
      },
      {
        title: "Raw feeding is important",
        author: "AM",
        url: "raw-feeding",
        likes: 3,
        id: "65758a5351784968b521fb13",
      },
      {
        title: "Activation games",
        author: "CA",
        url: "activation-games-2023",
        likes: 8,
        id: "65758a6851784968b521fb15",
      },
      {
        title: "Hobby sports",
        author: "NT",
        url: "nose-work-and-such",
        likes: 7,
        id: "65758a6851784968b521f2456",
      },
    ];
    const result = listHelper.mostLikedAuthor(blogPosts);
    console.log(result);
    expect(result).toEqual({ author: "CA", likes: 12 });
  });
});
