import * as actionTypes from "../constants/OrderConstants";

export const getOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_PENDING:
      return {
        loading: true,
        orders: [],
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        orders: action.payload,
        loading: false,
      };
    case actionTypes.GET_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
