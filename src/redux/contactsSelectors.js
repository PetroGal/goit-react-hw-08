import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from './filtersSlice';

// export const selectContacts = state => state.contacts.items;

// export const selectLoading = state => state.contacts.loading;

// export const selectIsError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, nameFilter) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes((nameFilter || '').toLowerCase())
    );
  }
);
