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
import { CtlTenant } from './ctl-tenant';
// May contain unused imports in some cases
// @ts-ignore
import { CtlUser } from './ctl-user';

/**
 * 
 * @export
 * @interface CtlBranch
 */
export interface CtlBranch {
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'code'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'tenantCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'branchCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'address'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'postcode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'contactName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'contactTel'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'contactMobile'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'contactEmail'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'location'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'createBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'createTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'updateBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'updateTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'deleteBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'deleteTimestamp'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof CtlBranch
     */
    'isDelete'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof CtlBranch
     */
    'status'?: string | null;
    /**
     * 
     * @type {Array<CtlUser>}
     * @memberof CtlBranch
     */
    'ctlUsers'?: Array<CtlUser> | null;
    /**
     * 
     * @type {CtlTenant}
     * @memberof CtlBranch
     */
    'tenantCodeNavigation'?: CtlTenant;
}

