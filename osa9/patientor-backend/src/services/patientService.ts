import { v4 as uuid } from 'uuid';

import patientsData from '../../data/patients';

import { PatientEntry, NonSensitivePatientEntry, NewPatientEntry, Patient } from '../types';

const patients: Array<PatientEntry> = patientsData;

const getEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {

  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(d => d.id === id);
  return entry as Patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById
};