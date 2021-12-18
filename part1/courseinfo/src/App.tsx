import React from 'react';

interface CoursePart {
  name: string,
  exercises: number
}

interface Course {
  name: string,
  parts: CoursePart[]
}

const Header = (props: { course: Course }): JSX.Element => (
  <h1>{props.course.name}</h1>
);

const Part = (props: { data: CoursePart }): JSX.Element => (
  <p>{props.data.name} {props.data.exercises}</p>
);

const Content = (props: { course: Course }): JSX.Element => (
  <div>
    <Part data={props.course.parts[0]} />
    <Part data={props.course.parts[1]} />
    <Part data={props.course.parts[2]} />
  </div>
);

const Total = (props: {course: Course}): JSX.Element => (
  <p>Number of exercises {props.course.parts.map((part) => part.exercises).reduce((acc, current) => (acc + current))}</p>
);

const App = (): JSX.Element => {
  const course: Course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        name: "Using props to pass data",
        exercises: 7
      },
      {
        name: "State of a component",
        exercises: 14
      }
    ]
  };
  
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
