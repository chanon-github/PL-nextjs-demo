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
import { AcceptConsentInput } from '../model';
// @ts-ignore
import { BaseResponse } from '../model';
// @ts-ignore
import { GetAllConsentOutputDataResponse } from '../model';
// @ts-ignore
import { GetConsentOutputDataResponse } from '../model';
// @ts-ignore
import { GetConsentSubjectOutputDataResponse } from '../model';
// @ts-ignore
import { SaveConsentInput } from '../model';
/**
 * ConsentApi - axios parameter creator
 * @export
 */
export const ConsentApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {Array<AcceptConsentInput>} [acceptConsentInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentAcceptPost: async (acceptConsentInput?: Array<AcceptConsentInput>, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Consent/Accept`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(acceptConsentInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [subject] 
         * @param {string} [langauge] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentGetAllGet: async (subject?: string, langauge?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Consent/GetAll`;
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

            if (subject !== undefined) {
                localVarQueryParameter['Subject'] = subject;
            }

            if (langauge !== undefined) {
                localVarQueryParameter['Langauge'] = langauge;
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
         * @param {string} [code] 
         * @param {string} [lang] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentGetGet: async (code?: string, lang?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Consent/Get`;
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
                localVarQueryParameter['code'] = code;
            }

            if (lang !== undefined) {
                localVarQueryParameter['lang'] = lang;
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
         * @param {SaveConsentInput} [saveConsentInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentSavePost: async (saveConsentInput?: SaveConsentInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Consent/Save`;
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
            localVarRequestOptions.data = serializeDataIfNeeded(saveConsentInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentSubjectGetAllGet: async (pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/Consent/SubjectGetAll`;
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
    }
};

/**
 * ConsentApi - functional programming interface
 * @export
 */
export const ConsentApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = ConsentApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {Array<AcceptConsentInput>} [acceptConsentInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConsentAcceptPost(acceptConsentInput?: Array<AcceptConsentInput>, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BaseResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiConsentAcceptPost(acceptConsentInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [subject] 
         * @param {string} [langauge] 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConsentGetAllGet(subject?: string, langauge?: string, pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetAllConsentOutputDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiConsentGetAllGet(subject, langauge, pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {string} [code] 
         * @param {string} [lang] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConsentGetGet(code?: string, lang?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetConsentOutputDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiConsentGetGet(code, lang, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {SaveConsentInput} [saveConsentInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConsentSavePost(saveConsentInput?: SaveConsentInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BaseResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiConsentSavePost(saveConsentInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {number} [pageIndex] 
         * @param {number} [pageSize] 
         * @param {string} [sortField] 
         * @param {string} [sortDirection] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiConsentSubjectGetAllGet(pageIndex?: number, pageSize?: number, sortField?: string, sortDirection?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<GetConsentSubjectOutputDataResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiConsentSubjectGetAllGet(pageIndex, pageSize, sortField, sortDirection, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * ConsentApi - factory interface
 * @export
 */
export const ConsentApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = ConsentApiFp(configuration)
    return {
        /**
         * 
         * @param {ConsentApiApiConsentAcceptPostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentAcceptPost(requestParameters: ConsentApiApiConsentAcceptPostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BaseResponse> {
            return localVarFp.apiConsentAcceptPost(requestParameters.acceptConsentInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ConsentApiApiConsentGetAllGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentGetAllGet(requestParameters: ConsentApiApiConsentGetAllGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<GetAllConsentOutputDataResponse> {
            return localVarFp.apiConsentGetAllGet(requestParameters.subject, requestParameters.langauge, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ConsentApiApiConsentGetGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentGetGet(requestParameters: ConsentApiApiConsentGetGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<GetConsentOutputDataResponse> {
            return localVarFp.apiConsentGetGet(requestParameters.code, requestParameters.lang, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ConsentApiApiConsentSavePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentSavePost(requestParameters: ConsentApiApiConsentSavePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BaseResponse> {
            return localVarFp.apiConsentSavePost(requestParameters.saveConsentInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {ConsentApiApiConsentSubjectGetAllGetRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiConsentSubjectGetAllGet(requestParameters: ConsentApiApiConsentSubjectGetAllGetRequest = {}, options?: AxiosRequestConfig): AxiosPromise<GetConsentSubjectOutputDataResponse> {
            return localVarFp.apiConsentSubjectGetAllGet(requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiConsentAcceptPost operation in ConsentApi.
 * @export
 * @interface ConsentApiApiConsentAcceptPostRequest
 */
export interface ConsentApiApiConsentAcceptPostRequest {
    /**
     * 
     * @type {Array<AcceptConsentInput>}
     * @memberof ConsentApiApiConsentAcceptPost
     */
    readonly acceptConsentInput?: Array<AcceptConsentInput>
}

/**
 * Request parameters for apiConsentGetAllGet operation in ConsentApi.
 * @export
 * @interface ConsentApiApiConsentGetAllGetRequest
 */
export interface ConsentApiApiConsentGetAllGetRequest {
    /**
     * 
     * @type {string}
     * @memberof ConsentApiApiConsentGetAllGet
     */
    readonly subject?: string

    /**
     * 
     * @type {string}
     * @memberof ConsentApiApiConsentGetAllGet
     */
    readonly langauge?: string

    /**
     * 
     * @type {number}
     * @memberof ConsentApiApiConsentGetAllGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof ConsentApiApiConsentGetAllGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof ConsentApiApiConsentGetAllGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof ConsentApiApiConsentGetAllGet
     */
    readonly sortDirection?: string
}

/**
 * Request parameters for apiConsentGetGet operation in ConsentApi.
 * @export
 * @interface ConsentApiApiConsentGetGetRequest
 */
export interface ConsentApiApiConsentGetGetRequest {
    /**
     * 
     * @type {string}
     * @memberof ConsentApiApiConsentGetGet
     */
    readonly code?: string

    /**
     * 
     * @type {string}
     * @memberof ConsentApiApiConsentGetGet
     */
    readonly lang?: string
}

/**
 * Request parameters for apiConsentSavePost operation in ConsentApi.
 * @export
 * @interface ConsentApiApiConsentSavePostRequest
 */
export interface ConsentApiApiConsentSavePostRequest {
    /**
     * 
     * @type {SaveConsentInput}
     * @memberof ConsentApiApiConsentSavePost
     */
    readonly saveConsentInput?: SaveConsentInput
}

/**
 * Request parameters for apiConsentSubjectGetAllGet operation in ConsentApi.
 * @export
 * @interface ConsentApiApiConsentSubjectGetAllGetRequest
 */
export interface ConsentApiApiConsentSubjectGetAllGetRequest {
    /**
     * 
     * @type {number}
     * @memberof ConsentApiApiConsentSubjectGetAllGet
     */
    readonly pageIndex?: number

    /**
     * 
     * @type {number}
     * @memberof ConsentApiApiConsentSubjectGetAllGet
     */
    readonly pageSize?: number

    /**
     * 
     * @type {string}
     * @memberof ConsentApiApiConsentSubjectGetAllGet
     */
    readonly sortField?: string

    /**
     * 
     * @type {string}
     * @memberof ConsentApiApiConsentSubjectGetAllGet
     */
    readonly sortDirection?: string
}

/**
 * ConsentApi - object-oriented interface
 * @export
 * @class ConsentApi
 * @extends {BaseAPI}
 */
export class ConsentApi extends BaseAPI {
    /**
     * 
     * @param {ConsentApiApiConsentAcceptPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConsentApi
     */
    public apiConsentAcceptPost(requestParameters: ConsentApiApiConsentAcceptPostRequest = {}, options?: AxiosRequestConfig) {
        return ConsentApiFp(this.configuration).apiConsentAcceptPost(requestParameters.acceptConsentInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ConsentApiApiConsentGetAllGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConsentApi
     */
    public apiConsentGetAllGet(requestParameters: ConsentApiApiConsentGetAllGetRequest = {}, options?: AxiosRequestConfig) {
        return ConsentApiFp(this.configuration).apiConsentGetAllGet(requestParameters.subject, requestParameters.langauge, requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ConsentApiApiConsentGetGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConsentApi
     */
    public apiConsentGetGet(requestParameters: ConsentApiApiConsentGetGetRequest = {}, options?: AxiosRequestConfig) {
        return ConsentApiFp(this.configuration).apiConsentGetGet(requestParameters.code, requestParameters.lang, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ConsentApiApiConsentSavePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConsentApi
     */
    public apiConsentSavePost(requestParameters: ConsentApiApiConsentSavePostRequest = {}, options?: AxiosRequestConfig) {
        return ConsentApiFp(this.configuration).apiConsentSavePost(requestParameters.saveConsentInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {ConsentApiApiConsentSubjectGetAllGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof ConsentApi
     */
    public apiConsentSubjectGetAllGet(requestParameters: ConsentApiApiConsentSubjectGetAllGetRequest = {}, options?: AxiosRequestConfig) {
        return ConsentApiFp(this.configuration).apiConsentSubjectGetAllGet(requestParameters.pageIndex, requestParameters.pageSize, requestParameters.sortField, requestParameters.sortDirection, options).then((request) => request(this.axios, this.basePath));
    }
}

