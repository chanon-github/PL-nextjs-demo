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
import { CrtVehicleGroupDetail } from './crt-vehicle-group-detail';

/**
 * 
 * @export
 * @interface CrtVehicleGroup
 */
export interface CrtVehicleGroup {
    /**
     * 
     * @type {number}
     * @memberof CrtVehicleGroup
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'groupName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'status'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'tenantCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'branchCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'createTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'createBy'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof CrtVehicleGroup
     */
    'isDelete'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'deleteTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'deleteBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'updateTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof CrtVehicleGroup
     */
    'updateBy'?: string | null;
    /**
     * 
     * @type {Array<CrtVehicleGroupDetail>}
     * @memberof CrtVehicleGroup
     */
    'crtVehicleGroupDetails'?: Array<CrtVehicleGroupDetail> | null;
}

