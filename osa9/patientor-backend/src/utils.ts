/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NewPatient, Gender, Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry, } from './types';

import { FinnishSSN } from 'finnish-ssn';

export const toNewEntry = (object: any): Entry => {
  switch (object.type) {
    case "Hospital":
      return {
        date: parseDate(object.date),
        type: object.type,
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: object.diagnosisCodes,
        description: parseDescription(object.description),
        discharge: parseDischarge(object.discharge)
      } as HospitalEntry;
    case "OccupationalHealthcare": 
      return {
        date: parseDate(object.date),
        type: object.type,
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: object.diagnosisCodes,
        description: parseDescription(object.description),
        employerName: parseEmployer(object.employerName),
        sickLeave: object.sickLeave
      } as OccupationalHealthcareEntry;
    case "HealthCheck":
      return {
        date: parseDate(object.date),
        type: object.type,
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: object.diagnosisCodes,
        description: parseDescription(object.description),
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      } as HealthCheckEntry;
    default:
      throw new Error('No entry type found');
  }
};

const toNewPatientEntry = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation)
  };

  return newEntry;

};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseHealthCheckRating = (rating: any): number  => {
  if (isNaN(rating)) {
    throw new Error('Incorrect or missing healthCheckRating: ' + rating);
  }
  if (rating < 0 || rating > 3) {
    throw new Error('healthCheckRating must be a number between 0 and 3. Was ' + rating);
  }
  return rating as number;
};

export const parseSickleave = (sickLeave: any): { startDate: string; endDate: string } => {
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
};

export const parseDischarge = (discharge: any): { date: string; criteria: string } => {
  return {
    date: parseDischargeDate(discharge.date),
    criteria: parseCriteria(discharge.criteria)
  };
};

export const parseEmployer = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing employerName: ' + name);
  }

  return name;
};

export const parseCriteria = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing discharge.criteria: ' + name);
  }

  return name;
};

export const parseSpecialist = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing specialist: ' + name);
  }

  return name;
};

export const parseDescription = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing description: ' + name);
  }

  return name;
};

export const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name: ' + name);
  }

  return name;
};

export const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation: ' + occupation);
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + date);
  }
  return date;
};

const parseDischargeDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing discharge.date: ' + date);
  }
  return date;
};

const isSsn = (ssn: string): boolean => {
  return FinnishSSN.validate(ssn);
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isSsn(ssn)) {
    throw new Error('Incorrect or missing ssn: ' + ssn);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return ssn;
};


const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export default toNewPatientEntry;