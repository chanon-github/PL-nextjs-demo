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
import { CtlPosition } from './ctl-position';

/**
 * 
 * @export
 * @interface CtlPositionListDataResponse
 */
export interface CtlPositionListDataResponse {
    /**
     * 
     * @type {number}
     * @memberof CtlPositionListDataResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof CtlPositionListDataResponse
     */
    'message'?: string | null;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof CtlPositionListDataResponse
     */
    'errors'?: { [key: string]: Array<string>; } | null;
    /**
     * 
     * @type {Array<CtlPosition>}
     * @memberof CtlPositionListDataResponse
     */
    'data'?: Array<CtlPosition> | null;
}

