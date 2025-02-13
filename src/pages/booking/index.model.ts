/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { BranchApiApiMasterBranchGetGetRequest, BranchSearchOutputBranchSearchOutputPagination, ContentApiApiContentGetGetRequest, ContentCategoryApiApiContentCategoryGetGetRequest, CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlContent, CtlContentCategoryCtlContentCategoryPagination, CtlContentCtlContentPagination, CtlLocationCtlLocationPaginationDataResponse, CtlMstPaymentCtlMstPaymentPagination, CtlMstTitleCtlMstTitlePagination, CusCustomerCusCustomerOutputPagination, CusCustomerOutput, CustomerApiApiCustomerSearchGetRequest, GetAllPriceTierOutputDataResponse, LocationApiApiMasterLocationGetAllGetRequest, PaymentApiApiMasterPaymentGetGetRequest, TitleApiApiMasterTitleGetGetRequest, VehicleMasterApiApiMasterVehicleMasterGetAllPriceTierGetRequest, VehicleMasterApiApiMasterVehicleMasterGetGetRequest } from "@/services/central-api/generated";
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
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, RadioChangeEvent, TablePaginationConfig, UploadFile } from "antd";
  import { CheckboxChangeEvent } from "antd/es/checkbox";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { AxiosRequestConfig } from "axios";
