import React from "react";
import { Entry } from "../types";
import { Header, Table, Message, List } from "semantic-ui-react";
import DiagnosisList from "./DiagnosisList";

interface EntryListProps {
  entries: Entry[];
}

const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  return (
    <>
      <Header as="h4" block attached="top">
        Entries
      </Header>
      {entries.length === 0 ? (
        <Message
          size="mini"
          attached
          info
          header="No entries found"
          content="Create a first entry"
        />
      ) : (
        <Table attached="bottom">
          <Table.Body>
            {entries.map((e) => (
              <Table.Row key={e.id}>
                <Table.Cell>
                  <List divided relaxed>
                    <List.Item>
                      <List.Icon
                        name="file outline"
                        color="blue"
                        size="large"
                        verticalAlign="middle"
                      />
                      <List.Content>
                        <List.Header>{e.date}</List.Header>
                        <List.Description>{e.description}</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                  {e.diagnosisCodes && (
                    <DiagnosisList diagnosisCodes={e.diagnosisCodes} />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </>
  );
};

export default EntryList;
