const SET_TABLE = 'table/SET_TABLE';
const ADD_ONE_AMOUNT = 'table/ADD_ONE';
const DELETE_ROW = 'table/DELETE_ROW';
const ADD_ROW = 'table/ADD_ROW';

export const createTable = (rows, columns) => {
  const tableArr = [];

  for (let i = 0; i < +rows; ++i) {
    const rowObj = { id: Math.random(), rowArr: [] };
    for (let j = 0; j < +columns; ++j) {
      const cellObj = {
        id: Math.random(),
        amount: Math.floor(Math.random() * 1000),
      };
      rowObj.rowArr.push(cellObj);
    }
    tableArr.push(rowObj);
  }

  return {
    type: SET_TABLE,
    payload: tableArr,
  };
};

export const increaseAmount = (cellId, cellAmount) => ({
  type: ADD_ONE_AMOUNT,
  payload: { cellId, cellAmount },
});

export const deleteRow = (rowId) => ({
  type: DELETE_ROW,
  payload: rowId,
});

export const createRow = (rowArrLength) => {
  const rowObj = { id: Math.random(), rowArr: [] };
  for (let j = 0; j < +rowArrLength; ++j) {
    const cellObj = {
      id: Math.random(),
      amount: Math.floor(Math.random() * 1000),
    };
    rowObj.rowArr.push(cellObj);
  }

  return {
    type: ADD_ROW,
    payload: rowObj,
  };
};

export const tableReducer = (state = [], action) => {
  switch (action.type) {
    case SET_TABLE:
      return action.payload;
    case ADD_ONE_AMOUNT:
      return state.map((rowObj) => ({
        ...rowObj,
        rowArr: rowObj.rowArr.map((cell) => {
          if (cell.id !== action.payload.cellId) {
            return cell;
          }

          return {
            ...cell,
            amount: action.payload.cellAmount + 1,
          };
        }),
      }));
    case DELETE_ROW:
      return state.filter((rowObj) => rowObj.id !== action.payload);
    case ADD_ROW:
      return [
        ...state,
        action.payload,
      ];
    default:
      return state;
  }
};
