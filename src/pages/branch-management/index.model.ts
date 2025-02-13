/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  BranchManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { BranchApiApiMasterBranchGetGetRequest, BranchSearchOutput, BranchSearchOutputBranchSearchOutputPagination, TenantApiApiMasterTenantGetGetRequest, TenantSearchOutputTenantSearchOutputPagination} from "@/services/central-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

  export interface BranchManagementContainerProps {}

  export interface BranchManagementContentProps extends BranchManagementState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {code: string}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: BranchManagementForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<BranchSearchOutput> | SorterResult<BranchSearchOutput>[],
      extra: TableCurrentDataSource<BranchSearchOutput>
    ) => void;
  }

  export interface BranchManagementState {
    pageIndex: number;
    pageSize: number;
    useApiBranchGet: ApiResponse<BranchSearchOutputBranchSearchOutputPagination, BranchApiApiMasterBranchGetGetRequest  | undefined>;
    useApiTenantGet: ApiResponse<TenantSearchOutputTenantSearchOutputPagination, TenantApiApiMasterTenantGetGetRequest | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<BranchManagementForm>;
    isVisibleForm: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
  }

  
  export interface FormSearch{
    name: string;
    code: string;
    tenantName: string;
    status: string;
  }

  export interface BranchManagementForm{
    name: string;
    status: string;
    tenantCode: string;
    taxId: string;
    address: string;
    postcode: string;
    contactName: string;
    contactTel: string;
    contactMobile: string;
    contactEmail: string;
    location: string;
  }
  