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
import { SaveMenuItem } from './save-menu-item';

/**
 * 
 * @export
 * @interface SaveMenuInput
 */
export interface SaveMenuInput {
    /**
     * 
     * @type {string}
     * @memberof SaveMenuInput
     */
    'tenantCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaveMenuInput
     */
    'branchCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaveMenuInput
     */
    'lang'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof SaveMenuInput
     */
    'type'?: string | null;
    /**
     * 
     * @type {Array<SaveMenuItem>}
     * @memberof SaveMenuInput
     */
    'menuItems'?: Array<SaveMenuItem> | null;
}

