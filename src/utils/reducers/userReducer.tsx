import { Reducer } from '@reduxjs/toolkit';
import { SET_USER_DATA 
    ,SET_SYSTEM_SELECTED
} from './userActions';
// import { AllowPermission } from './authPermissions';

interface UserData {
  userData: any;
  systemSelected:string|null
 
}
const initialState: UserData = {
    userData:null,
    systemSelected:null

};

const userReducer: Reducer<any> = (state = initialState, action: any) => {
  switch (action.type) {
    // case TOGGLE_COLLAPSE:
    //   console.log('action.payload ', action.payload);
    //   return {
    //     ...state,
    //     isCollapse: action.payload === false ? action.payload : !state.isCollapse,
    //   };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      }
      case SET_SYSTEM_SELECTED:
        return {
          ...state,
          systemSelected: action.payload,
        }
    default:
      return state;
  }
};

export default userReducer;
