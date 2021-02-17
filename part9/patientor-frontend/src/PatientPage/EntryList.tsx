import React from "react";
import { Entry } from "../types";
import { Header, Table, List, Icon, Divider } from "semantic-ui-react";

interface EntryListProps {
  entries: Entry[];
}
const EntryList: React.FC<EntryListProps> = ({ entries }) => {
  return (
    <>
      <Header as="h4" block attached="top">
        Entries
      </Header>
      <Table attached="bottom">
        <Table.Body>
          {entries.map((e) => (
            <Table.Row key={e.id}>
              <Table.Cell>
                <Icon name="file outline" color="blue" size="large" />
                {e.date} - {e.description}
                {e.diagnosisCodes && (
                  <>
                    <Divider />
                    <List divided relaxed>
                      {e.diagnosisCodes?.map((code) => (
                        <List.Item key={code}>
                          <List.Icon
                            name="plus square outline"
                            color="red"
                            size="large"
                            verticalAlign="middle"
                          />
                          <List.Content>
                            <List.Header>{code}</List.Header>
                            <List.Description>{code}</List.Description>
                          </List.Content>
                        </List.Item>
                      ))}
                    </List>
                  </>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default EntryList;
