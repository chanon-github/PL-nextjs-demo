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
import { CrtVehicleGroup } from './crt-vehicle-group';

/**
 * 
 * @export
 * @interface CrtVehicleGroupCrtVehicleGroupPagination
 */
export interface CrtVehicleGroupCrtVehicleGroupPagination {
    /**
     * 
     * @type {Array<CrtVehicleGroup>}
     * @memberof CrtVehicleGroupCrtVehicleGroupPagination
     */
    'items'?: Array<CrtVehicleGroup> | null;
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleGroupCrtVehicleGroupPagination
     */
    'totalItems'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleGroupCrtVehicleGroupPagination
     */
    'pageIndex'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleGroupCrtVehicleGroupPagination
     */
    'pageSize'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleGroupCrtVehicleGroupPagination
     */
    'pageTotal'?: number;
}

