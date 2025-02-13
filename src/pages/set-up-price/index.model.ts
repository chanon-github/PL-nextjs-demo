/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { CrtPriceTier, CrtVehicleMasterPrice, CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlContent, CtlContentCtlContentPagination, GetAllVehicleMasterPriceOutputDataResponse, VehicleMasterApiApiMasterVehicleMasterGetAllVehicleMasterPriceGetRequest, VehicleMasterApiApiMasterVehicleMasterGetGetRequest, VehicleMasterOutput } from "@/services/central-api/generated";
import {  PackageItemSearchOutput} from "@/services/rental-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig, UploadFile } from "antd";
  import { ColumnsType, FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { AxiosRequestConfig } from "axios";

  export interface SetUpPriceListContainerProps {}

  export interface SetUpPriceContentProps extends SetUpPriceState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {vehicleMasterId: number; }) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: SetUpPriceForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onClickToVehicleMasterPriceItem: (param: {code: string}) => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlContent> | SorterResult<CtlContent>[],
      extra: TableCurrentDataSource<CtlContent>
    ) => void;
    onChangeUploadImg: (params: { file: UploadFile;}) => void;
    onClickToPreviousePage: () => void;
  }

  export interface TableRecord {
    key: number;
    vehicle: string;
    [key: string]: string | number | null | undefined;
  }

  interface PriceData {
    vehicleMasterId: number;
    tierPriceId: number;
    price: number;
    // Add other price-related properties as needed
  }
  export interface Data {
    tier: CrtPriceTier[];
    vehicle: VehicleMasterOutput[];
    price: {
      [key: string]: CrtVehicleMasterPrice;
    };
  }

  export interface SetUpPriceState {
    pageIndex: number;
    pageSize: number;
    useApiVehicleMasterPricGet: ApiResponse<GetAllVehicleMasterPriceOutputDataResponse, VehicleMasterApiApiMasterVehicleMasterGetAllVehicleMasterPriceGetRequest | undefined>
    useApiVehicleMaster: ApiResponse<CrtVehicleMasterVehicleMasterSearchOutputPagination, VehicleMasterApiApiMasterVehicleMasterGetGetRequest | undefined>
    // useApiPackageTypeGet:  ApiResponse<PackageTypeOutputListDataResponse, AxiosRequestConfig<any> | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<SetUpPriceForm>;
    isVisibleFormMasterVehicleMasterPrice: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
    imageUrl?: string;
    columns: ColumnsType<TableRecord>;
    records: TableRecord[]; 
    vehicleMasterIdsForFilter: Array<number | undefined>;
  }

  
  export interface FormSearch{
    // name: string;
    // code: string;
    // type: string;
    // isActive: boolean;
    vehicleMasterId: number;
  }

  export interface SetUpPriceForm{
    vehicleMasterId: number;
    prices: {
      [tierId: number]: number;
    };
  }
  