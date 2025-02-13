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


import type { Configuration } from '../configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from '../common';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
// @ts-ignore
import { BooleanDataResponse } from '../model';
// @ts-ignore
import { CtlSettingCtlSettingPagination } from '../model';
// @ts-ignore
import { SettingInput } from '../model';
/**
 * SettingApi - axios parameter creator
 * @export
 */
export const SettingApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {string} [key] 
         * @param {string} [value] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSettingGetGet: async (key?: string, value?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Setting/Get`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (key !== undefined) {
                localVarQueryParameter['Key'] = key;
            }

            if (value !== undefined) {
                localVarQueryParameter['Value'] = value;
            }

            if (pageIndex !== undefined) {
                localVarQueryParameter['PageIndex'] = pageIndex;
            }

            if (pageSize !== undefined) {
                localVarQueryParameter['PageSize'] = pageSize;
            }

            if (sortField !== undefined) {
                localVarQueryParameter['SortField'] = sortField;
            }

            if (sortDirection !== undefined) {
                localVarQueryParameter['SortDirection'] = sortDirection;
            }


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {SettingInput} [settingInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSettingSavePost: async (settingInput?: SettingInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Setting/Save`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(settingInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SettingApi - functional programming interface
 * @export
 */
export const SettingApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = SettingApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {string} [key] 
         * @param {string} [value] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSettingGetGet(key?: string, value?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CtlSettingCtlSettingPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiSettingGetGet(key, value, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {SettingInput} [settingInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiSettingSavePost(settingInput?: SettingInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiSettingSavePost(settingInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * SettingApi - factory interface
 * @export
 */
export const SettingApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = SettingApiFp(configuration)
    return {
        /**
         * 
         * @param {SettingApiApiSettingGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSettingGetGet(requestParameters: SettingApiApiSettingGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CtlSettingCtlSettingPagination> {
            return localVarFp.apiSettingGetGet(requestParameters.key, requestParameters.value, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {SettingApiApiSettingSavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiSettingSavePost(requestParameters: SettingApiApiSettingSavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiSettingSavePost(requestParameters.settingInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiSettingGetGet operation in SettingApi.
 * @export
 * @interface SettingApiApiSettingGetGetRequest
 */
export interface SettingApiApiSettingGetGetRequest {
    /**
     * 
     * @type {string}
     * @memberof SettingApiApiSettingGetGet
     */
    readonly key?: string

    /**
     * 
     * @type {string}
     * @memberof SettingApiApiSettingGetGet
     */
    readonly value?: string

    /**
     * 
     * @type {number}
     * @memberof SettingApiApiSettingGetGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof SettingApiApiSettingGetGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof SettingApiApiSettingGetGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof SettingApiApiSettingGetGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiSettingSavePost operation in SettingApi.
 * @export
 * @interface SettingApiApiSettingSavePostRequest
 */
export interface SettingApiApiSettingSavePostRequest {
    /**
     * 
     * @type {SettingInput}
     * @memberof SettingApiApiSettingSavePost
     */
    readonly settingInput?: SettingInput
}

/**
 * SettingApi - object-oriented interface
 * @export
 * @class SettingApi
 * @extends {BaseAPI}
 */
export class SettingApi extends BaseAPI {
    /**
     * 
     * @param {SettingApiApiSettingGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SettingApi
     */
    public apiSettingGetGet(requestParameters: SettingApiApiSettingGetGetRequest = {}, options?: AxiosRequestConfig) {
        return SettingApiFp(this.configuration).apiSettingGetGet(requestParameters.key, requestParameters.value, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {SettingApiApiSettingSavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SettingApi
     */
    public apiSettingSavePost(requestParameters: SettingApiApiSettingSavePostRequest = {}, options?: AxiosRequestConfig) {
        return SettingApiFp(this.configuration).apiSettingSavePost(requestParameters.settingInput, options).then((request) => request(this.axios, this.basePath));
    }
}