import exp from "constants";
import dayjs, { Dayjs } from "dayjs";
import { ChangeEventHandler, Dispatch, MutableRefObject, SetStateAction } from "react";

  export interface BookingListContainerProps {}

  export interface BookingContentProps extends BookingState {
    onClickToAdd: () => void;
    onClickToAddBookingForm: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {bookingRequestNo: string; status: string}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onChangeRowSelectionDriver: (selectedRowKeys: Array<number | string>)=> void;
    onChangeRowSelectionOptions: (selectedRowKeys: Array<number | string>)=> void;
    onChangeRowSelectionVoucher: (selectedRowKeys: Array<number | string>)=> void;

    onSubmitFormBooking: (values: BookingRequest) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onClickToPackageItem: (param: {code: string}) => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<BookingRequestSearchOutput> | SorterResult<BookingRequestSearchOutput>[],
      extra: TableCurrentDataSource<BookingRequestSearchOutput>
    ) => void;
    onChangeUpload: (params: { file: UploadFile, fileList: UploadFile[] }) => void;
    onClickToPreviousePage: () => void;
    handleImageUpload: () => void;
    onSubmitFormShortTerm: () => void;
    onClickCheckBoxFax: (e: CheckboxChangeEvent) => void;
    onChangeAddressThailand: (value: string) => void;
    onSearchPostCode: (value: string) => void;
    onSearchProvince: (value: string) => void;
    onSearchDistrict: (value: string) => void;
    onSearchSubDistrict: (value: string) => void;

    setRowSelectedTableDriver: Dispatch<SetStateAction<(string | number)[]>>;
    setRowSelectedTableOptions: Dispatch<SetStateAction<(string | number)[]>>;
    setRowSelectedTableVoucher: Dispatch<SetStateAction<(string | number)[]>>;
    
    onClickAddRow: (params: {id: number}) => void;
    onChangeDropdown: (value: number, index: number) => void;
    onRemove: (index: number) => void;
    onClickBookingDraft: () => void;
    onClickBookingFormDraft: () => void;
    onChangeStartDate: ( ) => void;
    onSearchProvinceTax: (value: string) => void;
    onSearchDistrictTax: (value: string) => void;
    onSearchSubDistrictTax: (value: string) => void;
    onSearchPostCodeTax: (value: string) => void;
    onChangeAddressThailandTax: (value: string) => void;
    validateThaiIDCard: (_: any, value: string) => Promise<void>;
    saveBooking: (params: {status: "draft" | "pending"}) => void;
    onClickShowModalBookingForm: (params: {bookingRequestNo: string; status: string;}) => void;
    onChangeOptions: (params: {index: number; price: number}) => void

    onChangeRadioPriceTier: (e: RadioChangeEvent) => void;
    onChangeVehicleMaster: (id: number) => void;
    onSearchCustomer: (value: string) => void;
    onSearchCustomerRental: (value: string) => void;
    onChangeCustomerId: (id: number) => void;
    onGetImageUrlUploadedIdCard: (value?: string) => void;
    onGetImageUrlUploadedIdDriver: (value?: string) => void;
    onGetImageUrlEmployeeCard: (value?: string) => void;
    onChangeAddNewCustomer: (e: RadioChangeEvent) => void;
    onChangeCustomerType: (value: string) => void;
    onSearchLicensePlate: (value: string) => void;
    onClickToPrintPdf: () => void;
    onValuesChange: (changedValues: any, allValues: any) => void;
    onChangeAmountOptions: (value: number | null) => void;
    summmary: () => number;
    onChangeDateRange: (dateRange: [string, string]) => void;
    onChangeReceiveLocation: (value: string) => void;
    onChangeReturnLocation: (value: string) => void;
    onChangeVoucherNo: (event: React.ChangeEvent<HTMLInputElement>) => void;
    calCulatePrice: () => void;
    onChangeVehicleMasterBookingForm: (id: number) => void;
    packageItemApiRefetch:  (params : BookingApiApiBookingSearchGetRequest ) => void;
    // onChangeUpload: (params: { file: UploadFile;})=> void;
    // onChange?: (content: string) => void;
  }

  export interface BookingState {
    pageIndex: number;
    pageSize: number;
    useApiBookingGet: ApiResponse<CrtBookingRequestBookingRequestSearchOutputPagination, BookingApiApiBookingSearchGetRequest | undefined>;
    // useApiPackageTypeGet:  ApiResponse<PackageTypeOutputListDataResponse, AxiosRequestConfig<any> | undefined>;
    rowSelectedTable: Array<number | string>;
    rowSelectedTableDriver: Array<number | string>;
    rowSelectedTableOptions: Array<number | string>;
    rowSelectedTableVoucher: Array<number | string>;
    
    formBookingForm: FormInstance<BookingFormRequest>;
    formBooking: FormInstance<BookingRequest>;
    isVisibleFormBooking: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
    imageUrl?: string | undefined | null;
    quillRef: MutableRefObject<any>;
    isVisibleModalShortTerm: boolean;
    responseLocation: ApiResponse<CtlLocationCtlLocationPaginationDataResponse, LocationApiApiMasterLocationGetAllGetRequest | undefined>;
    useApiVehicleMaster: ApiResponse<CrtVehicleMasterVehicleMasterSearchOutputPagination, VehicleMasterApiApiMasterVehicleMasterGetGetRequest | undefined>;
    addressThailand: ThailandAddress[] | [];
    addressThailandTax: ThailandAddress[] | [];
    dataTest: ModelTest[];
    selectedItems: Selected;
    useApiMasterPriceTierGet: ApiResponse<GetAllPriceTierOutputDataResponse, VehicleMasterApiApiMasterVehicleMasterGetAllPriceTierGetRequest | undefined>;
    useApiAcctMgr: ApiResponse<CtlMstAcctMgrListDataResponse, AxiosRequestConfig<any> | undefined>;
    useApiUsageAddress: ApiResponse<DDUsageAddressOutputListDataResponse, AxiosRequestConfig<any> | undefined>;
    useApiPaymentRental: ApiResponse<CtlMstRentalPaymentListDataResponse, AxiosRequestConfig<any> | undefined>;
    useApiPackageSd: ApiResponse<CtlMstPackageSdListDataResponse, AxiosRequestConfig<any> | undefined>;
    useApiPacakge: ApiResponse<CrtPackageCrtPackagePagination, PackageApiApiPackageSearchGetRequest | undefined>;
    useApiAllOptions: ApiResponse<OptionOutputDataResponse, CarRentalApiApiCarRentalGetAllOptionsGetRequest | undefined>;
    useApiBranch: ApiResponse<BranchSearchOutputBranchSearchOutputPagination, BranchApiApiMasterBranchGetGetRequest | undefined>;
    useApiCustomer:  ApiResponse<CusCustomerCusCustomerOutputPagination, CustomerApiApiCustomerSearchGetRequest | undefined>;
    useApiPaymentStatus: ApiResponse<CtlMstPaymentStatusListDataResponse, AxiosRequestConfig<any> | undefined>;
    useApiCustomerType: ApiResponse<CtlMstCustomerTypeListDataResponse, AxiosRequestConfig<any> | undefined>;
    useApiCustomerGroup: ApiResponse<CtlMstCustomerGroupListDataResponse, AxiosRequestConfig<any> | undefined>;
    useApiCustomerSource: ApiResponse<CtlMstCustomerSourceListDataResponse, AxiosRequestConfig<any> | undefined>;
    useApiCustomerRental: ApiResponse<CusCustomerCusCustomerOutputPagination, CustomerApiApiCustomerSearchGetRequest | undefined>;
    useApiMasterPayment: ApiResponse<CtlMstPaymentCtlMstPaymentPagination, PaymentApiApiMasterPaymentGetGetRequest | undefined>;
    useApiLicensePlate:   ApiResponse<CrtVehicleItemCrtVehicleItemPagination, DropdownApiApiDropdownGetLicensePlateGetRequest | undefined>
    useApiGetRequestForm: ApiResponse<BookingRequestGetOutputDataResponse, BookingApiApiBookingGetRequestFromGetRequest | undefined>;
    useApiRentalType: ApiResponse<DDRentalTypeOutputListDataResponse, AxiosRequestConfig<any> | undefined>
    useApiBookingGetById: ApiResponse<CrtBookingRequestBookingRequestSearchOutputPagination, BookingApiApiBookingSearchGetRequest | undefined>;
    useApiTitleApi: ApiResponse<CtlMstTitleCtlMstTitlePagination, TitleApiApiMasterTitleGetGetRequest | undefined>;

    isCheckedTax: boolean;
    
    isVisibleFormBookingForm: boolean;
    dataSourceCustomer: CusCustomerOutput[] | [];
    bookingRequestNo?: string;

    isDisableCheckBoxSaveDb: boolean;

    attachIdentity?: string | undefined ;
    attachDrivingLicense?: string | undefined;
    attachEmployeeCard?: string | undefined;

    isAddNewCustomer: boolean;
    customerTypeValue?: string;
    recordStatusBooking?: string;
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
  export interface FormSearch{
    bookingRequestNo: string;
    // isActive: boolean;
  }

  export interface BookingRequest extends BookingRequestInput {
    // requestDate: string;
    rentalRateType: number;
    dateRange: [Dayjs | undefined, Dayjs | undefined];
    documentDateBooking: Dayjs;
    paymentDateBooking: Dayjs;
    requestDateBooking: Dayjs;
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
  
  export interface ThailandAddress{
    d: string;
    dCode: string;
    p: string;
    pCode: string;
    s: string;
    sCode: string;
    po: string;
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