import React from "react";

type Part = {
  name: string;
  exerciseCount: number;
};

interface ContentProps {
  parts: Part[];
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <table>
      {props.parts.map((p) => (
        <tr key={p.name}>
          <td>{p.name}</td>
          <td>{p.exerciseCount}</td>
        </tr>
      ))}
    </table>
  );
};

export default Content;
