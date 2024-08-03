import { Button, MenuItem, Stack, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

// validation schema
const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  phone: Yup.string().matches(/^\d{7,}$/, 'Must be at least 7 digits').required('Phone is required'),
  dob: Yup.date().required('Date of Birth is required'),
  city: Yup.string().required('City is required'),
  district: Yup.string().required('District is required'),
  province: Yup.string().required('Province is required'),
  country: Yup.string().required('Country is required'),
  profilePicture: Yup.mixed().required('Profile picture is required'),
});

const EditComponent = ({ record, onSave, onCancel, countries }) => {
  return (
    <Formik
      initialValues={record}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSave(values);
        resetForm();
      }}
    >
      {({ setFieldValue, errors, touched }) => (
        <Form>
          <Stack spacing={2}>
            <Field as={TextField} name="name" label="Name" error={touched.name && !!errors.name} helperText={touched.name && errors.name} />
            <Field as={TextField} name="email" label="Email" error={touched.email && !!errors.email} helperText={touched.email && errors.email} />
            <Field as={TextField} name="phone" label="Phone Number" error={touched.phone && !!errors.phone} helperText={touched.phone && errors.phone} />
            <Field as={TextField} name="dob" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} error={touched.dob && !!errors.dob} helperText={touched.dob && errors.dob} />
            <Field as={TextField} name="city" label="City" error={touched.city && !!errors.city} helperText={touched.city && errors.city} />
            <Field as={TextField} name="district" label="District" error={touched.district && !!errors.district} helperText={touched.district && errors.district} />
            <Field as={TextField} name="province" label="Province" select error={touched.province && !!errors.province} helperText={touched.province && errors.province}>
              {[...Array(7)].map((_, i) => (
                <MenuItem key={i + 1} value={`Province ${i + 1}`}>{`Province ${i + 1}`}</MenuItem>
              ))}
            </Field>
            <Field as={TextField} name="country" label="Country" select error={touched.country && !!errors.country} helperText={touched.country && errors.country}>
              {countries && countries.length > 0 ? (
                countries.map(country => (
                  <MenuItem key={country.cca3} value={country.name.common}>{country.name.common}</MenuItem>
                ))
              ) : (
                <MenuItem disabled>No countries available</MenuItem>
              )}
            </Field>
            <input type="file" accept="image/png" onChange={(event) => setFieldValue('profilePicture', event.currentTarget.files[0])} />
            {touched.profilePicture && errors.profilePicture && <div>{errors.profilePicture}</div>}
            <Button type="submit">Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default EditComponent;
