/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  ProductOption - Model
 */
import {
  
  FormInstance,
  TablePaginationConfig,
  
} from 'antd';

import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
import { 
  CtlMstVehicleType,
  CrtVehicleOption
} from '@/services/central-api/generated';
  export interface ProductOptionContainerProps {}

  export interface ProductOptionContentProps extends ProductOptionState {
    
    onChangePage: (
      page: number, pageSize: number
    ) => void;
    onChangePageSize: (param : {pageSize: number}) => void;
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: () => void;
    onClickToEdit: (param : {id: number}) => void;
    onSubmitSearch: () => void;
    onClearSearch: () => void;
    onCloseFormModal :() => void;
    onSaveFormModal :() => void;

    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CrtVehicleOption> | SorterResult<CrtVehicleOption>[],
      extra: TableCurrentDataSource<CrtVehicleOption>
    ) => void
 
    onHandleRowSelectionAll: (
      selected: boolean,
      selectedRows: CrtVehicleOption[] ,
      changeRows: CrtVehicleOption[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:CrtVehicleOption,
      selected: boolean, 
    ) => void; // Handle row selection changes
  }

  export interface ProductOptionState {
    page: number;
    pageSize: number;
    totalData:number|undefined;
    dataList:CrtVehicleOption[] | undefined,
    visible:boolean,
    isLoadingPage:boolean,
    form: FormInstance<FormValues>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysList:(string|number)[]
    isTableLoading:boolean,
  }

  
  export interface FormSearch{
    optionType: string
    optionName:string
    status:string
  }

  export interface FormValues {
    optionName: string;
    limit:number|string;
    price:number;
    optionType:string;
    status: string|null;
  
  }

  export interface GetDataParams {
    currentPage: number;
    currentPageSize: number;
    sortOrder?: string; // Optional
    sortField?: string; // Optional
    keywordSearch?: string; // Optional
    status?: string; // Optional
    isLoadingTable?: boolean; // Optional
    optionType?:string;
    optionName?:string
  }
  