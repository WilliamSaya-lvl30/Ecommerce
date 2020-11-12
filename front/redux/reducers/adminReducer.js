import { FETCH_USERS, FETCH_ADMIN_ORDERS } from "../constants";

const initialState = {
  users: [],
  orders: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.data };
    case FETCH_ADMIN_ORDERS:
      return { ...state, orders: action.data };
    default:
      return state;
  }
};
