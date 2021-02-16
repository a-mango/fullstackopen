import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

/**
 * Fetch all patients
 */
router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

/**
 * Create a new patient
 */
router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    const newPatient = patientService.addPatient(name, dateOfBirth, ssn, gender, occupation);
    res.json(newPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;
