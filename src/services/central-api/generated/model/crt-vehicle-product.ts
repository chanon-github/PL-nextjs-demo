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
import { CrtProduct } from './crt-product';

/**
 * 
 * @export
 * @interface CrtVehicleProduct
 */
export interface CrtVehicleProduct {
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleProduct
     */
    'id'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleProduct
     */
    'productId'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleProduct
     */
    'vehicleItemId'?: number;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleProduct
     */
    'createTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleProduct
     */
    'createBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleProduct
     */
    'updateTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleProduct
     */
    'updateBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleProduct
     */
    'tenantCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleProduct
     */
    'branchCode'?: string | null;
    /**
     * 
     * @type {CrtProduct}
     * @memberof CrtVehicleProduct
     */
    'product'?: CrtProduct;
}

