import { userInfo } from "os";
import React, { useRef } from "react";
import IBlog from "../utils/interfaces/IBlog";
import IUserSessionData from "../utils/interfaces/IUserSessionData";
import CreateBlogForm, { ICreateBlogFormProps } from "./CreateBlogForm";
import Togglable from "./Togglable";

interface IBlogListHomeProps extends ICreateBlogFormProps {
  user: IUserSessionData,
  blogs: IBlog[],
  onClick: () => void
}

const BlogListHome = (props: IBlogListHomeProps): JSX.Element => {
  return (
    <div>
      <p>{props.user.name} logged in <button onClick={props.onClick}>Logout</button></p>
      
      <Togglable buttonLabel="Create blog">
        <CreateBlogForm {...{ ...props }} />
      </Togglable>
      
      <p>{props.blogs.map(blog => <span key={blog.id}>{blog.title} {blog.author}<br /></span>)}</p>
    </div>
  );
};

export default BlogListHome;