import React from "react";
import { CoursePartBase } from "../types";

interface TotalProps {
  courseParts: Array<CoursePartBase>;
}

const Total: React.FC<TotalProps> = ({ courseParts }) => {

  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total