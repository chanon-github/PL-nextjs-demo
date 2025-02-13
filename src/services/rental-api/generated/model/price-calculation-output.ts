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
import { PromotionPackageItem } from './promotion-package-item';

/**
 * 
 * @export
 * @interface PriceCalculationOutput
 */
export interface PriceCalculationOutput {
    /**
     * 
     * @type {number}
     * @memberof PriceCalculationOutput
     */
    'originalCarPrice'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PriceCalculationOutput
     */
    'discountCarPrice'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PriceCalculationOutput
     */
    'originalPrice'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PriceCalculationOutput
     */
    'discountPrice'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof PriceCalculationOutput
     */
    'discountAmount'?: number | null;
    /**
     * 
     * @type {Array<PromotionPackageItem>}
     * @memberof PriceCalculationOutput
     */
    'packageItems'?: Array<PromotionPackageItem> | null;
}

