import React from "react";
import axios from "axios";
import { Patient, Entry } from "../types";
import { useStateValue, loadPatient } from "../state";
import { apiBaseUrl } from "../constants";
import { assertNever } from "../helper";

import Diagnoses from './Diagnoses';
import AddEntryForm from './AddEntryForm';

interface PatientProps {
  patientId: string;
}

const PatientPage: React.FC<PatientProps> = ({ patientId }) => {
  const [{ patients }, dispatch] = useStateValue();

  const patient: Patient =
    Object.values(patients).find((patient: Patient) =>
      patientId === patient.id) as Patient;

  const loadFullPatient = async (patientId: string) => {
    try {
      const { data: patientFromApi } = await axios
        .get<Patient>(`${apiBaseUrl}/patients/${patientId}`);

      dispatch(loadPatient(patientFromApi));
    } catch (e) {
      console.error(e);
    }
  };

  if (!patient) {
    return null;
  }

  if (!('ssn' in patient)) {
    loadFullPatient(patientId);
  }

  return (
    <div className="App">
      <div>
        <h3>{patient.name}</h3> {patient.gender}<br />
        ssn: {patient.ssn}<br />
        occupation: {patient.occupation}<br />
      </div>
      <div>
        {patient.entries ? <h3 style={{ marginTop: 35, marginBottom: -5 }}>Entries</h3> : null}
        {
          patient.entries ?
            Object.values(patient.entries).map((entry: Entry) => {

              switch (entry.type) {
                case "HealthCheck":
                  return (
                    <div key={entry.id}>
                      <br />
                      {entry.date} {entry.type} {entry.description} healthCheckRating: {entry.healthCheckRating}
                      <br />
                      <Diagnoses diagnoses={entry.diagnosisCodes as string[]} />
                    </div>
                  );
                case "Hospital":
                  return (
                    <div key={entry.id}>
                      <br />
                      {entry.date} {entry.type} {entry.description} discharge: {entry.discharge.date} criteria: {entry.discharge.criteria}
                      <br />
                      <Diagnoses diagnoses={entry.diagnosisCodes as string[]} />
                    </div>
                  );
                case "OccupationalHealthcare":
                  return (
                    <div key={entry.id}>
                      <br />
                      {entry.date} {entry.type} {entry.description} employer: {entry.employerName}
                      <Diagnoses diagnoses={entry.diagnosisCodes as string[]} />
                      <br />
                    </div>
                  );
                default:
                  assertNever(entry);
                  return null;
              }
            })
            : null
        }
      </div>
      <AddEntryForm patient={patient}/>
    </div>
  );
};

export default PatientPage;
