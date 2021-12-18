import React from 'react';

const Hello = ({ name, age }: { name: string, age: number }) => (
  <div>
    <p>Hello {name}, you are {age} years old</p>
    <p>So you were probably born in {new Date().getFullYear() - age}</p>
  </div>
);
  
const App2 = (): JSX.Element => {
  const name: string = "Peter"
  const age: number = 10

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={name} age={age} />
    </div>
  )
}

export default App2;