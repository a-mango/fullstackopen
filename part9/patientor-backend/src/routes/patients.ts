import express from 'express';
import patientService from '../services/patientService';
const router = express.Router();

/**
 * Fetch all patients
 */
router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

export default router;
