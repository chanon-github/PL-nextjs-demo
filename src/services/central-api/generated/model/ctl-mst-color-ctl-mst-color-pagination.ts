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
import { CtlMstColor } from './ctl-mst-color';

/**
 * 
 * @export
 * @interface CtlMstColorCtlMstColorPagination
 */
export interface CtlMstColorCtlMstColorPagination {
    /**
     * 
     * @type {Array<CtlMstColor>}
     * @memberof CtlMstColorCtlMstColorPagination
     */
    'items'?: Array<CtlMstColor> | null;
    /**
     * 
     * @type {number}
     * @memberof CtlMstColorCtlMstColorPagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlMstColorCtlMstColorPagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlMstColorCtlMstColorPagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof CtlMstColorCtlMstColorPagination
     */
    'pageTotal'?: number;
}

