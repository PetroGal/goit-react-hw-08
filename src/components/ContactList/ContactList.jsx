import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectAllContacts } from '../../redux/contacts/selectors';
import { selectNameFilter } from '../../redux/filters/slice';
import css from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectAllContacts);
  const nameFilter = useSelector(selectNameFilter);

  const filteredContacts = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
      contact.number.includes(nameFilter)
  );

  return (
    <ul className={css.list}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id}>
          <Contact id={id} name={name} number={number} />
        </li>
      ))}
    </ul>
  );
}
