import * as actionTypes from '../constants/OrderConstants'

export const getOrders = () => async dispatch => {
  try {
    dispatch({type: actionTypes.GET_ORDERS_PENDING})

    const {data} = await fetch('https://admin-backend-fjzy.onrender.com/api/orders')

    dispatch({
      type: actionTypes.GET_ORDERS_SUCCESS,
      payload: JSON.parse(data),
    })
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

