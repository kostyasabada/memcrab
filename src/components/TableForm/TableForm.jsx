import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './TableForm.scss';
import { createTable } from '../../redux/tableReducers';
import { createClosestAmount } from '../../redux/closestAmountReducer';

export const TableForm = () => {
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [closestAmount, setClosestAmount] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(createClosestAmount(+closestAmount));
    dispatch(createTable(rows, columns));
  };

  return (
    <form
      onSubmit={submitHandler}
    >
      <label
        className="form__label"
        htmlFor="rows"
      >
        Rows:
      </label>
      <input
        className="form__input"
        type="number"
        min="1"
        max="20"
        placeholder="1-20"
        value={rows}
        id="rows"
        required
        onChange={(e) => setRows(e.target.value)}
      />

      <label
        className="form__label"
        htmlFor="columns"
      >
        Columns:
      </label>
      <input
        className="form__input"
        type="number"
        min="1"
        max="20"
        placeholder="1-20"
        value={columns}
        id="columns"
        required
        onChange={(e) => setColumns(e.target.value)}
      />

      <label
        className="form__label"
        htmlFor="closestAmount"
      >
        Closest amount:
      </label>
      <input
        className="form__input"
        type="number"
        min="1"
        max={(rows * columns) - 1}
        value={closestAmount}
        id="closestAmount"
        required
        onChange={(e) => setClosestAmount(e.target.value)}
      />

      <button
        className="form__submit-button"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
