/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { CtlDepartmentCtlDepartmentPagination, CtlDepartmentListDataResponse, CtlDivisionCtlDivisionPagination, CtlDivisionListDataResponse, CtlMstTitleCtlMstTitlePagination, CtlPositionCtlPositionPagination, CtlPositionListDataResponse, CtlRoleManagementCtlRoleManagementPagination, CtlUserUserSearchOutputPagination, DepartmentApiApiDepartmentGetGetRequest, DivisionApiApiDivisionGetGetRequest, PositionApiApiPositionGetGetRequest, RoleManagementApiApiRoleManagementGetGetRequest, TitleApiApiMasterTitleGetGetRequest, UserManagementApiApiUserManagementGetGetRequest, UserSearchOutput } from "@/services/central-api/generated";
import {  PackageItemSearchOutput} from "@/services/rental-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig, UploadFile } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { AxiosRequestConfig } from "axios";

  export interface UserManagementListContainerProps {}

  export interface UserManagementContentProps extends UserManagementState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {username: string;}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: MasterUserForm) => void;
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
      sorter: SorterResult<UserSearchOutput> | SorterResult<UserSearchOutput>[],
      extra: TableCurrentDataSource<UserSearchOutput>
    ) => void;
    onChangeUploadImg: (params: { file: UploadFile;}) => void;
    onClickToPreviousePage: () => void;
    onChangeDivisionCode: (params: { divisionCode: string;}) => void;
    onChangeDepartmentCode: (params: { departmentCode: string;}) => void;
    onGetImageUrlUploaded: (imageUrl?: string) => void;
  }

  export interface UserManagementState {
    pageIndex: number;
    pageSize: number;
    useApiUserGet: ApiResponse<CtlUserUserSearchOutputPagination, UserManagementApiApiUserManagementGetGetRequest | undefined>;
    useApiTitleGet:  ApiResponse<CtlMstTitleCtlMstTitlePagination, TitleApiApiMasterTitleGetGetRequest | undefined>;
    useApiRoleGet: ApiResponse<CtlRoleManagementCtlRoleManagementPagination, RoleManagementApiApiRoleManagementGetGetRequest | undefined>;
    useApiGetDepartments: ApiResponse<CtlDepartmentCtlDepartmentPagination, DepartmentApiApiDepartmentGetGetRequest | undefined>
    useApiGetDivision: ApiResponse<CtlDivisionCtlDivisionPagination, DivisionApiApiDivisionGetGetRequest | undefined>
    useApiGetPosition: ApiResponse<CtlPositionCtlPositionPagination, PositionApiApiPositionGetGetRequest | undefined>

    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<MasterUserForm>;
    isVisibleFormMasterPackage: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
    imageUrl?: string;
    
  }

  
  export interface FormSearch{
    name: string;
    role: number;
    userName: string;
    isActive?: boolean;
  }

  export interface MasterUserForm {
    username?: string | null;
    password?: string | null;
    branchCode?: string | null;
    divisionCode?: string | null;
    divisionName?: string | null;
    departmentCode?: string | null;
    departmentName?: string | null;
    positionCode?: string | null;
    titleCode?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    tel?: string | null;
    role?: number ;
    imageUrl?: string | null;
    isActive?: boolean;
  }
  