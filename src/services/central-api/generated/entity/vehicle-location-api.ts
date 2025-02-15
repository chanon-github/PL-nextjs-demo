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
import { CrtVehicleLocationCrtVehicleLocationPagination } from '../model';
// @ts-ignore
import { VehicleLocationInput } from '../model';
/**
 * VehicleLocationApi - axios parameter creator
 * @export
 */
export const VehicleLocationApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CarrentalDeleteInput} [carrentalDeleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleLocationDeleteDelete: async (carrentalDeleteInput?: CarrentalDeleteInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/VehicleLocation/Delete`;
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
        apiMasterVehicleLocationGetGet: async (id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/VehicleLocation/Get`;
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
         * @param {VehicleLocationInput} [vehicleLocationInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleLocationSavePost: async (vehicleLocationInput?: VehicleLocationInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/VehicleLocation/Save`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(vehicleLocationInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * VehicleLocationApi - functional programming interface
 * @export
 */
export const VehicleLocationApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = VehicleLocationApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CarrentalDeleteInput} [carrentalDeleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterVehicleLocationDeleteDelete(carrentalDeleteInput?: CarrentalDeleteInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterVehicleLocationDeleteDelete(carrentalDeleteInput, options);
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
        async apiMasterVehicleLocationGetGet(id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CrtVehicleLocationCrtVehicleLocationPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterVehicleLocationGetGet(id, tenantCode, branchCode, keyword, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {VehicleLocationInput} [vehicleLocationInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterVehicleLocationSavePost(vehicleLocationInput?: VehicleLocationInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterVehicleLocationSavePost(vehicleLocationInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * VehicleLocationApi - factory interface
 * @export
 */
export const VehicleLocationApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = VehicleLocationApiFp(configuration)
    return {
        /**
         * 
         * @param {VehicleLocationApiApiMasterVehicleLocationDeleteDeleteRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleLocationDeleteDelete(requestParameters: VehicleLocationApiApiMasterVehicleLocationDeleteDeleteRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterVehicleLocationDeleteDelete(requestParameters.carrentalDeleteInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {VehicleLocationApiApiMasterVehicleLocationGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleLocationGetGet(requestParameters: VehicleLocationApiApiMasterVehicleLocationGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CrtVehicleLocationCrtVehicleLocationPagination> {
            return localVarFp.apiMasterVehicleLocationGetGet(requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {VehicleLocationApiApiMasterVehicleLocationSavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleLocationSavePost(requestParameters: VehicleLocationApiApiMasterVehicleLocationSavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterVehicleLocationSavePost(requestParameters.vehicleLocationInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiMasterVehicleLocationDeleteDelete operation in VehicleLocationApi.
 * @export
 * @interface VehicleLocationApiApiMasterVehicleLocationDeleteDeleteRequest
 */
export interface VehicleLocationApiApiMasterVehicleLocationDeleteDeleteRequest {
    /**
     * 
     * @type {CarrentalDeleteInput}
     * @memberof VehicleLocationApiApiMasterVehicleLocationDeleteDelete
     */
    readonly carrentalDeleteInput?: CarrentalDeleteInput
}

/**
 * Request parameters for apiMasterVehicleLocationGetGet operation in VehicleLocationApi.
 * @export
 * @interface VehicleLocationApiApiMasterVehicleLocationGetGetRequest
 */
export interface VehicleLocationApiApiMasterVehicleLocationGetGetRequest {
    /**
     * 
     * @type {number}
     * @memberof VehicleLocationApiApiMasterVehicleLocationGetGet
     */
    readonly id?: number

    /**
     * 
     * @type {string}
     * @memberof VehicleLocationApiApiMasterVehicleLocationGetGet
     */
    readonly tenantCode?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleLocationApiApiMasterVehicleLocationGetGet
     */
    readonly branchCode?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleLocationApiApiMasterVehicleLocationGetGet
     */
    readonly keyword?: string

    /**
     * 
     * @type {number}
     * @memberof VehicleLocationApiApiMasterVehicleLocationGetGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof VehicleLocationApiApiMasterVehicleLocationGetGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof VehicleLocationApiApiMasterVehicleLocationGetGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleLocationApiApiMasterVehicleLocationGetGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiMasterVehicleLocationSavePost operation in VehicleLocationApi.
 * @export
 * @interface VehicleLocationApiApiMasterVehicleLocationSavePostRequest
 */
export interface VehicleLocationApiApiMasterVehicleLocationSavePostRequest {
    /**
     * 
     * @type {VehicleLocationInput}
     * @memberof VehicleLocationApiApiMasterVehicleLocationSavePost
     */
    readonly vehicleLocationInput?: VehicleLocationInput
}

/**
 * VehicleLocationApi - object-oriented interface
 * @export
 * @class VehicleLocationApi
 * @extends {BaseAPI}
 */
export class VehicleLocationApi extends BaseAPI {
    /**
     * 
     * @param {VehicleLocationApiApiMasterVehicleLocationDeleteDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VehicleLocationApi
     */
    public apiMasterVehicleLocationDeleteDelete(requestParameters: VehicleLocationApiApiMasterVehicleLocationDeleteDeleteRequest = {}, options?: AxiosRequestConfig) {
        return VehicleLocationApiFp(this.configuration).apiMasterVehicleLocationDeleteDelete(requestParameters.carrentalDeleteInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {VehicleLocationApiApiMasterVehicleLocationGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VehicleLocationApi
     */
    public apiMasterVehicleLocationGetGet(requestParameters: VehicleLocationApiApiMasterVehicleLocationGetGetRequest = {}, options?: AxiosRequestConfig) {
        return VehicleLocationApiFp(this.configuration).apiMasterVehicleLocationGetGet(requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {VehicleLocationApiApiMasterVehicleLocationSavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VehicleLocationApi
     */
    public apiMasterVehicleLocationSavePost(requestParameters: VehicleLocationApiApiMasterVehicleLocationSavePostRequest = {}, options?: AxiosRequestConfig) {
        return VehicleLocationApiFp(this.configuration).apiMasterVehicleLocationSavePost(requestParameters.vehicleLocationInput, options).then((request) => request(this.axios, this.basePath));
    }
}

