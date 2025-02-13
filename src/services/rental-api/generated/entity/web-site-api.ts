/* tslint:disable */
/* eslint-disable */
/**
 * pl-car-rental-api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
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
import { ContactUsInput } from '../model';
// @ts-ignore
import { SubscribeInput } from '../model';
/**
 * WebSiteApi - axios parameter creator
 * @export
 */
export const WebSiteApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {ContactUsInput} [contactUsInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiWebSiteContactUsPost: async (contactUsInput?: ContactUsInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/WebSite/ContactUs`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(contactUsInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {SubscribeInput} [subscribeInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiWebSiteSubscribePost: async (subscribeInput?: SubscribeInput, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/api/WebSite/Subscribe`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;


    
            localVarHeaderParameter['Content-Type'] = 'application/json-patch+json';

            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            localVarRequestOptions.data = serializeDataIfNeeded(subscribeInput, localVarRequestOptions, configuration)

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * WebSiteApi - functional programming interface
 * @export
 */
export const WebSiteApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = WebSiteApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @param {ContactUsInput} [contactUsInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiWebSiteContactUsPost(contactUsInput?: ContactUsInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BaseResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiWebSiteContactUsPost(contactUsInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
        /**
         * 
         * @param {SubscribeInput} [subscribeInput] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async apiWebSiteSubscribePost(subscribeInput?: SubscribeInput, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<BaseResponse>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.apiWebSiteSubscribePost(subscribeInput, options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * WebSiteApi - factory interface
 * @export
 */
export const WebSiteApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = WebSiteApiFp(configuration)
    return {
        /**
         * 
         * @param {WebSiteApiApiWebSiteContactUsPostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiWebSiteContactUsPost(requestParameters: WebSiteApiApiWebSiteContactUsPostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BaseResponse> {
            return localVarFp.apiWebSiteContactUsPost(requestParameters.contactUsInput, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {WebSiteApiApiWebSiteSubscribePostRequest} requestParameters Request parameters.
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        apiWebSiteSubscribePost(requestParameters: WebSiteApiApiWebSiteSubscribePostRequest = {}, options?: AxiosRequestConfig): AxiosPromise<BaseResponse> {
            return localVarFp.apiWebSiteSubscribePost(requestParameters.subscribeInput, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * Request parameters for apiWebSiteContactUsPost operation in WebSiteApi.
 * @export
 * @interface WebSiteApiApiWebSiteContactUsPostRequest
 */
export interface WebSiteApiApiWebSiteContactUsPostRequest {
    /**
     * 
     * @type {ContactUsInput}
     * @memberof WebSiteApiApiWebSiteContactUsPost
     */
    readonly contactUsInput?: ContactUsInput
}

/**
 * Request parameters for apiWebSiteSubscribePost operation in WebSiteApi.
 * @export
 * @interface WebSiteApiApiWebSiteSubscribePostRequest
 */
export interface WebSiteApiApiWebSiteSubscribePostRequest {
    /**
     * 
     * @type {SubscribeInput}
     * @memberof WebSiteApiApiWebSiteSubscribePost
     */
    readonly subscribeInput?: SubscribeInput
}

/**
 * WebSiteApi - object-oriented interface
 * @export
 * @class WebSiteApi
 * @extends {BaseAPI}
 */
export class WebSiteApi extends BaseAPI {
    /**
     * 
     * @param {WebSiteApiApiWebSiteContactUsPostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebSiteApi
     */
    public apiWebSiteContactUsPost(requestParameters: WebSiteApiApiWebSiteContactUsPostRequest = {}, options?: AxiosRequestConfig) {
        return WebSiteApiFp(this.configuration).apiWebSiteContactUsPost(requestParameters.contactUsInput, options).then((request) => request(this.axios, this.basePath));
    }

    /**
     * 
     * @param {WebSiteApiApiWebSiteSubscribePostRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof WebSiteApi
     */
    public apiWebSiteSubscribePost(requestParameters: WebSiteApiApiWebSiteSubscribePostRequest = {}, options?: AxiosRequestConfig) {
        return WebSiteApiFp(this.configuration).apiWebSiteSubscribePost(requestParameters.subscribeInput, options).then((request) => request(this.axios, this.basePath));
    }
}

