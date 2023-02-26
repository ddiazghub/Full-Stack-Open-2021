import IAuthor from "../types/interfaces/iauthor";
import IBlog from "../types/interfaces/iblog";

const dummy = (blogs: IBlog[]): number => 1;

const totalLikes = (blogs: IBlog[]): number => (
  blogs.reduce<number>((sum: number, current: IBlog) => sum + current.likes, 0)
);

/*
const favoriteBlog = (blogs: IBlog[]): IBlog | null => {
  const favorite = blogs.reduce((fav, current) => (
    current.likes > fav.likes ? current : fav
  ), { title: "", author: "", url: "", likes: Number.MIN_SAFE_INTEGER });

  return favorite.likes === Number.MIN_SAFE_INTEGER ? null : {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes
  };
};
*/

const mostBlogs = (blogs: IBlog[]): IAuthor | null => {
  const authors: { [name: string]: number } = {};

  for (let blog of blogs) {
    if (authors[blog.author] === undefined)
      authors[blog.author] = 1;
    else
      authors[blog.author]++;
  }
  
  const authorWithMostBlogs = Object.entries(authors).reduce<IAuthor>((most: IAuthor, current: [string, number]) => (
    current[1] > most.blogs! ? { name: current[0], blogs: current[1] } : most
  ), { name: "", blogs: Number.MIN_SAFE_INTEGER });
  
  return authorWithMostBlogs.blogs === Number.MIN_SAFE_INTEGER ? null : authorWithMostBlogs;
};

const mostLikes = (blogs: IBlog[]): IAuthor | null => {
  const authors: { [name: string]: number } = {};

  for (let blog of blogs) {
    if (authors[blog.author] === undefined)
      authors[blog.author] = blog.likes;
    else
      authors[blog.author] += blog.likes;
  }
  
  const authorWithMostLikes = Object.entries(authors).reduce<IAuthor>((most: IAuthor, current: [string, number]) => (
    current[1] > most.likes! ? { name: current[0], likes: current[1] } : most
  ), { name: "", likes: Number.MIN_SAFE_INTEGER });
  
  return authorWithMostLikes.likes === Number.MIN_SAFE_INTEGER ? null : authorWithMostLikes;
};

export default {
  dummy,
  totalLikes,
  //favoriteBlog,
  mostBlogs,
  mostLikes
};