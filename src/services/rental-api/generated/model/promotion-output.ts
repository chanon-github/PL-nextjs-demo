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
import { PromotionItem } from './promotion-item';
// May contain unused imports in some cases
// @ts-ignore
import { PromotionVehicleMaster } from './promotion-vehicle-master';

/**
 * 
 * @export
 * @interface PromotionOutput
 */
export interface PromotionOutput {
    /**
     * 
     * @type {number}
     * @memberof PromotionOutput
     */
    'id'?: number;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'code'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'startDate'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'endDate'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'startDateToUse'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'endDateToUse'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionOutput
     */
    'productId'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionOutput
     */
    'productNumber'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'method'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'payment'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'status'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'createTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'createBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'updateTimestamp'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'updateBy'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'tenantCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'branchCode'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionOutput
     */
    'minimumDay'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionOutput
     */
    'discountPerDay'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionOutput
     */
    'discountPercentPerDay'?: number | null;
    /**
     * 
     * @type {boolean}
     * @memberof PromotionOutput
     */
    'isActive'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionOutput
     */
    'imageUrl'?: string | null;
    /**
     * 
     * @type {Array<PromotionItem>}
     * @memberof PromotionOutput
     */
    'promotionItems'?: Array<PromotionItem> | null;
    /**
     * 
     * @type {Array<PromotionVehicleMaster>}
     * @memberof PromotionOutput
     */
    'vehicleMasters'?: Array<PromotionVehicleMaster> | null;
}

