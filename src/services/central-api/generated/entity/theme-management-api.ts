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
import { CarrentalDeleteInput } from '../model';
// @ts-ignore
import { CtlThemeManagementCtlThemeManagementPagination } from '../model';
// @ts-ignore
import { ThemeManagementInput } from '../model';
/**
 * ThemeManagementApi - axios parameter creator
 * @export
 */
export const ThemeManagementApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CarrentalDeleteInput} [carrentalDeleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterThemeManagementDeleteDelete: async (carrentalDeleteInput?: CarrentalDeleteInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/ThemeManagement/Delete`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(carrentalDeleteInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [id] 
         * @param {string} [tenantCode] 
         * @param {string} [branchCode] 
         * @param {string} [keyword] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterThemeManagementGetGet: async (id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/ThemeManagement/Get`;
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

            if (id !== undefined) {
                localVarQueryParameter['Id'] = id;
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
         * @param {ThemeManagementInput} [themeManagementInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterThemeManagementSavePost: async (themeManagementInput?: ThemeManagementInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/ThemeManagement/Save`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(themeManagementInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ThemeManagementApi - functional programming interface
 * @export
 */
export const ThemeManagementApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ThemeManagementApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CarrentalDeleteInput} [carrentalDeleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterThemeManagementDeleteDelete(carrentalDeleteInput?: CarrentalDeleteInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterThemeManagementDeleteDelete(carrentalDeleteInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} [id] 
         * @param {string} [tenantCode] 
         * @param {string} [branchCode] 
         * @param {string} [keyword] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterThemeManagementGetGet(id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CtlThemeManagementCtlThemeManagementPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterThemeManagementGetGet(id, tenantCode, branchCode, keyword, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {ThemeManagementInput} [themeManagementInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterThemeManagementSavePost(themeManagementInput?: ThemeManagementInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterThemeManagementSavePost(themeManagementInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ThemeManagementApi - factory interface
 * @export
 */
export const ThemeManagementApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ThemeManagementApiFp(configuration)
    return {
        /**
         * 
         * @param {ThemeManagementApiApiMasterThemeManagementDeleteDeleteRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterThemeManagementDeleteDelete(requestParameters: ThemeManagementApiApiMasterThemeManagementDeleteDeleteRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterThemeManagementDeleteDelete(requestParameters.carrentalDeleteInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ThemeManagementApiApiMasterThemeManagementGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterThemeManagementGetGet(requestParameters: ThemeManagementApiApiMasterThemeManagementGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CtlThemeManagementCtlThemeManagementPagination> {
            return localVarFp.apiMasterThemeManagementGetGet(requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ThemeManagementApiApiMasterThemeManagementSavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterThemeManagementSavePost(requestParameters: ThemeManagementApiApiMasterThemeManagementSavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterThemeManagementSavePost(requestParameters.themeManagementInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiMasterThemeManagementDeleteDelete operation in ThemeManagementApi.
 * @export
 * @interface ThemeManagementApiApiMasterThemeManagementDeleteDeleteRequest
 */
export interface ThemeManagementApiApiMasterThemeManagementDeleteDeleteRequest {
    /**
     * 
     * @type {CarrentalDeleteInput}
     * @memberof ThemeManagementApiApiMasterThemeManagementDeleteDelete
     */
    readonly carrentalDeleteInput?: CarrentalDeleteInput
}

/**
 * Request parameters for apiMasterThemeManagementGetGet operation in ThemeManagementApi.
 * @export
 * @interface ThemeManagementApiApiMasterThemeManagementGetGetRequest
 */
export interface ThemeManagementApiApiMasterThemeManagementGetGetRequest {
    /**
     * 
     * @type {number}
     * @memberof ThemeManagementApiApiMasterThemeManagementGetGet
     */
    readonly id?: number

    /**
     * 
     * @type {string}
     * @memberof ThemeManagementApiApiMasterThemeManagementGetGet
     */
    readonly tenantCode?: string

    /**
     * 
     * @type {string}
     * @memberof ThemeManagementApiApiMasterThemeManagementGetGet
     */
    readonly branchCode?: string

    /**
     * 
     * @type {string}
     * @memberof ThemeManagementApiApiMasterThemeManagementGetGet
     */
    readonly keyword?: string

    /**
     * 
     * @type {number}
     * @memberof ThemeManagementApiApiMasterThemeManagementGetGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof ThemeManagementApiApiMasterThemeManagementGetGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof ThemeManagementApiApiMasterThemeManagementGetGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof ThemeManagementApiApiMasterThemeManagementGetGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiMasterThemeManagementSavePost operation in ThemeManagementApi.
 * @export
 * @interface ThemeManagementApiApiMasterThemeManagementSavePostRequest
 */
export interface ThemeManagementApiApiMasterThemeManagementSavePostRequest {
    /**
     * 
     * @type {ThemeManagementInput}
     * @memberof ThemeManagementApiApiMasterThemeManagementSavePost
     */
    readonly themeManagementInput?: ThemeManagementInput
}

/**
 * ThemeManagementApi - object-oriented interface
 * @export
 * @class ThemeManagementApi
 * @extends {BaseAPI}
 */
export class ThemeManagementApi extends BaseAPI {
    /**
     * 
     * @param {ThemeManagementApiApiMasterThemeManagementDeleteDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ThemeManagementApi
     */
    public apiMasterThemeManagementDeleteDelete(requestParameters: ThemeManagementApiApiMasterThemeManagementDeleteDeleteRequest = {}, options?: AxiosRequestConfig) {
        return ThemeManagementApiFp(this.configuration).apiMasterThemeManagementDeleteDelete(requestParameters.carrentalDeleteInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ThemeManagementApiApiMasterThemeManagementGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ThemeManagementApi
     */
    public apiMasterThemeManagementGetGet(requestParameters: ThemeManagementApiApiMasterThemeManagementGetGetRequest = {}, options?: AxiosRequestConfig) {
        return ThemeManagementApiFp(this.configuration).apiMasterThemeManagementGetGet(requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ThemeManagementApiApiMasterThemeManagementSavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ThemeManagementApi
     */
    public apiMasterThemeManagementSavePost(requestParameters: ThemeManagementApiApiMasterThemeManagementSavePostRequest = {}, options?: AxiosRequestConfig) {
        return ThemeManagementApiFp(this.configuration).apiMasterThemeManagementSavePost(requestParameters.themeManagementInput, options).then((request) => request(this.axios, this.basePath));
    }
}

