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
 * @interface CtlDivisionListDataResponse
 */
export interface CtlDivisionListDataResponse {
    /**
     * 
     * @type {number}
     * @memberof CtlDivisionListDataResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof CtlDivisionListDataResponse
     */
    'message'?: string | null;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof CtlDivisionListDataResponse
     */
    'errors'?: { [key: string]: Array<string>; } | null;
    /**
     * 
     * @type {Array<CtlDivision>}
     * @memberof CtlDivisionListDataResponse
     */
    'data'?: Array<CtlDivision> | null;
}

