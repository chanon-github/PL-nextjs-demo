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
import { CtlBanner } from './ctl-banner';

/**
 * 
 * @export
 * @interface CtlBannerListDataResponse
 */
export interface CtlBannerListDataResponse {
    /**
     * 
     * @type {number}
     * @memberof CtlBannerListDataResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof CtlBannerListDataResponse
     */
    'message'?: string | null;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof CtlBannerListDataResponse
     */
    'errors'?: { [key: string]: Array<string>; } | null;
    /**
     * 
     * @type {Array<CtlBanner>}
     * @memberof CtlBannerListDataResponse
     */
    'data'?: Array<CtlBanner> | null;
}

