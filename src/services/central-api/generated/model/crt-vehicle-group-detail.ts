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
 * @interface CrtVehicleGroupDetail
 */
export interface CrtVehicleGroupDetail {
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleGroupDetail
     */
    'id'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleGroupDetail
     */
    'groupId'?: number;
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleGroupDetail
     */
    'vehicleMasterId'?: number;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroupDetail
     */
    'createTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroupDetail
     */
    'createBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroupDetail
     */
    'updateTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroupDetail
     */
    'updateBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroupDetail
     */
    'tenantCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroupDetail
     */
    'branchCode'?: string | null;
    /**
     * 
     * @type {CrtVehicleGroup}
     * @memberof CrtVehicleGroupDetail
     */
    'group'?: CrtVehicleGroup;
}

