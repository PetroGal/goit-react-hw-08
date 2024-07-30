import React from 'react';
import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { IoPerson } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';
import { deleteContact } from '../../redux/contactsOps';

export default function Contact({ data: { id, name, number } }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    <div className={css.container}>
      <div className={css.wrap}>
        <div className={css.nameWrap}>
          <IoPerson size={22} />
          <p className={css.data}>{name}</p>
        </div>
        <div className={css.phoneWrap}>
          <FaPhone size={18} />
          <p className={css.data}>{number}</p>
        </div>
      </div>
      <button className={css.btn} onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
