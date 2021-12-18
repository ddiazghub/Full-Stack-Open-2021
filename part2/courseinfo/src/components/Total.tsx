import React from "react";
import ICourse from "../shared/interfaces/ICourse";

const Total = (props: {course: ICourse}): JSX.Element => (
  <p>
    <strong>Number of exercises {props.course.parts.reduce<number>((acc, part) => acc + part.exercises, 0)}</strong>
  </p>
);

export default Total;