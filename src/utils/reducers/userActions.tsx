export const TOGGLE_COLLAPSE = 'TOGGLE_COLLAPSE';
export const SET_USER_DATA = 'SET_USER_DATA'
export const SET_SYSTEM_SELECTED = 'SET_SYSTEM_SELECTED'
// export interface SetRouteAction {
//   type: 'SET_ROUTE_PATH';
//   payload: Array<any>;
// }

export interface SetUserDataActionInterFace {
  type: 'SET_USER_DATA';
  payload: any;
}
export interface SetSystemSelectedAtionInterFace {
  type: 'SET_SYSTEM_SELECTED';
  payload: any;
}

// export const setPaths = (data: Array<any>): SetRouteAction => ({
//   type: 'SET_ROUTE_PATH',
//   payload: data,
// });


export const setUserData = (data: any): SetUserDataActionInterFace => ({
  type: SET_USER_DATA,
  payload: data,
});
export const setSystemSelected= (data: any): SetSystemSelectedAtionInterFace => ({

  type: SET_SYSTEM_SELECTED,
  payload: data,
});
