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
import { CtlMstGearCtlMstGearPagination } from '../model';
// @ts-ignore
import { DeleteInput } from '../model';
// @ts-ignore
import { MasterGearInput } from '../model';
/**
 * GearApi - axios parameter creator
 * @export
 */
export const GearApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {DeleteInput} [deleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterGearDeleteDelete: async (deleteInput?: DeleteInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/Gear/Delete`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'DELETE', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(deleteInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [code] 
         * @param {string} [tenantCode] 
         * @param {string} [branchCode] 
         * @param {string} [keyword] 
         * @param {string} [status] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterGearGetGet: async (code?: string, tenantCode?: string, branchCode?: string, keyword?: string, status?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/Gear/Get`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)

            if (code !== undefined) {
                localVarQueryParameter['Code'] = code;
            }

            if (tenantCode !== undefined) {
                localVarQueryParameter['TenantCode'] = tenantCode;
            }

            if (branchCode !== undefined) {
                localVarQueryParameter['BranchCode'] = branchCode;
            }

            if (keyword !== undefined) {
                localVarQueryParameter['Keyword'] = keyword;
            }

            if (status !== undefined) {
                localVarQueryParameter['Status'] = status;
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
         * @param {MasterGearInput} [masterGearInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterGearSavePost: async (masterGearInput?: MasterGearInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/Gear/Save`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Bearer required
            // http bearer authentication required
            await setBearerAuthToObject(localVarHeaderParameter, configuration)


    
            localVarHeaderParameter['Content-Type'] = 'application/json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(masterGearInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * GearApi - functional programming interface
 * @export
 */
export const GearApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = GearApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {DeleteInput} [deleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterGearDeleteDelete(deleteInput?: DeleteInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterGearDeleteDelete(deleteInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [code] 
         * @param {string} [tenantCode] 
         * @param {string} [branchCode] 
         * @param {string} [keyword] 
         * @param {string} [status] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterGearGetGet(code?: string, tenantCode?: string, branchCode?: string, keyword?: string, status?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CtlMstGearCtlMstGearPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterGearGetGet(code, tenantCode, branchCode, keyword, status, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {MasterGearInput} [masterGearInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterGearSavePost(masterGearInput?: MasterGearInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterGearSavePost(masterGearInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * GearApi - factory interface
 * @export
 */
export const GearApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = GearApiFp(configuration)
    return {
        /**
         * 
         * @param {GearApiApiMasterGearDeleteDeleteRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterGearDeleteDelete(requestParameters: GearApiApiMasterGearDeleteDeleteRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterGearDeleteDelete(requestParameters.deleteInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {GearApiApiMasterGearGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterGearGetGet(requestParameters: GearApiApiMasterGearGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CtlMstGearCtlMstGearPagination> {
            return localVarFp.apiMasterGearGetGet(requestParameters.code, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.status, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {GearApiApiMasterGearSavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterGearSavePost(requestParameters: GearApiApiMasterGearSavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterGearSavePost(requestParameters.masterGearInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiMasterGearDeleteDelete operation in GearApi.
 * @export
 * @interface GearApiApiMasterGearDeleteDeleteRequest
 */
export interface GearApiApiMasterGearDeleteDeleteRequest {
    /**
     * 
     * @type {DeleteInput}
     * @memberof GearApiApiMasterGearDeleteDelete
     */
    readonly deleteInput?: DeleteInput
}

/**
 * Request parameters for apiMasterGearGetGet operation in GearApi.
 * @export
 * @interface GearApiApiMasterGearGetGetRequest
 */
export interface GearApiApiMasterGearGetGetRequest {
    /**
     * 
     * @type {string}
     * @memberof GearApiApiMasterGearGetGet
     */
    readonly code?: string

    /**
     * 
     * @type {string}
     * @memberof GearApiApiMasterGearGetGet
     */
    readonly tenantCode?: string

    /**
     * 
     * @type {string}
     * @memberof GearApiApiMasterGearGetGet
     */
    readonly branchCode?: string

    /**
     * 
     * @type {string}
     * @memberof GearApiApiMasterGearGetGet
     */
    readonly keyword?: string

    /**
     * 
     * @type {string}
     * @memberof GearApiApiMasterGearGetGet
     */
    readonly status?: string

    /**
     * 
     * @type {number}
     * @memberof GearApiApiMasterGearGetGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof GearApiApiMasterGearGetGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof GearApiApiMasterGearGetGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof GearApiApiMasterGearGetGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiMasterGearSavePost operation in GearApi.
 * @export
 * @interface GearApiApiMasterGearSavePostRequest
 */
export interface GearApiApiMasterGearSavePostRequest {
    /**
     * 
     * @type {MasterGearInput}
     * @memberof GearApiApiMasterGearSavePost
     */
    readonly masterGearInput?: MasterGearInput
}

/**
 * GearApi - object-oriented interface
 * @export
 * @class GearApi
 * @extends {BaseAPI}
 */
export class GearApi extends BaseAPI {
    /**
     * 
     * @param {GearApiApiMasterGearDeleteDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GearApi
     */
    public apiMasterGearDeleteDelete(requestParameters: GearApiApiMasterGearDeleteDeleteRequest = {}, options?: AxiosRequestConfig) {
        return GearApiFp(this.configuration).apiMasterGearDeleteDelete(requestParameters.deleteInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {GearApiApiMasterGearGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GearApi
     */
    public apiMasterGearGetGet(requestParameters: GearApiApiMasterGearGetGetRequest = {}, options?: AxiosRequestConfig) {
        return GearApiFp(this.configuration).apiMasterGearGetGet(requestParameters.code, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.status, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {GearApiApiMasterGearSavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof GearApi
     */
    public apiMasterGearSavePost(requestParameters: GearApiApiMasterGearSavePostRequest = {}, options?: AxiosRequestConfig) {
        return GearApiFp(this.configuration).apiMasterGearSavePost(requestParameters.masterGearInput, options).then((request) => request(this.axios, this.basePath));
    }
}

