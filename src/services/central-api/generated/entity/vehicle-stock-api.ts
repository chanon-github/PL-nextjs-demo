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
import { VehicleStockInput } from '../model';
// @ts-ignore
import { VehicleStockSearchOutputVehicleStockSearchOutputPagination } from '../model';
/**
 * VehicleStockApi - axios parameter creator
 * @export
 */
export const VehicleStockApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {number} [productId] 
         * @param {string} [brandCode] 
         * @param {string} [modelCode] 
         * @param {string} [vehicleTypeCode] 
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
        apiVehicleStockGetGet: async (productId?: number, brandCode?: string, modelCode?: string, vehicleTypeCode?: string, status?: string, id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/VehicleStock/Get`;
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

            if (productId !== undefined) {
                localVarQueryParameter['ProductId'] = productId;
            }

            if (brandCode !== undefined) {
                localVarQueryParameter['BrandCode'] = brandCode;
            }

            if (modelCode !== undefined) {
                localVarQueryParameter['ModelCode'] = modelCode;
            }

            if (vehicleTypeCode !== undefined) {
                localVarQueryParameter['VehicleTypeCode'] = vehicleTypeCode;
            }

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
         * @param {VehicleStockInput} [vehicleStockInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiVehicleStockSavePost: async (vehicleStockInput?: VehicleStockInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/VehicleStock/Save`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(vehicleStockInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * VehicleStockApi - functional programming interface
 * @export
 */
export const VehicleStockApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = VehicleStockApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {number} [productId] 
         * @param {string} [brandCode] 
         * @param {string} [modelCode] 
         * @param {string} [vehicleTypeCode] 
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
        async apiVehicleStockGetGet(productId?: number, brandCode?: string, modelCode?: string, vehicleTypeCode?: string, status?: string, id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<VehicleStockSearchOutputVehicleStockSearchOutputPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiVehicleStockGetGet(productId, brandCode, modelCode, vehicleTypeCode, status, id, tenantCode, branchCode, keyword, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {VehicleStockInput} [vehicleStockInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiVehicleStockSavePost(vehicleStockInput?: VehicleStockInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiVehicleStockSavePost(vehicleStockInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * VehicleStockApi - factory interface
 * @export
 */
export const VehicleStockApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = VehicleStockApiFp(configuration)
    return {
        /**
         * 
         * @param {VehicleStockApiApiVehicleStockGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiVehicleStockGetGet(requestParameters: VehicleStockApiApiVehicleStockGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<VehicleStockSearchOutputVehicleStockSearchOutputPagination> {
            return localVarFp.apiVehicleStockGetGet(requestParameters.productId, requestParameters.brandCode, requestParameters.modelCode, requestParameters.vehicleTypeCode, requestParameters.status, requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {VehicleStockApiApiVehicleStockSavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiVehicleStockSavePost(requestParameters: VehicleStockApiApiVehicleStockSavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiVehicleStockSavePost(requestParameters.vehicleStockInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiVehicleStockGetGet operation in VehicleStockApi.
 * @export
 * @interface VehicleStockApiApiVehicleStockGetGetRequest
 */
export interface VehicleStockApiApiVehicleStockGetGetRequest {
    /**
     * 
     * @type {number}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly productId?: number

    /**
     * 
     * @type {string}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly brandCode?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly modelCode?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly vehicleTypeCode?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly status?: string

    /**
     * 
     * @type {number}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly id?: number

    /**
     * 
     * @type {string}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly tenantCode?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly branchCode?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly keyword?: string

    /**
     * 
     * @type {number}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleStockApiApiVehicleStockGetGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiVehicleStockSavePost operation in VehicleStockApi.
 * @export
 * @interface VehicleStockApiApiVehicleStockSavePostRequest
 */
export interface VehicleStockApiApiVehicleStockSavePostRequest {
    /**
     * 
     * @type {VehicleStockInput}
     * @memberof VehicleStockApiApiVehicleStockSavePost
     */
    readonly vehicleStockInput?: VehicleStockInput
}

/**
 * VehicleStockApi - object-oriented interface
 * @export
 * @class VehicleStockApi
 * @extends {BaseAPI}
 */
export class VehicleStockApi extends BaseAPI {
    /**
     * 
     * @param {VehicleStockApiApiVehicleStockGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VehicleStockApi
     */
    public apiVehicleStockGetGet(requestParameters: VehicleStockApiApiVehicleStockGetGetRequest = {}, options?: AxiosRequestConfig) {
        return VehicleStockApiFp(this.configuration).apiVehicleStockGetGet(requestParameters.productId, requestParameters.brandCode, requestParameters.modelCode, requestParameters.vehicleTypeCode, requestParameters.status, requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {VehicleStockApiApiVehicleStockSavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VehicleStockApi
     */
    public apiVehicleStockSavePost(requestParameters: VehicleStockApiApiVehicleStockSavePostRequest = {}, options?: AxiosRequestConfig) {
        return VehicleStockApiFp(this.configuration).apiVehicleStockSavePost(requestParameters.vehicleStockInput, options).then((request) => request(this.axios, this.basePath));
    }
}

