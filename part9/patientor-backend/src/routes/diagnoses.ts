import express from 'express';
import diagnoseService from '../services/diagnoseService';
const router = express.Router();

/**
 * Fetch all diagnoses
 */
router.get('/', (_req, res) => {
  res.send(diagnoseService.getEntries());
});

export default router;
