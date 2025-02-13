import { Reducer } from '@reduxjs/toolkit';
import { TOGGLE_COLLAPSE } from '../utils/action';
import { AllowPermission } from './authPermissions';

interface ToggleCollapseAction {
  type: typeof TOGGLE_COLLAPSE;
}

interface DefaultAction {
  type: string;
}

interface CollapseState {
  refreshJobAt: string;
  isCollapse: boolean | false;
  paths: Array<string>;
  routes: Array<any>;
  permissions: AllowPermission;
  dean: any;
  admin: any;
}

const initialState: CollapseState = {
  refreshJobAt: new Date().toISOString(),
  isCollapse: false,
  paths: [],
  routes: [],
  permissions: {},
  dean: {},
  admin: { isAdmin: false },
};

const isCollapseReducer: Reducer<any> = (state = initialState, action: any) => {
  switch (action.type) {
    case TOGGLE_COLLAPSE:
      console.log('action.payload ', action.payload);
      return {
        ...state,
        isCollapse: action.payload === false ? action.payload : !state.isCollapse,
      };
    case 'REFRESH_JOB':
      return {
        ...state,
        refreshJobAt: action.payload,
      };
    case 'SET_DATA':
      return {
        ...state,
        paths: action.payload,
      };
    case 'SET_ROUTE_PATH':
      return {
        ...state,
        routes: action.payload,
      };
    case 'SET_PERMISSIONS_APPRAISAL':
      return {
        ...state,
        permissions: action.payload,
      };
    case 'SET_DEAN':
      return {
        ...state,
        dean: action.payload,
      };
    case 'SET_ADMIN':
      return {
        ...state,
        admin: action.payload,
      };
    default:
      return state;
  }
};

export default isCollapseReducer;
