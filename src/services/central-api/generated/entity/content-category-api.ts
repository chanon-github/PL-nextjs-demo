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
import { ContentCategoryInput } from '../model';
// @ts-ignore
import { CtlContentCategoryCtlContentCategoryPagination } from '../model';
// @ts-ignore
import { DeleteInput } from '../model';
/**
 * ContentCategoryApi - axios parameter creator
 * @export
 */
export const ContentCategoryApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {DeleteInput} [deleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiContentCategoryDeleteDelete: async (deleteInput?: DeleteInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/ContentCategory/Delete`;
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
        apiContentCategoryGetGet: async (code?: string, tenantCode?: string, branchCode?: string, keyword?: string, status?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/ContentCategory/Get`;
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
         * @param {ContentCategoryInput} [contentCategoryInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiContentCategorySavePost: async (contentCategoryInput?: ContentCategoryInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/ContentCategory/Save`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(contentCategoryInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ContentCategoryApi - functional programming interface
 * @export
 */
export const ContentCategoryApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ContentCategoryApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {DeleteInput} [deleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiContentCategoryDeleteDelete(deleteInput?: DeleteInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiContentCategoryDeleteDelete(deleteInput, options);
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
        async apiContentCategoryGetGet(code?: string, tenantCode?: string, branchCode?: string, keyword?: string, status?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CtlContentCategoryCtlContentCategoryPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiContentCategoryGetGet(code, tenantCode, branchCode, keyword, status, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {ContentCategoryInput} [contentCategoryInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiContentCategorySavePost(contentCategoryInput?: ContentCategoryInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiContentCategorySavePost(contentCategoryInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ContentCategoryApi - factory interface
 * @export
 */
export const ContentCategoryApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ContentCategoryApiFp(configuration)
    return {
        /**
         * 
         * @param {ContentCategoryApiApiContentCategoryDeleteDeleteRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiContentCategoryDeleteDelete(requestParameters: ContentCategoryApiApiContentCategoryDeleteDeleteRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiContentCategoryDeleteDelete(requestParameters.deleteInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ContentCategoryApiApiContentCategoryGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiContentCategoryGetGet(requestParameters: ContentCategoryApiApiContentCategoryGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CtlContentCategoryCtlContentCategoryPagination> {
            return localVarFp.apiContentCategoryGetGet(requestParameters.code, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.status, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ContentCategoryApiApiContentCategorySavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiContentCategorySavePost(requestParameters: ContentCategoryApiApiContentCategorySavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiContentCategorySavePost(requestParameters.contentCategoryInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiContentCategoryDeleteDelete operation in ContentCategoryApi.
 * @export
 * @interface ContentCategoryApiApiContentCategoryDeleteDeleteRequest
 */
export interface ContentCategoryApiApiContentCategoryDeleteDeleteRequest {
    /**
     * 
     * @type {DeleteInput}
     * @memberof ContentCategoryApiApiContentCategoryDeleteDelete
     */
    readonly deleteInput?: DeleteInput
}

/**
 * Request parameters for apiContentCategoryGetGet operation in ContentCategoryApi.
 * @export
 * @interface ContentCategoryApiApiContentCategoryGetGetRequest
 */
export interface ContentCategoryApiApiContentCategoryGetGetRequest {
    /**
     * 
     * @type {string}
     * @memberof ContentCategoryApiApiContentCategoryGetGet
     */
    readonly code?: string

    /**
     * 
     * @type {string}
     * @memberof ContentCategoryApiApiContentCategoryGetGet
     */
    readonly tenantCode?: string

    /**
     * 
     * @type {string}
     * @memberof ContentCategoryApiApiContentCategoryGetGet
     */
    readonly branchCode?: string

    /**
     * 
     * @type {string}
     * @memberof ContentCategoryApiApiContentCategoryGetGet
     */
    readonly keyword?: string

    /**
     * 
     * @type {string}
     * @memberof ContentCategoryApiApiContentCategoryGetGet
     */
    readonly status?: string

    /**
     * 
     * @type {number}
     * @memberof ContentCategoryApiApiContentCategoryGetGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof ContentCategoryApiApiContentCategoryGetGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof ContentCategoryApiApiContentCategoryGetGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof ContentCategoryApiApiContentCategoryGetGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiContentCategorySavePost operation in ContentCategoryApi.
 * @export
 * @interface ContentCategoryApiApiContentCategorySavePostRequest
 */
export interface ContentCategoryApiApiContentCategorySavePostRequest {
    /**
     * 
     * @type {ContentCategoryInput}
     * @memberof ContentCategoryApiApiContentCategorySavePost
     */
    readonly contentCategoryInput?: ContentCategoryInput
}

/**
 * ContentCategoryApi - object-oriented interface
 * @export
 * @class ContentCategoryApi
 * @extends {BaseAPI}
 */
export class ContentCategoryApi extends BaseAPI {
    /**
     * 
     * @param {ContentCategoryApiApiContentCategoryDeleteDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentCategoryApi
     */
    public apiContentCategoryDeleteDelete(requestParameters: ContentCategoryApiApiContentCategoryDeleteDeleteRequest = {}, options?: AxiosRequestConfig) {
        return ContentCategoryApiFp(this.configuration).apiContentCategoryDeleteDelete(requestParameters.deleteInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ContentCategoryApiApiContentCategoryGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentCategoryApi
     */
    public apiContentCategoryGetGet(requestParameters: ContentCategoryApiApiContentCategoryGetGetRequest = {}, options?: AxiosRequestConfig) {
        return ContentCategoryApiFp(this.configuration).apiContentCategoryGetGet(requestParameters.code, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.status, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ContentCategoryApiApiContentCategorySavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ContentCategoryApi
     */
    public apiContentCategorySavePost(requestParameters: ContentCategoryApiApiContentCategorySavePostRequest = {}, options?: AxiosRequestConfig) {
        return ContentCategoryApiFp(this.configuration).apiContentCategorySavePost(requestParameters.contentCategoryInput, options).then((request) => request(this.axios, this.basePath));
    }
}

