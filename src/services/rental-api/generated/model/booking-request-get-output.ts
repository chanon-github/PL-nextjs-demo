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


// May contain unused imports in some cases
// @ts-ignore
import { BookingDriver } from './booking-driver';
// May contain unused imports in some cases
// @ts-ignore
import { BookingOption } from './booking-option';
// May contain unused imports in some cases
// @ts-ignore
import { BookingVoucher } from './booking-voucher';
// May contain unused imports in some cases
// @ts-ignore
import { CustomerAddress } from './customer-address';

/**
 * 
 * @export
 * @interface BookingRequestGetOutput
 */
export interface BookingRequestGetOutput {
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'bookingRequestNo'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof BookingRequestGetOutput
     */
    'vehicleMasterId'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'bookingNo'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'documentUrl'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'paymentStatus'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'paymentMethod'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'startDate'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'endDate'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'receiveLocationCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'returnLocationCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'carReceiveMile'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'carReturnMile'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'customerType'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'acquireMethod'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'remark'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'licensePlate'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'carUseObjective'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof BookingRequestGetOutput
     */
    'rentalType'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof BookingRequestGetOutput
     */
    'totalAmount'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof BookingRequestGetOutput
     */
    'discount'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof BookingRequestGetOutput
     */
    'totalPrice'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof BookingRequestGetOutput
     */
    'paidAmount'?: number | null;
    /**
     * 
     * @type {number}
     * @memberof BookingRequestGetOutput
     */
    'insuranceAmount'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'paidDate'?: string | null;
    /**
     * 
     * @type {number}
     * @memberof BookingRequestGetOutput
     */
    'customerId'?: number | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'name'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'titleName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'firstName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'lastName'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'identityId'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'mobile'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'email'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'fax'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'attachIdentity'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'attachDrivingLicense'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'attachEmployeeCard'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'status'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'tenantCode'?: string | null;
    /**
     * 
     * @type {string}
     * @memberof BookingRequestGetOutput
     */
    'branchCode'?: string | null;
    /**
     * 
     * @type {Array<CustomerAddress>}
     * @memberof BookingRequestGetOutput
     */
    'customerAddresses'?: Array<CustomerAddress> | null;
    /**
     * 
     * @type {Array<BookingDriver>}
     * @memberof BookingRequestGetOutput
     */
    'bookingDrivers'?: Array<BookingDriver> | null;
    /**
     * 
     * @type {Array<BookingOption>}
     * @memberof BookingRequestGetOutput
     */
    'bookingOptions'?: Array<BookingOption> | null;
    /**
     * 
     * @type {Array<BookingVoucher>}
     * @memberof BookingRequestGetOutput
     */
    'bookingVouchers'?: Array<BookingVoucher> | null;
}

