import React from "react";
import Part from "./Part"
import { CoursePart } from "../utils/types"

interface ContentProps {
  parts: CoursePart[];
}

const Content: React.FC<ContentProps> = ({parts}) => {
  return (
    <table>
      <tbody>
        {parts.map((p) => <Part key={p.name} part={p}/>)}
      </tbody>
    </table>
  );
};

export default Content;
