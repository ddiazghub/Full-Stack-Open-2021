import React from "react";
import Part from "./Part";
import ICourse from "../shared/interfaces/ICourse";
import Total from "./Total";

const Content = (props: { course: ICourse }): JSX.Element => (
  <div>
    {props.course.parts.map(part => <Part key={part.id} data={part} />)}
    <Total course={props.course} />
  </div>
);

export default Content