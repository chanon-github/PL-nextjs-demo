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
import { CusCustomerOutput } from './cus-customer-output';

/**
 * 
 * @export
 * @interface CusCustomerCusCustomerOutputPagination
 */
export interface CusCustomerCusCustomerOutputPagination {
    /**
     * 
     * @type {Array<CusCustomerOutput>}
     * @memberof CusCustomerCusCustomerOutputPagination
     */
    'items'?: Array<CusCustomerOutput> | null;
    /**
     * 
     * @type {number}
     * @memberof CusCustomerCusCustomerOutputPagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof CusCustomerCusCustomerOutputPagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof CusCustomerCusCustomerOutputPagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof CusCustomerCusCustomerOutputPagination
     */
    'pageTotal'?: number;
}

