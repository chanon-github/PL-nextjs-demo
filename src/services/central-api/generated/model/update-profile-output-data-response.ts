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
import { UpdateProfileOutput } from './update-profile-output';

/**
 * 
 * @export
 * @interface UpdateProfileOutputDataResponse
 */
export interface UpdateProfileOutputDataResponse {
    /**
     * 
     * @type {number}
     * @memberof UpdateProfileOutputDataResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof UpdateProfileOutputDataResponse
     */
    'message'?: string | null;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof UpdateProfileOutputDataResponse
     */
    'errors'?: { [key: string]: Array<string>; } | null;
    /**
     * 
     * @type {UpdateProfileOutput}
     * @memberof UpdateProfileOutputDataResponse
     */
    'data'?: UpdateProfileOutput;
}

