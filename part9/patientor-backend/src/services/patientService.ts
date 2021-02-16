import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';

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

export default {
  getNonSensitivePatients,
};
