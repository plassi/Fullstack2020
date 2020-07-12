import React from 'react';
import axios from 'axios';
import { useStateValue, loadPatient } from '../state/state';
import { Formik, Field, Form } from 'formik';
import { Button } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { HealthCheckEntryFormValues, EntryType, Patient } from '../types';
import { apiBaseUrl } from '../constants';


interface AddEntryFormProps {
  patient: Patient;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({patient}) => {
  const [{ diagnoses }, dispatch] = useStateValue();

  const submitNewEntry = async (values: HealthCheckEntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      dispatch(loadPatient(newPatient));

    } catch (e) {
      console.error(e.response.data);
    }
  };

  return (
    <Formik
      initialValues={{
        date: new Date(),
        description: "",
        healthCheckRating: 0,
        specialist: "",
        type: EntryType.HealthCheck
      }}
      onSubmit={(values) => submitNewEntry(values)}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

        return (
          <Form className="form ui">
            <br />
            <h3>Add new health check entry</h3>
            <DatePicker
              selected={values.date}
              dateFormat="yyyy-MM-dd"
              className="form-control"
              name="date"
              onChange={date => setFieldValue('date', date)}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Button
              type="submit"
              color="green"
              disabled={!dirty || !isValid}
            >
              Add
            </Button>

          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;