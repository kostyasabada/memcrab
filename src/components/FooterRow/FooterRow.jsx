import React from 'react';
import { useSelector } from 'react-redux';
import { getTable } from '../../redux/rootReducer';

function calculateAverage(arr) {
  const averageArr = [];
  for (let i = 0; i < arr[0].rowArr.length; ++i) {
    let colunmSum = 0;
    for (let j = 0; j < arr.length; ++j) {
      colunmSum += arr[j].rowArr[i].amount;
    }
    averageArr.push({
      id: Math.random(),
      amount: Math.round(colunmSum / arr.length),
    });
  }
  return averageArr;
}

export const FooterRow = React.memo(() => {
  const tableArr = useSelector(getTable);
  const averageArr = calculateAverage(tableArr);

  return (
    <tr>
      {averageArr.map((cell) => (
        <th
          className="row__th"
          key={cell.id}
        >
          {cell.amount}
        </th>
      ))}
    </tr>
  );
});
