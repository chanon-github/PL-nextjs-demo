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
import { BookingRequestGetOutput } from './booking-request-get-output';

/**
 * 
 * @export
 * @interface BookingRequestGetOutputDataResponse
 */
export interface BookingRequestGetOutputDataResponse {
    /**
     * 
     * @type {number}
     * @memberof BookingRequestGetOutputDataResponse
     */
    'status'?: number;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutputDataResponse
     */
    'message'?: string | null;
    /**
     * 
     * @type {{ [key: string]: Array<string>; }}
     * @memberof BookingRequestGetOutputDataResponse
     */
    'errors'?: { [key: string]: Array<string>; } | null;
    /**
     * 
     * @type {BookingRequestGetOutput}
     * @memberof BookingRequestGetOutputDataResponse
     */
    'data'?: BookingRequestGetOutput;
}

