import { SET_USERNAME } from '../constants';

const devDefaultState = {
  username: 'dev',
  myHue: 203
};


export default function me(state = devDefaultState, { type, payload }) {
  switch(type) {
    case SET_USERNAME:
      return payload;
    default:
      return state;
  }
}