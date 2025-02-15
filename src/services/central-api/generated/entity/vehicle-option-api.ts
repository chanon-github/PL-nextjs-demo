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
import { CrtVehicleOptionCrtVehicleOptionPagination } from '../model';
// @ts-ignore
import { MasterVehicleOptionInput } from '../model';
/**
 * VehicleOptionApi - axios parameter creator
 * @export
 */
export const VehicleOptionApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CarrentalDeleteInput} [carrentalDeleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleOptionDeleteDelete: async (carrentalDeleteInput?: CarrentalDeleteInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/VehicleOption/Delete`;
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
         * @param {string} [type] 
         * @param {string} [option] 
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
        apiMasterVehicleOptionGetGet: async (type?: string, option?: string, status?: string, id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/VehicleOption/Get`;
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

            if (type !== undefined) {
                localVarQueryParameter['Type'] = type;
            }

            if (option !== undefined) {
                localVarQueryParameter['Option'] = option;
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
         * @param {MasterVehicleOptionInput} [masterVehicleOptionInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleOptionSavePost: async (masterVehicleOptionInput?: MasterVehicleOptionInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Master/VehicleOption/Save`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(masterVehicleOptionInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * VehicleOptionApi - functional programming interface
 * @export
 */
export const VehicleOptionApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = VehicleOptionApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {CarrentalDeleteInput} [carrentalDeleteInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterVehicleOptionDeleteDelete(carrentalDeleteInput?: CarrentalDeleteInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterVehicleOptionDeleteDelete(carrentalDeleteInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [type] 
         * @param {string} [option] 
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
        async apiMasterVehicleOptionGetGet(type?: string, option?: string, status?: string, id?: number, tenantCode?: string, branchCode?: string, keyword?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CrtVehicleOptionCrtVehicleOptionPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterVehicleOptionGetGet(type, option, status, id, tenantCode, branchCode, keyword, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {MasterVehicleOptionInput} [masterVehicleOptionInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiMasterVehicleOptionSavePost(masterVehicleOptionInput?: MasterVehicleOptionInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BooleanDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiMasterVehicleOptionSavePost(masterVehicleOptionInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * VehicleOptionApi - factory interface
 * @export
 */
export const VehicleOptionApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = VehicleOptionApiFp(configuration)
    return {
        /**
         * 
         * @param {VehicleOptionApiApiMasterVehicleOptionDeleteDeleteRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleOptionDeleteDelete(requestParameters: VehicleOptionApiApiMasterVehicleOptionDeleteDeleteRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterVehicleOptionDeleteDelete(requestParameters.carrentalDeleteInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {VehicleOptionApiApiMasterVehicleOptionGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleOptionGetGet(requestParameters: VehicleOptionApiApiMasterVehicleOptionGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CrtVehicleOptionCrtVehicleOptionPagination> {
            return localVarFp.apiMasterVehicleOptionGetGet(requestParameters.type, requestParameters.option, requestParameters.status, requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {VehicleOptionApiApiMasterVehicleOptionSavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiMasterVehicleOptionSavePost(requestParameters: VehicleOptionApiApiMasterVehicleOptionSavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BooleanDataResponse> {
            return localVarFp.apiMasterVehicleOptionSavePost(requestParameters.masterVehicleOptionInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiMasterVehicleOptionDeleteDelete operation in VehicleOptionApi.
 * @export
 * @interface VehicleOptionApiApiMasterVehicleOptionDeleteDeleteRequest
 */
export interface VehicleOptionApiApiMasterVehicleOptionDeleteDeleteRequest {
    /**
     * 
     * @type {CarrentalDeleteInput}
     * @memberof VehicleOptionApiApiMasterVehicleOptionDeleteDelete
     */
    readonly carrentalDeleteInput?: CarrentalDeleteInput
}

/**
 * Request parameters for apiMasterVehicleOptionGetGet operation in VehicleOptionApi.
 * @export
 * @interface VehicleOptionApiApiMasterVehicleOptionGetGetRequest
 */
export interface VehicleOptionApiApiMasterVehicleOptionGetGetRequest {
    /**
     * 
     * @type {string}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly type?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly option?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly status?: string

    /**
     * 
     * @type {number}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly id?: number

    /**
     * 
     * @type {string}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly tenantCode?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly branchCode?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly keyword?: string

    /**
     * 
     * @type {number}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof VehicleOptionApiApiMasterVehicleOptionGetGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiMasterVehicleOptionSavePost operation in VehicleOptionApi.
 * @export
 * @interface VehicleOptionApiApiMasterVehicleOptionSavePostRequest
 */
export interface VehicleOptionApiApiMasterVehicleOptionSavePostRequest {
    /**
     * 
     * @type {MasterVehicleOptionInput}
     * @memberof VehicleOptionApiApiMasterVehicleOptionSavePost
     */
    readonly masterVehicleOptionInput?: MasterVehicleOptionInput
}

/**
 * VehicleOptionApi - object-oriented interface
 * @export
 * @class VehicleOptionApi
 * @extends {BaseAPI}
 */
export class VehicleOptionApi extends BaseAPI {
    /**
     * 
     * @param {VehicleOptionApiApiMasterVehicleOptionDeleteDeleteRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VehicleOptionApi
     */
    public apiMasterVehicleOptionDeleteDelete(requestParameters: VehicleOptionApiApiMasterVehicleOptionDeleteDeleteRequest = {}, options?: AxiosRequestConfig) {
        return VehicleOptionApiFp(this.configuration).apiMasterVehicleOptionDeleteDelete(requestParameters.carrentalDeleteInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {VehicleOptionApiApiMasterVehicleOptionGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VehicleOptionApi
     */
    public apiMasterVehicleOptionGetGet(requestParameters: VehicleOptionApiApiMasterVehicleOptionGetGetRequest = {}, options?: AxiosRequestConfig) {
        return VehicleOptionApiFp(this.configuration).apiMasterVehicleOptionGetGet(requestParameters.type, requestParameters.option, requestParameters.status, requestParameters.id, requestParameters.tenantCode, requestParameters.branchCode, requestParameters.keyword, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {VehicleOptionApiApiMasterVehicleOptionSavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof VehicleOptionApi
     */
    public apiMasterVehicleOptionSavePost(requestParameters: VehicleOptionApiApiMasterVehicleOptionSavePostRequest = {}, options?: AxiosRequestConfig) {
        return VehicleOptionApiFp(this.configuration).apiMasterVehicleOptionSavePost(requestParameters.masterVehicleOptionInput, options).then((request) => request(this.axios, this.basePath));
    }
}

