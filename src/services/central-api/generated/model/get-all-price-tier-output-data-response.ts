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
import { GetAllPriceTierOutput } from './get-all-price-tier-output';

/**
 * 
 * @export
 * @interface GetAllPriceTierOutputDataResponse
 */
export interface GetAllPriceTierOutputDataResponse {
    /**
     * 
     * @type {number}
     * @memberof GetAllPriceTierOutputDataResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof GetAllPriceTierOutputDataResponse
     */
    'message'?: string | null;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof GetAllPriceTierOutputDataResponse
     */
    'errors'?: { [key: string]: Array<string>; } | null;
    /**
     * 
     * @type {GetAllPriceTierOutput}
     * @memberof GetAllPriceTierOutputDataResponse
     */
    'data'?: GetAllPriceTierOutput;
}

