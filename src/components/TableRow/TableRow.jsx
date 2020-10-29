/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { increaseAmount, deleteRow } from '../../redux/tableReducers';
import './TableRow.scss';
import { getClosestQuantity, getTable } from '../../redux/rootReducer';

export const TableRow = ({
  rowArr, rowId, setClosestArr, closestArr,
}) => {
  const dispatch = useDispatch();
  const table = useSelector(getTable);
  const closestQuantity = useSelector(getClosestQuantity);

  const [showPercent, setShowPercent] = useState(false);
  const [rowPercentAmount, setRowPercentAmount] = useState(0);
  const rowSumAmount = rowArr.reduce((sum, current) => (sum + current.amount), 0);

  const handleClosestArr = (cellAmount, cellId) => {
    const diff = table.map((row) => row.rowArr
      .map((item) => ({ id: item.id, amount: Math.abs(item.amount - cellAmount) }))).flat();

    const diffwithoutCell = diff.filter((item) => item.id !== cellId);

    const filteredDiff = diffwithoutCell
      .sort((a, b) => a.amount - b.amount)
      .slice(0, closestQuantity);

    setClosestArr(filteredDiff);
  };

  useEffect(() => {
    let tableSumAmount = 0;
    table.forEach((row) => {
      const rowAmount = row.rowArr.reduce((sum, current) => (sum + current.amount), 0);
      tableSumAmount += rowAmount;
    });

    setRowPercentAmount(Math.round((rowSumAmount / tableSumAmount) * 100));
  }, [rowSumAmount, table]);

  return (
    <>
      {rowArr.map((cell) => (
        <td
          className={classnames('row__td', {
            row__td_closest: closestArr.find((item) => item.id === cell.id),
          })}
          key={cell.id}
          onClick={() => {
            dispatch(increaseAmount(cell.id, cell.amount));
            handleClosestArr(cell.amount, cell.id);
          }}
          onKeyDown={({ key }) => {
            if (key === 'Enter') {
              dispatch(increaseAmount(cell.id, cell.amount));
            }
          }}
          onMouseOver={() => handleClosestArr(cell.amount, cell.id)}
          onFocus={() => handleClosestArr(cell.amount, cell.id)}
          onMouseLeave={() => setClosestArr([])}
          role="button"
        >
          {cell.amount}
        </td>
      ))}
      <th
        className="row__th"
        style={{
          background: showPercent
            ? `linear-gradient(to bottom, #d3d3d3 ${100 - rowPercentAmount}%, #f00 ${100 - rowPercentAmount}% ${rowPercentAmount}%)`
            : '#d3d3d3',
        }}
        onMouseOver={() => setShowPercent(true)}
        onFocus={() => setShowPercent(true)}
        onMouseLeave={() => setShowPercent(false)}
        onBlur={() => setShowPercent(false)}
      >
        {showPercent
          ? `${rowPercentAmount}%`
          : rowSumAmount}
      </th>
      <td>
        <button
          className="row__delete-button"
          type="button"
          onClick={() => { dispatch(deleteRow(rowId)); }}
        >
          X
        </button>
      </td>
    </>
  );
};

TableRow.propTypes = {
  rowArr: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowId: PropTypes.number.isRequired,
  setClosestArr: PropTypes.func.isRequired,
  closestArr: PropTypes.arrayOf(PropTypes.object).isRequired,
};
