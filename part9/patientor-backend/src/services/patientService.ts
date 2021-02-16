import patientData from "../../data/patients";
import { Patient, NonSensitivePatient, NewPatient } from "../types";
import uuid = require("uuid");

const patients: Array<Patient> = patientData;

/**
 * Get all patient entries as non-sensitive patients
 */
const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, entries, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      entries,
      occupation,
    })
  );
};

/**
 * Add a new patient to the store
 * @param patient The patient to add
 */
const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid.v4(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

/**
 * Find a patiend by id
 * @param id The id of the patient to find
 */
const findPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

export default {
  getNonSensitivePatients,
  addPatient,
  findPatientById,
};
