import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, Gender } from '../types';
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

const addPatient = (name: string, dateOfBirth: string, ssn: string, gender:Gender, occupation:string): Patient => {
  const newPatient = {
    id: uuid.v4(),
    name, 
    dateOfBirth, 
    ssn,
    gender, 
    occupation
  };

  patients.push(newPatient);

  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient
};
