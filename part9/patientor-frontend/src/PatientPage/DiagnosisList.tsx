import React from "react";
import { Diagnosis } from "../types";
import { List } from "semantic-ui-react";
import { useStateValue } from "../state";

type DiagnosisListProps = {
  diagnosisCodes: Array<Diagnosis["code"]>;
};

const DiagnosisList: React.FC<DiagnosisListProps> = ({ diagnosisCodes }) => {
  const [diagnoses, setDiagnoses] = React.useState<Diagnosis[] | null>();
  const [{ diagnoses: allDiagnoses }] = useStateValue();

  React.useEffect(() => {
    const fullDiagnoses: Diagnosis[] = [];
    diagnosisCodes.forEach((c) => {
      fullDiagnoses.push(allDiagnoses[c]);
    });
    console.log(fullDiagnoses);
    setDiagnoses(fullDiagnoses);
  }, [allDiagnoses, diagnosisCodes]);

  return (
    <List divided relaxed>
      {diagnoses &&
        diagnoses.map((d) => (
          <List.Item key={d.code}>
            <List.Icon
              name="plus square outline"
              color="red"
              size="large"
              verticalAlign="middle"
            />
            <List.Content>
              <List.Header>{d.code}</List.Header>
              <List.Description>{d.name}</List.Description>
              {d.latin && <List.Description as="em">{d.latin}</List.Description>}
            </List.Content>
          </List.Item>
        ))}
    </List>
  );
};

export default DiagnosisList;
