import React from "react";

interface ILoginFormProps {
  username: string,
  password: string,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  setUsername: (username: string) => void,
  setPassword: (password: string) => void
}

const LoginForm = (props: ILoginFormProps): JSX.Element => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        Username: <input type="text" value={props.username} onChange={event => props.setUsername(event.target.value)} />
      </div>
      <div>
        Password: <input type="password" value={props.password} onChange={event => props.setPassword(event.target.value)} />
      </div>
      <button type="submit">Log in</button>
    </form>
  );
};

export default LoginForm;