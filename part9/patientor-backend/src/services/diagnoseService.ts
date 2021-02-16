import diagnoseData from '../../data/diagnoses.json';
import { Diagnosis } from '../types';

const diagnoses: Array<Diagnosis> = diagnoseData as Array<Diagnosis>;

/**
 * Get all diagnostic entries
 */
const getEntries = (): Array<Diagnosis> => {
  return diagnoses;
};

export default {
  getEntries,
};
