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
import { SaveConsentSectionInput } from './save-consent-section-input';

/**
 * 
 * @export
 * @interface SaveConsentInput
 */
export interface SaveConsentInput {
    /**
     * 
     * @type {string}
     * @memberof SaveConsentInput
     */
    'subjectCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaveConsentInput
     */
    'lang'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaveConsentInput
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaveConsentInput
     */
    'content'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaveConsentInput
     */
    'selectionType'?: string | null;
    /**
     * 
     * @type {Array<SaveConsentSectionInput>}
     * @memberof SaveConsentInput
     */
    'sections'?: Array<SaveConsentSectionInput> | null;
}

