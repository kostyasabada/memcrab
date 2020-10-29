import React, { useState } from 'react';
import './Table.scss';
import { useSelector } from 'react-redux';
import { getTable } from '../../redux/rootReducer';
import { FooterRow } from '../FooterRow';
import { TableRow } from '../TableRow';

export const Table = () => {
  const [closestArr, setClosestArr] = useState([]);
  const tableArr = useSelector(getTable);

  return (
    <table className="table">
      <tbody>
        {tableArr.map((row) => (
          <tr
            key={row.id}
          >
            <TableRow
              rowArr={row.rowArr}
              rowId={row.id}
              setClosestArr={setClosestArr}
              closestArr={closestArr}
            />
          </tr>
        ))}
      </tbody>

      <tfoot>
        <FooterRow />
      </tfoot>
    </table>
  );
};
