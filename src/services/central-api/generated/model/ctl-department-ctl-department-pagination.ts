/* tslint:disable */
/* eslint-disable */
/**
 * PL Cental API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { CtlDepartment } from './ctl-department';

/**
 * 
 * @export
 * @interface CtlDepartmentCtlDepartmentPagination
 */
export interface CtlDepartmentCtlDepartmentPagination {
    /**
     * 
     * @type {Array<CtlDepartment>}
     * @memberof CtlDepartmentCtlDepartmentPagination
     */
    'items'?: Array<CtlDepartment> | null;
    /**
     * 
     * @type {number}
     * @memberof CtlDepartmentCtlDepartmentPagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlDepartmentCtlDepartmentPagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlDepartmentCtlDepartmentPagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlDepartmentCtlDepartmentPagination
     */
    'pageTotal'?: number;
}

