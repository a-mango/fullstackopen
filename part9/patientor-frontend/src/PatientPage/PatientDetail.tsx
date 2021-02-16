import React from "react";
import { Patient } from "../types";
import { Table, Icon } from "semantic-ui-react";

const genderIcon = {
  male: { name: "mars" as "mars", color: "blue" as "blue" },
  female: { name: "venus" as "venus", color: "pink" as "pink" },
  other: { name: "genderless" as "genderless", color: "grey" as "grey" },
};

const PatientDetail: React.FC<Patient> = ({
  id,
  name,
  dateOfBirth,
  gender,
  ssn,
  occupation,
}) => {
  return (
    <Table definition color="blue">
      <Table.Body>
        <Table.Row>
          <Table.Cell>File #</Table.Cell>
          <Table.Cell>{id}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>
            {name} <Icon {...genderIcon[gender]} />
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Date of birth</Table.Cell>
          <Table.Cell>{dateOfBirth || "Unknown"}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>SSN</Table.Cell>
          <Table.Cell>{ssn}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Occupation</Table.Cell>
          <Table.Cell>{occupation}</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default PatientDetail;
