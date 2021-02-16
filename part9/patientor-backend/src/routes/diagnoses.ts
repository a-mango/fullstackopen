import express from 'express';
import diagnosticService from '../services/diagnosticService';
const router = express.Router();

/**
 * Fetch all diagnoses
 */
router.get('/', (_req, res) => {
  res.send(diagnosticService.getEntries());
});

export default router;
