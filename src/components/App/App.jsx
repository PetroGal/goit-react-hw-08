import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNameFilter } from '../../redux/filtersSlice.js';
import ContactForm from '../ContactForm/ContactForm';
import SearchBox from '../SearchBox/SearchBox';
import ContactList from '../ContactList/ContactList';
import css from './App.module.css';
import { fetchContacts } from '../../redux/contactsOps.js';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import { selectIsError, selectLoading } from '../../redux/contactsSlice.js';

export default function App() {
  const filter = useSelector(selectNameFilter);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const isError = useSelector(selectIsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <SearchBox value={filter} />
      {loading && <Loader>Loading data</Loader>}
      {isError && <Error>{isError}</Error>}
      <ContactList />{' '}
    </div>
  );
}
