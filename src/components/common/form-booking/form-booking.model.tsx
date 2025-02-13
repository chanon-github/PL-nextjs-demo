/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  FormBooking - Model
 */

import { Dayjs } from "dayjs";
import {  BookingApiApiBookingGetRequestFromGetRequest, BookingApiApiBookingSearchGetRequest, BookingRequestFormInput, BookingRequestGetOutputDataResponse, BookingRequestInput, 
  BookingRequestSearchOutput, CarRentalApiApiCarRentalGetAllOptionsGetRequest, CrtBookingRequestBookingRequestSearchOutputPagination, 
  CrtPackageCrtPackagePagination, 
  CrtVehicleItemCrtVehicleItemPagination, 
  CtlMstAcctMgrListDataResponse, 
  CtlMstCustomerGroupListDataResponse, 
  CtlMstCustomerSourceListDataResponse, 
  CtlMstCustomerTypeListDataResponse, 
  CtlMstPackageSdListDataResponse, 
  CtlMstPaymentStatusListDataResponse, 
  CtlMstRentalPaymentListDataResponse, 
  DDRentalTypeOutputListDataResponse, 
  DDUsageAddressOutputListDataResponse, DropdownApiApiDropdownGetLicensePlateGetRequest, OptionOutputDataResponse, PackageApiApiPackageSearchGetRequest, PackageItemSearchOutput} from "@/services/rental-api/generated";
export namespace FormBookingProps {
  export interface Main {
    //
    bookingRequestNo?: string;
    recordStatus?: string;
    onCancleForm: () => void;
    refetch?:{
      pageIndex: number;
      pageSize: number;
      onRefetchApiTable: (value: any) => void;
    }
    // onRefetchApiTable?: (value: any) => void;
  }
}


export interface ThailandAddress{
  d: string;
  dCode: string;
  p: string;
  pCode: string;
  s: string;
  sCode: string;
  po: string;
}
 export interface Selected{
    [key: number]: {
      options: ModelTest[];
      value?: number;
    }
  }
  export interface ModelTest{
    id: number;
    name: string;
  }

export interface BookingFormRequest extends BookingRequestFormInput  {
  firstName: string;
  lastName: string;
  titleName: string;
  taxNo:string;
  // nameDo: string
  mobileTest: string;
  nameTax: string;
  nameDocument: string;
  mobileNo: string;
  firstNameTax: string;
  lastNameTax: string;
  mobileNoTax: string;
  dateRange: [Dayjs | undefined, Dayjs | undefined];
  addressNo: string;
  moo: string;
  building: string;
  soi: string;
  street: string;
  provinceCode: string;
  districtCode: string;
  subDistrictCode: string;
  postCode: string;
  addressNoTax: string;
  mooTax: string;
  buildingTax: string;
  soiTax: string;
  streetTax: string;
  postCodeTax: string;
  provinceCodeTax: string;
  districtCodeTax: string;
  subDistrictCodeTax: string;
  bookingOptionsAntd: Array<BookingOptionsAntd>;
  isNotUpdateAddressTax: boolean;
  isNotUpdateAddress: boolean;
  addNewCustomer: boolean;
  ราคาต่อวัน: number;
}

export interface BookingOptionsAntd{
  id?: number;
  optionCode?: string;
  isVoucher?: boolean;
  price?: number;
  amount?: number;
}

export interface Address {
  addressNo?: string;
  building?: string;
  moo?: string;
  postCode?: string;
  provinceCode?: string;
  districtCode?: string;
  subDistrictCode?: string;
  soi?: string;
  street?: string;
}