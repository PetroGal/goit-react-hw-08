import React from 'react';
import css from './Modal.module.css';

export default function Modal({ message, onConfirm, onCancel }) {
  return (
    <div className={css.overlay}>
      <div className={css.modal}>
        <p>{message}</p>
        <div className={css.buttons}>
          <button onClick={onConfirm} className={css.confirmBtn}>
            Confirm
          </button>
          <button onClick={onCancel} className={css.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
