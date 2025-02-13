import { AllowPermission } from './authPermissions';

export const TOGGLE_COLLAPSE = 'TOGGLE_COLLAPSE';

export interface ToggleCollapseAction {
  type: typeof TOGGLE_COLLAPSE;
}

export interface SetPermissionAction {
  type: 'SET_DATA';
  payload: Array<string>;
}

export interface RefreshJobAction {
  type: 'REFRESH_JOB';
  payload: any;
}

export interface SetRouteAction {
  type: 'SET_ROUTE_PATH';
  payload: Array<any>;
}

export interface SetPermissionAppraisalAction {
  type: 'SET_PERMISSIONS_APPRAISAL';
  payload: AllowPermission;
}

export interface SetDeanAction {
  type: 'SET_DEAN';
  payload: any;
}

export interface SetAdminAction {
  type: 'SET_ADMIN';
  payload: any;
}

export const toggleCollapse = (): ToggleCollapseAction => ({
  type: TOGGLE_COLLAPSE,
});

export const setData = (data: Array<string>): SetPermissionAction => ({
  type: 'SET_DATA',
  payload: data,
});

export const setPaths = (data: Array<any>): SetRouteAction => ({
  type: 'SET_ROUTE_PATH',
  payload: data,
});

export const setPermissionAppraisal = (data: AllowPermission): SetPermissionAppraisalAction => ({
  type: 'SET_PERMISSIONS_APPRAISAL',
  payload: data,
});

export const refreshJob = (): RefreshJobAction => ({
  type: 'REFRESH_JOB',
  payload: { date: new Date().toISOString() },
});

export const setRole = (data: AllowPermission): SetPermissionAppraisalAction => ({
  type: 'SET_PERMISSIONS_APPRAISAL',
  payload: data,
});

export const setIsDean = (data: any): SetDeanAction => ({
  type: 'SET_DEAN',
  payload: data,
});

export const setIsAdmin = (data: any): SetAdminAction => ({
  type: 'SET_ADMIN',
  payload: data,
});
