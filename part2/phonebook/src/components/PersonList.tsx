import React from "react";
import IPerson from "../shared/interfaces/IPerson";

const PersonList = (props: { people: IPerson[], deletePerson: (id: number) => void }): JSX.Element => {
  return (
    <div>
      {props.people.map(person => (
        <div key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => props.deletePerson(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default PersonList;