import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import uuid = require('uuid');

const patients: Array<Patient> = patientData as Array<Patient>;

/**
 * Get all patient entries as non-sensitive patients
 */
const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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

export default {
  getNonSensitivePatients,
  addPatient,
};
