/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlMstFeeRate, CtlMstFeeRateCtlMstFeeRatePagination, FeeRateApiApiMasterFeeRateGetGetRequest } from "@/services/central-api/generated";
import { CrtPackage, CrtPackageCrtPackagePagination, PackageApiApiPackageSearchGetRequest, PackageItemApiApiPackageItemSearchGetRequest, PackageItemSearchOutput, PackageItemSearchOutputPackageItemSearchOutputPagination, PackageTypeOutputListDataResponse } from "@/services/rental-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig, UploadFile } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { AxiosRequestConfig } from "axios";

  export interface PackageManagementContainerProps {}

  export interface PackageManagementContentProps extends PackageManagementState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {code: string; type: string;}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: MasterPackageForm) => void;
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
      sorter: SorterResult<PackageItemSearchOutput> | SorterResult<PackageItemSearchOutput>[],
      extra: TableCurrentDataSource<PackageItemSearchOutput>
    ) => void;
    onChangeUploadImg: (params: { file: UploadFile;}) => void;
    onClickToPreviousePage: () => void;
  }

  export interface PackageManagementState {
    pageIndex: number;
    pageSize: number;
    useApiPackageItemGet: ApiResponse<PackageItemSearchOutputPackageItemSearchOutputPagination, PackageItemApiApiPackageItemSearchGetRequest | undefined>
    // useApiPackageTypeGet:  ApiResponse<PackageTypeOutputListDataResponse, AxiosRequestConfig<any> | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<MasterPackageForm>;
    isVisibleFormMasterPackage: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
    imageUrl?: string;
  }

  
  export interface FormSearch{
    name: string;
    code: string;
    type: string;
    isActive: boolean;
  }

  export interface MasterPackageForm{
    name: string;
    type: string;
    isActive: boolean;
    imageUrl: string;
  }
  