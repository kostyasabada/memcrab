import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { Table } from './components/Table';
import { TableForm } from './components/TableForm';
import { getTable } from './redux/rootReducer';
import { createRow } from './redux/tableReducers';

function App() {
  const tableArr = useSelector(getTable);
  const dispatch = useDispatch();

  return (
    <div className="App">
      {!tableArr.length > 0 && (
      <TableForm />
      )}
      {tableArr.length > 0 && (
      <Table />
      )}
      {tableArr.length > 0 && tableArr.length < 20 && (
      <button
        className="add-row"
        type="button"
        onClick={() => dispatch(createRow(tableArr[0].rowArr.length))}
      >
        Add row
      </button>
      )}
    </div>
  );
}

export default App;
