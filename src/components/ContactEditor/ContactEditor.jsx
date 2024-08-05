import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { addContact } from '../../redux/contacts/operations.js';
import css from './ContactEditor.module.css';

export default function ContactEditor() {
  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    if (name !== '' && number !== '') {
      dispatch(addContact({ name, number }));
      form.reset();
      toast.success('Success!');
      return;
    }
    alert('Both name and number are required!');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <input name="name" className={css.input} placeholder="Name" />
      <input name="number" className={css.input} placeholder="Number" />
      <button type="submit" className={css.button}>
        Add contact
      </button>
    </form>
  );
}
