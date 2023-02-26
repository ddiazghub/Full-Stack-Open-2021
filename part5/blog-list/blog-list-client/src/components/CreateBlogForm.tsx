import React from "react";

export interface ICreateBlogFormProps {
  title: string,
  author: string,
  url: string,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  setTitle: (title: string) => void,
  setAuthor: (author: string) => void,
  setUrl: (url: string) => void
}

const CreateBlogForm = (props: ICreateBlogFormProps): JSX.Element => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Title: <input type="text" value={props.title} onChange={event => props.setTitle(event.target.value)} />
      </div>
      <div>
        Author: <input type="text" value={props.author} onChange={event => props.setAuthor(event.target.value)} />
      </div>
      <div>
        Url: <input type="text" value={props.url} onChange={event => props.setUrl(event.target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateBlogForm;