import React from "react";
import TextField from "./TextField";

interface IPersonFormProps {
  name: string,
  number: string,
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onNumberChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
}

const PersonForm = (props: IPersonFormProps): JSX.Element => {
  return (
    <form onSubmit={props.onSubmit}>
      <TextField label="Name" value={props.name} onChange={props.onNameChange} />
      <TextField label="Number" value={props.number} onChange={props.onNumberChange} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
