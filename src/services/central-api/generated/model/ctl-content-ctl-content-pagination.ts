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
import { CtlContent } from './ctl-content';

/**
 * 
 * @export
 * @interface CtlContentCtlContentPagination
 */
export interface CtlContentCtlContentPagination {
    /**
     * 
     * @type {Array<CtlContent>}
     * @memberof CtlContentCtlContentPagination
     */
    'items'?: Array<CtlContent> | null;
    /**
     * 
     * @type {number}
     * @memberof CtlContentCtlContentPagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlContentCtlContentPagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlContentCtlContentPagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlContentCtlContentPagination
     */
    'pageTotal'?: number;
}

