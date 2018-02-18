import { MAX_JET_VELOCITY, MIN_JET_VELOCITY } from '../state/constants';


// to avoid potential conflicts with the Jet react class 
export const jetFactory = {
  newJet: {
    coordX: 95, // %
    coordY: 5,  // %
    heading: 90,// deg 
    velocity: (MAX_JET_VELOCITY + MIN_JET_VELOCITY) / 2,
    health: 100,
    kills: 0
  },
  build: function(currentState) {
    if(currentState) {
      return {
        coordX: currentState.coordX,
        coordY: currentState.coordY,
        heading: currentState.heading,
        velocity: currentState.velocity,
        health: currentState.health,
        kills: currentState.kills,
      };
    }
    return { ...this.newJet };
  }
};