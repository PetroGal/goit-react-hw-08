import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './ContactForm.module.css';
import * as Yup from 'yup';
import { addContact } from '../../redux/contactsOps';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('This field is required'),
  number: Yup.string()
    .min(3, 'Minimum 3 numbers')
    .max(50, 'Maximum 50 symbols')
    .required('This field is required'),
});

export default function ContactForm() {
  const dispatch = useDispatch();

  const handleAddContact = (values, actions) => {
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={handleAddContact}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.nameWrap}>
          <label className={css.nameLabel} htmlFor="name">
            Name
          </label>
          <Field className={css.nameInput} type="text" name="name" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div className={css.phoneWrap}>
          <label className={css.phoneLabel} htmlFor="number">
            Number
          </label>
          <Field className={css.phoneInput} type="text" name="number" />
          <ErrorMessage name="number" component="div" />
        </div>
        <button className={css.formBtn} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
