import React from "react";
import ICourse from "../shared/interfaces/ICourse";

const CourseHeader = (props: { course: ICourse }): JSX.Element => (
  <h2>{props.course.name}</h2>
);

export default CourseHeader;