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



/**
 * 
 * @export
 * @interface GetPaymentInfoOutput
 */
export interface GetPaymentInfoOutput {
    /**
     * 
     * @type {string}
     * @memberof GetPaymentInfoOutput
     */
    'bookingNo'?: string | null;
    /**
     * 
     * @type {boolean}
     * @memberof GetPaymentInfoOutput
     */
    'isComplete'?: boolean;
    /**
     * 
     * @type {string}
     * @memberof GetPaymentInfoOutput
     */
    'status'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof GetPaymentInfoOutput
     */
    'completeDate'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof GetPaymentInfoOutput
     */
    'message'?: string | null;
}

