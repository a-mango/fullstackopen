import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container } from "semantic-ui-react";

import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addPatient } from "../state";

import PatientDetail from "./PatientDetail";

const PatientPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | null>();
  const [{ patients }, dispatch] = useStateValue();

  React.useEffect(() => {
    // Fetch patient if it is not present in store
    if (!patients[id] || !patients[id].ssn) {
      const fetchPatient = async () => {
        try {
          const { data: newPatient } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch(addPatient(newPatient));
          setPatient(newPatient);
        } catch (e) {
          console.error(e.response.data);
          setPatient(null);
        }
      };
      fetchPatient();
    } else {
      setPatient(patients[id]);
    }
  }, [dispatch, id, patients]);

  if (!patient) {
    return null;
  }

  return (
    <div className="App">
      <Container text textAlign="center">
        <h3>Patient detail</h3>
        <PatientDetail {...patient} />
      </Container>
    </div>
  );
};

export default PatientPage;
