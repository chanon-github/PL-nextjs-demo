/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlContent, CtlContentCtlContentPagination, CtlRoleManagementCtlRoleManagementPagination, GetAllPriceTierOutputDataResponse, RoleManagementApiApiRoleManagementGetGetRequest, VehicleMasterApiApiMasterVehicleMasterGetAllPriceTierGetRequest, VehicleMasterApiApiMasterVehicleMasterGetGetRequest } from "@/services/central-api/generated";
  import { CtlSetting, CtlSettingCtlSettingPagination, SettingApiApiSettingGetGetRequest,  } from "@/services/rental-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig, UploadFile } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { AxiosRequestConfig } from "axios";

  export interface MasterSLAContainerProps {}

  export interface MasterSLAContentProps extends MasterSLAState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {key: string;}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: MasterSLAForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlSetting> | SorterResult<CtlSetting>[],
      extra: TableCurrentDataSource<CtlSetting>
    ) => void;
    onClickToPreviousePage: () => void;

  }

  export interface MasterSLAState {
    pageIndex: number;
    pageSize: number;
    useApiMasterSLAGet:  ApiResponse<CtlSettingCtlSettingPagination, SettingApiApiSettingGetGetRequest | undefined>
    // useApiPackageTypeGet:  ApiResponse<PackageTypeOutputListDataResponse, AxiosRequestConfig<any> | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<MasterSLAForm>;
    isVisibleFormMasterSLA: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
  }

  
  export interface FormSearch{
    key: string;
    // code: string;
    // type: string;
    // isActive: boolean;
  }

  export interface MasterSLAForm{
    value: string;
    // isActive: boolean;
  }
  