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
import { CtlMstAddress } from './ctl-mst-address';

/**
 * 
 * @export
 * @interface CtlMstAddressCtlMstAddressPagination
 */
export interface CtlMstAddressCtlMstAddressPagination {
    /**
     * 
     * @type {Array<CtlMstAddress>}
     * @memberof CtlMstAddressCtlMstAddressPagination
     */
    'items'?: Array<CtlMstAddress> | null;
    /**
     * 
     * @type {number}
     * @memberof CtlMstAddressCtlMstAddressPagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlMstAddressCtlMstAddressPagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlMstAddressCtlMstAddressPagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlMstAddressCtlMstAddressPagination
     */
    'pageTotal'?: number;
}

