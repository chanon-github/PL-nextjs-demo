/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PromotionManagement - Model
 */

import { ApiResponse } from "@/hooks/api/use-api";
  import { TenantSearchOutput, TenantApiApiMasterTenantGetGetRequest, TenantSearchOutputTenantSearchOutputPagination } from "@/services/central-api/generated";
import { CrtPromotionPromotionSearchOutputPagination, PromotionApiApiPromotionSearchGetRequest, PromotionSearchOutput } from "@/services/rental-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

  export interface PromotionManagementContainerProps {}

  export interface PromotionManagementContentProps extends PromotionManagementState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {id: number}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    // onSubmitForm: (values: TenantForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<PromotionSearchOutput> | SorterResult<PromotionSearchOutput>[],
      extra: TableCurrentDataSource<PromotionSearchOutput>
    ) => void;
  }

  export interface PromotionManagementState {
    pageIndex: number;
    pageSize: number;
    useApiPromotionGet: ApiResponse<CrtPromotionPromotionSearchOutputPagination, PromotionApiApiPromotionSearchGetRequest | undefined>
    rowSelectedTable: Array<number | string>;
    // antdForm: FormInstance<TenantForm>;
    isVisibleFormMasterFeeRate: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
  }

  
  export interface FormSearch{
    name: string;
    code: string;
    startDate: string;
    endDate: string;
    startDateToUse: string;
    endDateToUse: string;
    // status: string;
  }