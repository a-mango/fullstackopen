import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils";

const router = express.Router();

/**
 * Fetch all patients
 */
router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

/**
 * Fetch a patient by id
 */
router.get("/:id", (req, res) => {
  if (!req.params.id) {
    res.status(400).send({ error: "missing parameter" });
  }

  const patient = patientService.findPatientById(req.params.id);
  if (!patient) {
    res.status(400).send({ error: "invalid parameter" });
  }

  res.json(patient);
});

/**
 * Create a new patient
 */
router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(error.message);
  }
});

export default router;
