import React from "react";
import ICoursePart from "../shared/interfaces/ICoursePart";

const Part = (props: { data: ICoursePart }): JSX.Element => (
  <p>{props.data.name} {props.data.exercises}</p>
);

export default Part;