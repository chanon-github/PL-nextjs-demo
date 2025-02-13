/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  PackageManagement - Model
 */
  import { ApiResponse } from "@/hooks/api/use-api";
  import {  CusCustomerCusCustomerOutputPagination, CusCustomerOutput, CustomerApiApiCustomerSearchGetRequest,} from "@/services/central-api/generated";
  import { CtlSetting,} from "@/services/rental-api/generated";
  import { CrudMode } from "@/utils/type/crud-types";
  import { FormInstance, TablePaginationConfig, UploadFile } from "antd";
  import { FilterValue, SorterResult, TableCurrentDataSource } from "antd/es/table/interface";
import { AxiosRequestConfig } from "axios";

  export interface CustomerApprovalContainerProps {}

  export interface CustomerApprovalContentProps extends CustomerApprovalState {
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: (param : {id: number}) => void;
    onClickToEdit: (param : {id: number}) => void;
    onSubmitSerach: (value: FormSearch) => void;
    onChangeRowSelection: (selectedRowKeys: Array<number | string>)=> void;
    onSubmitForm: (values: CustomerApprovalForm) => void;
    onCloseModalForm: () => void;
    onClickClearForm: () => void;
    onClickShowModalConfirm: () => void;
    onCloseModalConfirm: () => void;
    onClickConfirmEdit: () => void;
    onClickConfirmDelete: () => void;
    onChangeTable: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CusCustomerOutput> | SorterResult<CusCustomerOutput>[],
      extra: TableCurrentDataSource<CusCustomerOutput>
    ) => void;
    onClickToPreviousePage: () => void;

  }

  export interface CustomerApprovalState {
    pageIndex: number;
    pageSize: number;
    useApiCustomerApprovalGet:  ApiResponse<CusCustomerCusCustomerOutputPagination, CustomerApiApiCustomerSearchGetRequest | undefined>
    useApiCustomerApprovalGetById:  ApiResponse<CusCustomerCusCustomerOutputPagination, CustomerApiApiCustomerSearchGetRequest | undefined>
    // useApiPackageTypeGet:  ApiResponse<PackageTypeOutputListDataResponse, AxiosRequestConfig<any> | undefined>;
    rowSelectedTable: Array<number | string>;
    antdForm: FormInstance<CustomerApprovalForm>;
    isVisibleFormCustomerApproval: boolean;
    formSearch: FormInstance<FormSearch>;
    mode: CrudMode;
    isModalConfirmVisible: boolean;
  }

  
  export interface FormSearch{
    name: string;
    // code: string;
    // type: string;
    // isActive: boolean;
  }

  export interface CustomerApprovalForm{
    value: string;
    // isActive: boolean;
  }
  