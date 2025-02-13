/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  TenantManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import { TenantSearchOutput, TenantApiApiMasterTenantGetGetRequest, TenantSearchOutputTenantSearchOutputPagination } from "@/services/central-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";


  export interface TenantManagementContainerProps {}

  export interface TenantManagementContentProps extends TenantManagementState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {code: string}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: TenantForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<TenantSearchOutput> | SorterResult<TenantSearchOutput>[],
      extra: TableCurrentDataSource<TenantSearchOutput>
    ) => void;
  }

  export interface TenantManagementState {
    pageIndex: number;
    pageSize: number;
    useApiTenantGet: ApiResponse<TenantSearchOutputTenantSearchOutputPagination, TenantApiApiMasterTenantGetGetRequest | undefined>
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<TenantForm>;
    isVisibleFormMasterFeeRate: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
  }

  
  export interface FormSearch{
    keyword: string;
    code: string;
    status: string;
  }

  export interface TenantForm{
    name: string;
    taxId: string;
    status: string;
  }