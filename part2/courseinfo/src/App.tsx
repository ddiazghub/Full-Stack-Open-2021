import React from 'react';
import ICourse from './shared/interfaces/ICourse';
import Course from './components/Course';

const App = (): JSX.Element => {
  const courses: ICourse[] = [
    {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        id: 1,
        name: "Fundamentals of React",
        exercises: 10
      },
      {
        id: 2,
        name: "Using props to pass data",
        exercises: 7
      },
      {
        id: 3,
        name: "State of a component",
        exercises: 14
      }
    ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  );
};

export default App;
