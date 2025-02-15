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
import { PromotionItemInput } from './promotion-item-input';
// May contain unused imports in some cases
// @ts-ignore
import { PromotionVehicleInput } from './promotion-vehicle-input';

/**
 * 
 * @export
 * @interface PromotionInput
 */
export interface PromotionInput {
    /**
     * 
     * @type {number}
     * @memberof PromotionInput
     */
    'id'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'code'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'startDate'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'endDate'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'startDateToUse'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'endDateToUse'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionInput
     */
    'productId'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionInput
     */
    'productNumber'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'method'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'payment'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof PromotionInput
     */
    'isActive'?: boolean | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'imageUrl'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'tenantCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof PromotionInput
     */
    'branchCode'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionInput
     */
    'minimumDay'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionInput
     */
    'discountPerDay'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PromotionInput
     */
    'discountPercentPerDay'?: number | null;
    /**
     * 
     * @type {Array<PromotionItemInput>}
     * @memberof PromotionInput
     */
    'promotionItems'?: Array<PromotionItemInput> | null;
    /**
     * 
     * @type {Array<PromotionVehicleInput>}
     * @memberof PromotionInput
     */
    'promotionVehicles'?: Array<PromotionVehicleInput> | null;
}

