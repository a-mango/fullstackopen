import React from "react";
import { assertNever } from "../utils/asserts";
import { CoursePart } from "../utils/types";

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  const template = (
    <tr>
      <td>
        <strong>{part.name}</strong>
      </td>
      <td>
        <strong>{part.exerciseCount}</strong>
      </td>
    </tr>
  );

  switch (part.name) {
    case "Fundamentals":
      return (
        <>
          {template}
          <tr>
            <td>Description: {part.description}</td>
          </tr>
        </>
      );
    case "Using props to pass data":
      return (
        <>
          {template}
          <tr>
            <td>Group project count: {part.groupProjectCount}</td>
          </tr>
        </>
      );
    case "Deeper type usage":
      return (
        <>
          {template}
          <tr>
            <td>Description: {part.description}</td>
          </tr>
          <tr>
            <td>
              Exercises submission link:{" "}
              <a href={part.exerciseSubmissionLink}>
                {part.exerciseSubmissionLink}
              </a>
            </td>
          </tr>
        </>
      );
    case "On brewing coffee":
      return (
        <>
          {template}
          <tr>
            <td>Description: {part.description}</td>
          </tr>
          <tr>
            <td>duration: {part.duration}</td>
          </tr>
        </>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
