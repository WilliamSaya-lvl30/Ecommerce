import { REGISTER_USER } from "../constants";

const initialState = {
  name: "",
  email: "",
  password: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
