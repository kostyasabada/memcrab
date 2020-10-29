import { combineReducers } from 'redux';
import { closestAmountReducer } from './closestAmountReducer';
import { tableReducer } from './tableReducers';

export const getTable = (state) => state.table;
export const getClosestQuantity = (state) => state.closestQuantity;

export const rootReducer = combineReducers({
  table: tableReducer,
  closestQuantity: closestAmountReducer,
});
