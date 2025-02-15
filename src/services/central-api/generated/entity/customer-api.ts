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
import { BaseResponse } from '../model';
// @ts-ignore
import { CusCustomerCusCustomerOutputPagination } from '../model';
// @ts-ignore
import { RegisterInput } from '../model';
// @ts-ignore
import { RegisterOutputDataResponse } from '../model';
// @ts-ignore
import { UpdateProfileInput } from '../model';
// @ts-ignore
import { UpdateProfileOutputDataResponse } from '../model';
/**
 * CustomerApi - axios parameter creator
 * @export
 */
export const CustomerApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerDeleteProfileDelete: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Customer/DeleteProfile`;
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
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerGetProfileGet: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Customer/GetProfile`;
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
         * @param {RegisterInput} [registerInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerRegisterPost: async (registerInput?: RegisterInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Customer/Register`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(registerInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [id] 
         * @param {string} [name] 
         * @param {string} [keyword] 
         * @param {string} [customerType] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerSearchGet: async (id?: number, name?: string, keyword?: string, customerType?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Customer/Search`;
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

            if (name !== undefined) {
                localVarQueryParameter['Name'] = name;
            }

            if (keyword !== undefined) {
                localVarQueryParameter['Keyword'] = keyword;
            }

            if (customerType !== undefined) {
                localVarQueryParameter['CustomerType'] = customerType;
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
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerUpdateApproveVerifyIdPost: async (id: number, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'id' is not null or undefined
            assertParamExists('apiCustomerUpdateApproveVerifyIdPost', 'id', id)
            const localVarPath = `/api/Customer/UpdateApproveVerify/{id}`
                .replace(`{${"id"}}`, encodeURIComponent(String(id)));
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
         * @param {UpdateProfileInput} [updateProfileInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerUpdateProfilePost: async (updateProfileInput?: UpdateProfileInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Customer/UpdateProfile`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(updateProfileInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * CustomerApi - functional programming interface
 * @export
 */
export const CustomerApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = CustomerApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCustomerDeleteProfileDelete(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BaseResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiCustomerDeleteProfileDelete(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCustomerGetProfileGet(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UpdateProfileOutputDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiCustomerGetProfileGet(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {RegisterInput} [registerInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCustomerRegisterPost(registerInput?: RegisterInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<RegisterOutputDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiCustomerRegisterPost(registerInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} [id] 
         * @param {string} [name] 
         * @param {string} [keyword] 
         * @param {string} [customerType] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCustomerSearchGet(id?: number, name?: string, keyword?: string, customerType?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<CusCustomerCusCustomerOutputPagination>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiCustomerSearchGet(id, name, keyword, customerType, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} id 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCustomerUpdateApproveVerifyIdPost(id: number, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BaseResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiCustomerUpdateApproveVerifyIdPost(id, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {UpdateProfileInput} [updateProfileInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiCustomerUpdateProfilePost(updateProfileInput?: UpdateProfileInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<UpdateProfileOutputDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiCustomerUpdateProfilePost(updateProfileInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * CustomerApi - factory interface
 * @export
 */
export const CustomerApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = CustomerApiFp(configuration)
    return {
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerDeleteProfileDelete(options?: AxiosRequestConfig): AxiosPromise<BaseResponse> {
            return localVarFp.apiCustomerDeleteProfileDelete(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerGetProfileGet(options?: AxiosRequestConfig): AxiosPromise<UpdateProfileOutputDataResponse> {
            return localVarFp.apiCustomerGetProfileGet(options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CustomerApiApiCustomerRegisterPostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerRegisterPost(requestParameters: CustomerApiApiCustomerRegisterPostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<RegisterOutputDataResponse> {
            return localVarFp.apiCustomerRegisterPost(requestParameters.registerInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CustomerApiApiCustomerSearchGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerSearchGet(requestParameters: CustomerApiApiCustomerSearchGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<CusCustomerCusCustomerOutputPagination> {
            return localVarFp.apiCustomerSearchGet(requestParameters.id, requestParameters.name, requestParameters.keyword, requestParameters.customerType, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CustomerApiApiCustomerUpdateApproveVerifyIdPostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerUpdateApproveVerifyIdPost(requestParameters: CustomerApiApiCustomerUpdateApproveVerifyIdPostRequest, options?: AxiosRequestConfig): AxiosPromise<BaseResponse> {
            return localVarFp.apiCustomerUpdateApproveVerifyIdPost(requestParameters.id, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {CustomerApiApiCustomerUpdateProfilePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiCustomerUpdateProfilePost(requestParameters: CustomerApiApiCustomerUpdateProfilePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<UpdateProfileOutputDataResponse> {
            return localVarFp.apiCustomerUpdateProfilePost(requestParameters.updateProfileInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiCustomerRegisterPost operation in CustomerApi.
 * @export
 * @interface CustomerApiApiCustomerRegisterPostRequest
 */
export interface CustomerApiApiCustomerRegisterPostRequest {
    /**
     * 
     * @type {RegisterInput}
     * @memberof CustomerApiApiCustomerRegisterPost
     */
    readonly registerInput?: RegisterInput
}

/**
 * Request parameters for apiCustomerSearchGet operation in CustomerApi.
 * @export
 * @interface CustomerApiApiCustomerSearchGetRequest
 */
export interface CustomerApiApiCustomerSearchGetRequest {
    /**
     * 
     * @type {number}
     * @memberof CustomerApiApiCustomerSearchGet
     */
    readonly id?: number

    /**
     * 
     * @type {string}
     * @memberof CustomerApiApiCustomerSearchGet
     */
    readonly name?: string

    /**
     * 
     * @type {string}
     * @memberof CustomerApiApiCustomerSearchGet
     */
    readonly keyword?: string

    /**
     * 
     * @type {string}
     * @memberof CustomerApiApiCustomerSearchGet
     */
    readonly customerType?: string

    /**
     * 
     * @type {number}
     * @memberof CustomerApiApiCustomerSearchGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof CustomerApiApiCustomerSearchGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof CustomerApiApiCustomerSearchGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof CustomerApiApiCustomerSearchGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiCustomerUpdateApproveVerifyIdPost operation in CustomerApi.
 * @export
 * @interface CustomerApiApiCustomerUpdateApproveVerifyIdPostRequest
 */
export interface CustomerApiApiCustomerUpdateApproveVerifyIdPostRequest {
    /**
     * 
     * @type {number}
     * @memberof CustomerApiApiCustomerUpdateApproveVerifyIdPost
     */
    readonly id: number
}

/**
 * Request parameters for apiCustomerUpdateProfilePost operation in CustomerApi.
 * @export
 * @interface CustomerApiApiCustomerUpdateProfilePostRequest
 */
export interface CustomerApiApiCustomerUpdateProfilePostRequest {
    /**
     * 
     * @type {UpdateProfileInput}
     * @memberof CustomerApiApiCustomerUpdateProfilePost
     */
    readonly updateProfileInput?: UpdateProfileInput
}

/**
 * CustomerApi - object-oriented interface
 * @export
 * @class CustomerApi
 * @extends {BaseAPI}
 */
export class CustomerApi extends BaseAPI {
    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerApi
     */
    public apiCustomerDeleteProfileDelete(options?: AxiosRequestConfig) {
        return CustomerApiFp(this.configuration).apiCustomerDeleteProfileDelete(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerApi
     */
    public apiCustomerGetProfileGet(options?: AxiosRequestConfig) {
        return CustomerApiFp(this.configuration).apiCustomerGetProfileGet(options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {CustomerApiApiCustomerRegisterPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerApi
     */
    public apiCustomerRegisterPost(requestParameters: CustomerApiApiCustomerRegisterPostRequest = {}, options?: AxiosRequestConfig) {
        return CustomerApiFp(this.configuration).apiCustomerRegisterPost(requestParameters.registerInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {CustomerApiApiCustomerSearchGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerApi
     */
    public apiCustomerSearchGet(requestParameters: CustomerApiApiCustomerSearchGetRequest = {}, options?: AxiosRequestConfig) {
        return CustomerApiFp(this.configuration).apiCustomerSearchGet(requestParameters.id, requestParameters.name, requestParameters.keyword, requestParameters.customerType, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {CustomerApiApiCustomerUpdateApproveVerifyIdPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerApi
     */
    public apiCustomerUpdateApproveVerifyIdPost(requestParameters: CustomerApiApiCustomerUpdateApproveVerifyIdPostRequest, options?: AxiosRequestConfig) {
        return CustomerApiFp(this.configuration).apiCustomerUpdateApproveVerifyIdPost(requestParameters.id, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {CustomerApiApiCustomerUpdateProfilePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof CustomerApi
     */
    public apiCustomerUpdateProfilePost(requestParameters: CustomerApiApiCustomerUpdateProfilePostRequest = {}, options?: AxiosRequestConfig) {
        return CustomerApiFp(this.configuration).apiCustomerUpdateProfilePost(requestParameters.updateProfileInput, options).then((request) => request(this.axios, this.basePath));
    }
}

