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
import { CtlUser } from './ctl-user';

/**
 * 
 * @export
 * @interface CtlDepartment
 */
export interface CtlDepartment {
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'code'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'tenantCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'branchCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'createBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'createTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'updateBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'updateTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'deleteBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'deleteTimestamp'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof CtlDepartment
     */
    'isDelete'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof CtlDepartment
     */
    'divisionCode'?: string | null;
    /**
     * 
     * @type {Array<CtlUser>}
     * @memberof CtlDepartment
     */
    'ctlUsers'?: Array<CtlUser> | null;
}

