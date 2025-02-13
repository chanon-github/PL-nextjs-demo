/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlContent, CtlContentCtlContentPagination, CtlRoleManagement, CtlRoleManagementCtlRoleManagementPagination, GetAllPriceTierOutputDataResponse, RoleManagementApiApiRoleManagementGetGetRequest, VehicleMasterApiApiMasterVehicleMasterGetAllPriceTierGetRequest, VehicleMasterApiApiMasterVehicleMasterGetGetRequest } from "@/services/central-api/generated";
  import {  } from "@/services/rental-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig, UploadFile } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { AxiosRequestConfig } from "axios";

  export interface RoleManageMentContainerProps {}

  export interface RoleManageMentContentProps extends RoleManageMentState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {id: number;}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: RoleManageMentForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlRoleManagement> | SorterResult<CtlRoleManagement>[],
      extra: TableCurrentDataSource<CtlRoleManagement>
    ) => void;
    onClickToPreviousePage: () => void;

  }

  export interface RoleManageMentState {
    pageIndex: number;
    pageSize: number;
    useApiRoleManagementGet:  ApiResponse<CtlRoleManagementCtlRoleManagementPagination, RoleManagementApiApiRoleManagementGetGetRequest | undefined>
    // useApiPackageTypeGet:  ApiResponse<PackageTypeOutputListDataResponse, AxiosRequestConfig<any> | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<RoleManageMentForm>;
    isVisibleFormMasterPackage: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
  }

  
  export interface FormSearch{
    name: string;
    // code: string;
    // type: string;
    isActive: boolean;
  }

  export interface RoleManageMentForm{
    name: string;
    isActive: boolean;
  }
  