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
import { CtlMstHotelCtlMstHotelPagination } from '../model';
// @ts-ignore
import { DeleteInput } from '../model';
// @ts-ignore
import { MasterHotelInput } from '../model';
/**
 * HotelApi - axios parameter creator
 * @export
 */
export const HotelApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {DeleteInput} [deleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterHotelDeleteDelete: async (deleteInput?: DeleteInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/Hotel/Delete`;
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
        apiMasterHotelGetGet: async (code?: string, tenantCode?: string, branchCode?: string, keyword?: string, status?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/Hotel/Get`;
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
         * @param {MasterHotelInput} [masterHotelInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterHotelSavePost: async (masterHotelInput?: MasterHotelInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/Hotel/Save`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(masterHotelInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * HotelApi - functional programming interface
 * @export
 */
export const HotelApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = HotelApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {DeleteInput} [deleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterHotelDeleteDelete(deleteInput?: DeleteInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterHotelDeleteDelete(deleteInput, options);
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
        async apiMasterHotelGetGet(code?: string, tenantCode?: string, branchCode?: string, keyword?: string, status?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CtlMstHotelCtlMstHotelPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterHotelGetGet(code, tenantCode, branchCode, keyword, status, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {MasterHotelInput} [masterHotelInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterHotelSavePost(masterHotelInput?: MasterHotelInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterHotelSavePost(masterHotelInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * HotelApi - factory interface
 * @export
 */
export const HotelApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = HotelApiFp(configuration)
    return {
        /**
         * 
         * @param {HotelApiApiMasterHotelDeleteDeleteRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterHotelDeleteDelete(requestParameters: HotelApiApiMasterHotelDeleteDeleteRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterHotelDeleteDelete(requestParameters.deleteInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {HotelApiApiMasterHotelGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterHotelGetGet(requestParameters: HotelApiApiMasterHotelGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CtlMstHotelCtlMstHotelPagination> {
            return localVarFp.apiMasterHotelGetGet(requestParameters.code, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.status, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {HotelApiApiMasterHotelSavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterHotelSavePost(requestParameters: HotelApiApiMasterHotelSavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterHotelSavePost(requestParameters.masterHotelInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiMasterHotelDeleteDelete operation in HotelApi.
 * @export
 * @interface HotelApiApiMasterHotelDeleteDeleteRequest
 */
export interface HotelApiApiMasterHotelDeleteDeleteRequest {
    /**
     * 
     * @type {DeleteInput}
     * @memberof HotelApiApiMasterHotelDeleteDelete
     */
    readonly deleteInput?: DeleteInput
}

/**
 * Request parameters for apiMasterHotelGetGet operation in HotelApi.
 * @export
 * @interface HotelApiApiMasterHotelGetGetRequest
 */
export interface HotelApiApiMasterHotelGetGetRequest {
    /**
     * 
     * @type {string}
     * @memberof HotelApiApiMasterHotelGetGet
     */
    readonly code?: string

    /**
     * 
     * @type {string}
     * @memberof HotelApiApiMasterHotelGetGet
     */
    readonly tenantCode?: string

    /**
     * 
     * @type {string}
     * @memberof HotelApiApiMasterHotelGetGet
     */
    readonly branchCode?: string

    /**
     * 
     * @type {string}
     * @memberof HotelApiApiMasterHotelGetGet
     */
    readonly keyword?: string

    /**
     * 
     * @type {string}
     * @memberof HotelApiApiMasterHotelGetGet
     */
    readonly status?: string

    /**
     * 
     * @type {number}
     * @memberof HotelApiApiMasterHotelGetGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof HotelApiApiMasterHotelGetGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof HotelApiApiMasterHotelGetGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof HotelApiApiMasterHotelGetGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiMasterHotelSavePost operation in HotelApi.
 * @export
 * @interface HotelApiApiMasterHotelSavePostRequest
 */
export interface HotelApiApiMasterHotelSavePostRequest {
    /**
     * 
     * @type {MasterHotelInput}
     * @memberof HotelApiApiMasterHotelSavePost
     */
    readonly masterHotelInput?: MasterHotelInput
}

/**
 * HotelApi - object-oriented interface
 * @export
 * @class HotelApi
 * @extends {BaseAPI}
 */
export class HotelApi extends BaseAPI {
    /**
     * 
     * @param {HotelApiApiMasterHotelDeleteDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HotelApi
     */
    public apiMasterHotelDeleteDelete(requestParameters: HotelApiApiMasterHotelDeleteDeleteRequest = {}, options?: AxiosRequestConfig) {
        return HotelApiFp(this.configuration).apiMasterHotelDeleteDelete(requestParameters.deleteInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {HotelApiApiMasterHotelGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HotelApi
     */
    public apiMasterHotelGetGet(requestParameters: HotelApiApiMasterHotelGetGetRequest = {}, options?: AxiosRequestConfig) {
        return HotelApiFp(this.configuration).apiMasterHotelGetGet(requestParameters.code, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.status, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {HotelApiApiMasterHotelSavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof HotelApi
     */
    public apiMasterHotelSavePost(requestParameters: HotelApiApiMasterHotelSavePostRequest = {}, options?: AxiosRequestConfig) {
        return HotelApiFp(this.configuration).apiMasterHotelSavePost(requestParameters.masterHotelInput, options).then((request) => request(this.axios, this.basePath));
    }
}

