import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData as Array<Diagnose>;

/**
 * Get all the diagnostic entries
 */
const getEntries = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getEntries,
};
