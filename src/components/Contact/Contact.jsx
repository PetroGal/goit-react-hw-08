import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoPerson } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';
import { deleteContact } from '../../redux/contacts/operations';
import Modal from '../Modal/Modal';
import css from './Contact.module.css';

export default function Contact({ id, name, number }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    setShowModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteContact(id));
    setShowModal(false);
  };

  const cancelDelete = () => {
    setShowModal(false);
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
      {showModal && (
        <Modal
          message="Are you sure you want to delete this contact?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
