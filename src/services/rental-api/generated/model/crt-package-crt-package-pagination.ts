/* tslint:disable */
/* eslint-disable */
/**
 * pl-car-rental-api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { CrtPackage } from './crt-package';

/**
 * 
 * @export
 * @interface CrtPackageCrtPackagePagination
 */
export interface CrtPackageCrtPackagePagination {
    /**
     * 
     * @type {Array<CrtPackage>}
     * @memberof CrtPackageCrtPackagePagination
     */
    'items'?: Array<CrtPackage> | null;
    /**
     * 
     * @type {number}
     * @memberof CrtPackageCrtPackagePagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtPackageCrtPackagePagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtPackageCrtPackagePagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtPackageCrtPackagePagination
     */
    'pageTotal'?: number;
}

