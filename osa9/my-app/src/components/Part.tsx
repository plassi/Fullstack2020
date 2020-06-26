import React from "react";
import { CoursePart } from "../types";

import { assertNever } from '../helper'

interface PartProps {
  coursePart: CoursePart;
}

const Part: React.FC<PartProps> = ({ coursePart }) => {

  switch (coursePart.name) {
    case "Fundamentals":
      return (
        <div>
          name: {coursePart.name}<br />
          description: {coursePart.description}<br />
          exerciseCount: {coursePart.exerciseCount}<br />
          <br></br>
        </div>
      )
    case "Fourth Course":
      return (
        <div>
          name: {coursePart.name}<br />
            description: {coursePart.description}<br />
            exerciseCount: {coursePart.exerciseCount}<br />
          <br></br>
        </div>
      )
    case "Using props to pass data":
      return (
        <div>
          name: {coursePart.name}<br />
          groupProjectCount: {coursePart.groupProjectCount}<br />
          exerciseCount: {coursePart.exerciseCount}<br />
          <br></br>
        </div>
      )
    case "Deeper type usage":
      return (
        <div>
          name: {coursePart.name}<br />
          description: {coursePart.description}<br />
          exerciseSubmissionLink: {coursePart.exerciseSubmissionLink}<br />
          exerciseCount: {coursePart.exerciseCount}<br />
          <br></br>
        </div>
      )
    default:
      return assertNever(coursePart);
  }
}

export default Part;