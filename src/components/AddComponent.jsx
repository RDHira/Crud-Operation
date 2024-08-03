import { Button, MenuItem, Stack, TextField } from '@mui/material';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

// initial values
const initialValues = {
  name: '',
  email: '',
  phone: '',
  dob: '',
  city: '',
  district: '',
  province: '',
  country: 'Nepal',
  profilePicture: null,
};

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
  profilePicture: Yup.mixed().optional('Profile picture is required'),
});

const AddComponent = ({ onAddRecord }) => {
  const [countries, setCountries] = useState([]);
  const [profilePicturePreview, setProfilePicturePreview] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    onAddRecord(values);
    resetForm();
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];
    setFieldValue('profilePicture', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
              {countries.map(country => (
                <MenuItem key={country.cca3} value={country.name.common}>{country.name.common}</MenuItem>
              ))}
            </Field>
            <input type="file" accept="image/png" onChange={(event) => handleFileChange(event, setFieldValue)} />
            {profilePicturePreview && <img src={profilePicturePreview} alt="Profile Preview" style={{ width: '100px', height: '100px' }} />}
            {touched.profilePicture && errors.profilePicture && <div>{errors.profilePicture}</div>}
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default AddComponent;
