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
import { BranchSearchOutput } from './branch-search-output';

/**
 * 
 * @export
 * @interface BranchSearchOutputBranchSearchOutputPagination
 */
export interface BranchSearchOutputBranchSearchOutputPagination {
    /**
     * 
     * @type {Array<BranchSearchOutput>}
     * @memberof BranchSearchOutputBranchSearchOutputPagination
     */
    'items'?: Array<BranchSearchOutput> | null;
    /**
     * 
     * @type {number}
     * @memberof BranchSearchOutputBranchSearchOutputPagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof BranchSearchOutputBranchSearchOutputPagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof BranchSearchOutputBranchSearchOutputPagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof BranchSearchOutputBranchSearchOutputPagination
     */
    'pageTotal'?: number;
}

