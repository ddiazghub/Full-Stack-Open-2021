import React from "react";
import ICourse from "../shared/interfaces/ICourse";
import CourseHeader from "./CourseHeader";
import Content from "./Content";

const Course = (props: { course: ICourse }): JSX.Element => (
  <div>
    <CourseHeader course={props.course} />
    <Content course={props.course} />
  </div>
);

export default Course;