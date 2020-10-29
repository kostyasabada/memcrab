const CREATE__CLOSEST = 'closest/CREATE__CLOSEST';

export const createClosestAmount = (quantity) => ({
  type: CREATE__CLOSEST,
  payload: quantity,
});

export const closestAmountReducer = (closestQuantity = 0, action) => {
  switch (action.type) {
    case CREATE__CLOSEST:
      return action.payload;
    default:
      return closestQuantity;
  }
};
