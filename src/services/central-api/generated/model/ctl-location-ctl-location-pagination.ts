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
import { CtlLocation } from './ctl-location';

/**
 * 
 * @export
 * @interface CtlLocationCtlLocationPagination
 */
export interface CtlLocationCtlLocationPagination {
    /**
     * 
     * @type {Array<CtlLocation>}
     * @memberof CtlLocationCtlLocationPagination
     */
    'items'?: Array<CtlLocation> | null;
    /**
     * 
     * @type {number}
     * @memberof CtlLocationCtlLocationPagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlLocationCtlLocationPagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlLocationCtlLocationPagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlLocationCtlLocationPagination
     */
    'pageTotal'?: number;
}

