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
import { CrtProductCrtProductPagination } from '../model';
// @ts-ignore
import { ProductInput } from '../model';
/**
 * ProductApi - axios parameter creator
 * @export
 */
export const ProductApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CarrentalDeleteInput} [carrentalDeleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductDeleteDelete: async (carrentalDeleteInput?: CarrentalDeleteInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Product/Delete`;
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
         * @param {string} [status] 
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
        apiProductGetGet: async (status?: string, id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Product/Get`;
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

            if (status !== undefined) {
                localVarQueryParameter['Status'] = status;
            }

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
         * @param {ProductInput} [productInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductSavePost: async (productInput?: ProductInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Product/Save`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(productInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * ProductApi - functional programming interface
 * @export
 */
export const ProductApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ProductApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CarrentalDeleteInput} [carrentalDeleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductDeleteDelete(carrentalDeleteInput?: CarrentalDeleteInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiProductDeleteDelete(carrentalDeleteInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [status] 
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
        async apiProductGetGet(status?: string, id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CrtProductCrtProductPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiProductGetGet(status, id, tenantCode, branchCode, keyword, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {ProductInput} [productInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiProductSavePost(productInput?: ProductInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiProductSavePost(productInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ProductApi - factory interface
 * @export
 */
export const ProductApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ProductApiFp(configuration)
    return {
        /**
         * 
         * @param {ProductApiApiProductDeleteDeleteRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductDeleteDelete(requestParameters: ProductApiApiProductDeleteDeleteRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiProductDeleteDelete(requestParameters.carrentalDeleteInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ProductApiApiProductGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductGetGet(requestParameters: ProductApiApiProductGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CrtProductCrtProductPagination> {
            return localVarFp.apiProductGetGet(requestParameters.status, requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ProductApiApiProductSavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiProductSavePost(requestParameters: ProductApiApiProductSavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiProductSavePost(requestParameters.productInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiProductDeleteDelete operation in ProductApi.
 * @export
 * @interface ProductApiApiProductDeleteDeleteRequest
 */
export interface ProductApiApiProductDeleteDeleteRequest {
    /**
     * 
     * @type {CarrentalDeleteInput}
     * @memberof ProductApiApiProductDeleteDelete
     */
    readonly carrentalDeleteInput?: CarrentalDeleteInput
}

/**
 * Request parameters for apiProductGetGet operation in ProductApi.
 * @export
 * @interface ProductApiApiProductGetGetRequest
 */
export interface ProductApiApiProductGetGetRequest {
    /**
     * 
     * @type {string}
     * @memberof ProductApiApiProductGetGet
     */
    readonly status?: string

    /**
     * 
     * @type {number}
     * @memberof ProductApiApiProductGetGet
     */
    readonly id?: number

    /**
     * 
     * @type {string}
     * @memberof ProductApiApiProductGetGet
     */
    readonly tenantCode?: string

    /**
     * 
     * @type {string}
     * @memberof ProductApiApiProductGetGet
     */
    readonly branchCode?: string

    /**
     * 
     * @type {string}
     * @memberof ProductApiApiProductGetGet
     */
    readonly keyword?: string

    /**
     * 
     * @type {number}
     * @memberof ProductApiApiProductGetGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof ProductApiApiProductGetGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof ProductApiApiProductGetGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof ProductApiApiProductGetGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiProductSavePost operation in ProductApi.
 * @export
 * @interface ProductApiApiProductSavePostRequest
 */
export interface ProductApiApiProductSavePostRequest {
    /**
     * 
     * @type {ProductInput}
     * @memberof ProductApiApiProductSavePost
     */
    readonly productInput?: ProductInput
}

/**
 * ProductApi - object-oriented interface
 * @export
 * @class ProductApi
 * @extends {BaseAPI}
 */
export class ProductApi extends BaseAPI {
    /**
     * 
     * @param {ProductApiApiProductDeleteDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductApi
     */
    public apiProductDeleteDelete(requestParameters: ProductApiApiProductDeleteDeleteRequest = {}, options?: AxiosRequestConfig) {
        return ProductApiFp(this.configuration).apiProductDeleteDelete(requestParameters.carrentalDeleteInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ProductApiApiProductGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductApi
     */
    public apiProductGetGet(requestParameters: ProductApiApiProductGetGetRequest = {}, options?: AxiosRequestConfig) {
        return ProductApiFp(this.configuration).apiProductGetGet(requestParameters.status, requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ProductApiApiProductSavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ProductApi
     */
    public apiProductSavePost(requestParameters: ProductApiApiProductSavePostRequest = {}, options?: AxiosRequestConfig) {
        return ProductApiFp(this.configuration).apiProductSavePost(requestParameters.productInput, options).then((request) => request(this.axios, this.basePath));
    }
}

