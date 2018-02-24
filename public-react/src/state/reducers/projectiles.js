import { FIRE, PROJECTILE_DROP } from '../constants';


export default function projectiles(state = {}, { type, payload }) {
  let newState = {};
  switch(type) {
    case FIRE: 
      return {
        ...state,
        [payload.id]: payload
      };
    case PROJECTILE_DROP:
      newState = { ...state };
      delete newState[payload];
      return newState;
    default:
      return state;
  }
}