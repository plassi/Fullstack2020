import { v4 as uuid } from 'uuid';

import patientsData from '../../data/patients';

import { Patient, PublicPatient, NewPatient, Entry, Gender } from '../types';

const patients: Array<Patient> = patientsData;

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addEntry = (entry: NewPatient): Patient => {

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

const addNewEntryToUser = (userId: string, entry: Entry): Patient => {
  const patient = findById(userId);
  
  const newEntry = {
    ...entry,
    id: uuid()
  };

  const newEntries = [];
  patient?.entries?.forEach(entry => {
    newEntries.push(entry);
  });
  newEntries.push(newEntry);
  
  const updatedPatient = {
    id: patient?.id as string,
    name: patient?.name as string,
    gender: patient?.gender as Gender,
    dateOfBirth: patient?.dateOfBirth as string,
    ssn: patient?.ssn as string,
    occupation: patient?.occupation as string,
    entries: newEntries
  };

  const existingPatientIndex = patients.findIndex(patient => patient.id === updatedPatient.id);

  patients.splice(existingPatientIndex, 1);
  patients.push(updatedPatient);

  return updatedPatient as Patient;
  
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
  addNewEntryToUser
};