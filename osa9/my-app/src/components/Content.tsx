import React from "react";
import { CoursePart } from "../types";

import Part from './Part'

interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {

  return (
    <div>
      <Part coursePart={courseParts[0]} />
      <Part coursePart={courseParts[1]} />
      <Part coursePart={courseParts[2]} />
      <Part coursePart={courseParts[3]} />
    </div>
  )
}

export default Content;