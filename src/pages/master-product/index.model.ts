/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  MasterProduct - Model
 */
import { 
  // VehicleProductOutput
    CtlMstVehicleType,
    CrtProduct
} from '@/services/central-api/generated';
import {
  
  FormInstance,
  TablePaginationConfig,
  
} from 'antd';

import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';
  export interface MasterProductContainerProps {}

  export interface MasterProductContentProps extends MasterProductState {
    onChangePage: (
      page: number, pageSize: number
    ) => void;
    onChangePageSize: (param : {pageSize: number}) => void;
    onClickToAdd: () => void;
    onClickToManageCarProduct: (param: {id: number,name:string}) => void;
    onClickToManageCarStock:(param: {id: number,name:string}) => void;
    onClickRemove: () => void;
    onClickToEdit: (param : {id: number}) => void;
    onSubmitSearch: () => void;
    onClearSearch: () => void;
    onCloseFormModal :() => void;
    onSaveFormModal :() => void;

    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CrtProduct> | SorterResult<CrtProduct>[],
      extra: TableCurrentDataSource<CrtProduct>
    ) => void

   
    
    onHandleRowSelectionAll: (
      selected: boolean,
      selectedRows: CrtProduct[] ,
      changeRows: CrtProduct[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:CrtProduct,
      selected: boolean, 
    ) => void; // Handle row selection changes
  }

  export interface MasterProductState {
    page: number;
    pageSize: number;
    totalData:number|undefined;
    dataList:CrtProduct[] | undefined,
    visible:boolean,
    isLoadingPage:boolean,
    form: FormInstance<FormValues>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysList:(string|number)[]
    isTableLoading:boolean,
  }

  
  export interface FormSearch{
    productName: string;
    status: string;
  }

  export interface FormValues {
    productName: string;
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
  }
  