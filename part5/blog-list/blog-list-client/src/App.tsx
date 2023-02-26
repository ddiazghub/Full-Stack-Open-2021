import React, { useEffect, useState } from 'react';
import BlogListHome from './components/BlogListHome';
import LoginForm from './components/LoginForm';
import blogService from './services/BlogService';
import session from './services/UserSessionService';
import IBlog from './utils/interfaces/IBlog';
import ICredentials from './utils/interfaces/ICredentials';
import INotification from './utils/interfaces/INotification';
import IUserSessionData from './utils/interfaces/IUserSessionData';
import Notification from './components/Notification';
import NotificationType from './utils/enums/NotificationType';
import "./App.css"

const App = (): JSX.Element => {
  const [user, setUser] = useState<IUserSessionData | null>(null);
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [notification, setNotification] = useState<INotification | null>(null);
  
  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    
    if (storedUser) {
      const newUser = JSON.parse(storedUser) as IUserSessionData;

      session.setUser(newUser);
      setUser(newUser);
    }
  }, []);

  useEffect(() => {
    blogService.getAll()
      .then(blogs => {
        setBlogs(blogs);
      });
  }, [user]);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const credentials: ICredentials = {
      username,
      password
    };

    try {
      const user = await session.login(credentials);

      setUser(user);
      setUsername("");
      setPassword("");
      notify("Logged in successfully", NotificationType.SUCCESS);

      window.localStorage.setItem("user", JSON.stringify(user));
    } catch (e) {
      notify("Invalid username or password", NotificationType.ERROR);
    }
  };

  const handleLogout = () => {
    session.setUser(null);
    window.localStorage.removeItem("user");
    setBlogs([]);
    setUser(null);
    notify("Logged out successfully", NotificationType.SUCCESS);
  };

  const createBlog = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newBlog: IBlog = {
      title,
      author,
      url
    };

    try {
      const returnedBlog = await blogService.create(newBlog);

      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      notify(`Blog "${returnedBlog.title}" added`, NotificationType.SUCCESS);
    } catch (e) {
      notify("Failed to add blog", NotificationType.ERROR);
    }
  };

  const notify = (message: string, type: NotificationType) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div>
      <h1>{user ? "Blogs" : "Log In"}</h1>
      {notification && <Notification message={notification.message} type={notification.type} />}
      {
        user
          ? <BlogListHome user={user} blogs={blogs} title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} onSubmit={createBlog} onClick={handleLogout} />
          : <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} onSubmit={handleLogin} />
      }
    </div>
  )
}

export default App;
