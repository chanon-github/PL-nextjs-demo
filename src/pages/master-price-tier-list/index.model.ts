/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlContent, CtlContentCtlContentPagination, GetAllPriceTierItemOutput, GetAllPriceTierOutputDataResponse, VehicleMasterApiApiMasterVehicleMasterGetAllPriceTierGetRequest, VehicleMasterApiApiMasterVehicleMasterGetGetRequest } from "@/services/central-api/generated";
  import {  } from "@/services/rental-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig, UploadFile } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { AxiosRequestConfig } from "axios";

  export interface SetUpPriceListContainerProps {}

  export interface SetUpPriceContentProps extends SetUpPriceState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {id: number;}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: SetUpPriceForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<GetAllPriceTierItemOutput> | SorterResult<GetAllPriceTierItemOutput>[],
      extra: TableCurrentDataSource<GetAllPriceTierItemOutput>
    ) => void;
    onChangeUploadImg: (params: { file: UploadFile;}) => void;
    onClickToPreviousePage: () => void;
    onChangeValuePirceMin: (value: number | null) => void;
    onChangeValuePirceMax: (value: number | null) => void;
  }

  export interface SetUpPriceState {
    pageIndex: number;
    pageSize: number;
    useApiMasterPriceTierGet:  ApiResponse<GetAllPriceTierOutputDataResponse, VehicleMasterApiApiMasterVehicleMasterGetAllPriceTierGetRequest | undefined>
    useApiVehicleMaster: ApiResponse<CrtVehicleMasterVehicleMasterSearchOutputPagination, VehicleMasterApiApiMasterVehicleMasterGetGetRequest | undefined>
    // useApiPackageTypeGet:  ApiResponse<PackageTypeOutputListDataResponse, AxiosRequestConfig<any> | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<SetUpPriceForm>;
    isVisibleFormMasterPackage: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
    imageUrl?: string;
    maxDay: number;
    minDay: number;
  }

  
  export interface FormSearch{
    name: string;
    // code: string;
    // type: string;
    isActive: boolean;
  }

  export interface SetUpPriceForm{
    name: string;
    minDay: number;
    maxDay: number;
    isActive: boolean;
  }
  