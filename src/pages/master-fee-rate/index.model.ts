/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterFeeRate - Model
 */

import { ApiResponse } from "@/hooks/api/use-api";
import { CrtVehicleMasterVehicleMasterSearchOutputPagination, CtlMstFeeRate, CtlMstFeeRateCtlMstFeeRatePagination, FeeRateApiApiMasterFeeRateGetGetRequest } from "@/services/central-api/generated";
import { CrudMode } from "@/utils/type/crud-types";
import { FormInstance, TablePaginationConfig } from "antd";
import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";

  export interface MasterFeeRateContainerProps {}

  export interface MasterFeeRateContentProps extends MasterFeeRateState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {code: string}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: MasterFeeRateForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlMstFeeRate> | SorterResult<CtlMstFeeRate>[],
      extra: TableCurrentDataSource<CtlMstFeeRate>
    ) => void;
  }

  export interface MasterFeeRateState {
    pageIndex: number;
    pageSize: number;
    useApiFeeRateGet: ApiResponse<CtlMstFeeRateCtlMstFeeRatePagination, FeeRateApiApiMasterFeeRateGetGetRequest | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<MasterFeeRateForm>;
    isVisibleFormMasterFeeRate: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
  }

  
  export interface FormSearch{
    keyword: string;
    status: string;
  }
  
  export interface MasterFeeRateForm{
    name: string;
    amount: number;
    status: string;
  }