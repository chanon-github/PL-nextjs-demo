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
import { CtlDivision } from './ctl-division';

/**
 * 
 * @export
 * @interface CtlDivisionCtlDivisionPagination
 */
export interface CtlDivisionCtlDivisionPagination {
    /**
     * 
     * @type {Array<CtlDivision>}
     * @memberof CtlDivisionCtlDivisionPagination
     */
    'items'?: Array<CtlDivision> | null;
    /**
     * 
     * @type {number}
     * @memberof CtlDivisionCtlDivisionPagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlDivisionCtlDivisionPagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlDivisionCtlDivisionPagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlDivisionCtlDivisionPagination
     */
    'pageTotal'?: number;
}

