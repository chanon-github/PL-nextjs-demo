/**
 *  Copyright (C) 2021, 2Smooth Digital Co. Ltd., all rights reserved
 *  VehicleBrand - Model
 */
import {
  
  FormInstance,
  TablePaginationConfig,
  
} from 'antd';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/es/table/interface';

import { 
  CtlMstCarBrand 
} from '@/services/central-api/generated';

  export interface VehicleBrandContainerProps {}

  export interface VehicleBrandContentProps extends VehicleBrandState {
    onChangePage: (
      page: number, pageSize: number
    ) => void;
    onChangePageSize: (param : {pageSize: number}) => void;
    onClickToAdd: () => void;
    onClikToView: (param: {id: number}) => void;
    onClickRemove: () => void;
    onClickToEdit: (param : {id: string}) => void;
    onSubmitSearch: () => void;
    onClearSearch: () => void;
    onClickCheckAll: (param: boolean) => void;
    showTotal: (total: number, range: [number, number]) => string; 
    onCloseFormModal :() => void;
    onSaveFormModal :() => void;

    onHandleTableChange: (
      pagination: TablePaginationConfig,
      filters: Record<string, FilterValue | null>,
      sorter: SorterResult<CtlMstCarBrand> | SorterResult<CtlMstCarBrand>[],
      extra: TableCurrentDataSource<CtlMstCarBrand>
    ) => void
 
    onHandleRowSelectionAll: (
      selected: boolean,
      selectedRows: CtlMstCarBrand[] ,
      changeRows: CtlMstCarBrand[]
    ) => void; // Handle row selection changes

    onHandleRowSelectionOne: (
      record:CtlMstCarBrand,
      selected: boolean, 
    ) => void; // Handle row selection changes
  }

  export interface VehicleBrandState {
    page: number;
    pageSize: number;
    totalData:number|undefined;
    dataList:CtlMstCarBrand[] | undefined,
    visible:boolean,
    isAllChecked:boolean,
    isLoadingPage:boolean,
    form: FormInstance<FormValues>, 
    saveMode:"ADD"|"EDIT"|null ,
    selectedRowKeysList:(string|number)[]
    isTableLoading:boolean,
  }

  
  export interface FormSearch{
    carBrand: string
    status:string
  }

  export interface TailwindConfig {
    theme: {
      extend: {
        colors: {
          'pl-primary': string;
          'pl-primay-hover': string;
          'pl-red-hover':string;
          'pl-secondary-hover':string

        };
      };
    };
  }
  export interface FormValues {
    carBrand: string;
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