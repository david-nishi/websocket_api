import { NEW_MEMBER, MEMBER_UPDATE, NEW_MEMBERS, MEMBER_DISCONNECT } from '../constants';

export function setMembers(members) {
  return {
    type: NEW_MEMBERS,
    payload: members
  };
}

export function newMember(member) {
  return {
    type: NEW_MEMBER,
    payload: member
  };
}

export function memberUpdate(updatePackage) {
  return {
    type: MEMBER_UPDATE,
    payload: updatePackage
  };
}

export function removeMember(name) {
  return {
    type: MEMBER_DISCONNECT,
    payload: name
  };
}


export function updateEnemyJet({ username, orders }) {
  return {
    type: 'ENEMY_' + orders,
    payload: username
  };
}
